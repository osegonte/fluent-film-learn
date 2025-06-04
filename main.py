"""
CineFluent FastAPI Backend - Enhanced with Full Frontend Sync
"""
import os
import logging
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
import json

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='{"timestamp": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s"}'
)
logger = logging.getLogger(__name__)

# Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
PROJECT_NAME = os.getenv("PROJECT_NAME", "CineFluent")

# CORS origins
CORS_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:3000", 
    "http://localhost:5173",
    "https://your-frontend.vercel.app",
    "https://cinefluent.vercel.app",
]

if os.getenv("BACKEND_CORS_ORIGINS"):
    try:
        env_origins = json.loads(os.getenv("BACKEND_CORS_ORIGINS"))
        CORS_ORIGINS.extend(env_origins)
    except:
        logger.warning("Failed to parse BACKEND_CORS_ORIGINS")

# Security setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(subject: str, expires_delta: timedelta = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[str]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except JWTError:
        return None

# Enhanced Pydantic models matching frontend types
class VocabularyItem(BaseModel):
    word: str
    translation: str
    pronunciation: str
    example: str

class QuizQuestion(BaseModel):
    id: str
    type: str = Field(..., description="multiple-choice, fill-blank, translation")
    question: str
    options: Optional[List[str]] = None
    correctAnswer: str
    explanation: Optional[str] = None

class Movie(BaseModel):
    id: str
    title: str
    language: str
    difficulty: str = Field(..., description="Beginner, Intermediate, Advanced")
    rating: float
    duration: str
    scenes: str
    progress: int = Field(default=0, ge=0, le=100)
    thumbnail: str
    totalLessons: int
    completedLessons: int

class Lesson(BaseModel):
    id: str
    movieId: str
    title: str
    subtitle: str
    translation: str
    audioUrl: str
    timestamp: str
    vocabulary: List[VocabularyItem]
    quiz: List[QuizQuestion]
    completed: bool = False

class User(BaseModel):
    id: str
    email: str
    name: str
    avatar: Optional[str] = None
    level: str
    streak: int
    totalWords: int
    studyTime: str
    isActive: bool = True

class LoginRequest(BaseModel):
    username: str  # Frontend sends 'username' field for email
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str

class AuthResponse(BaseModel):
    user: User
    token: str

class ProgressUpdate(BaseModel):
    lessonId: str
    completed: bool
    score: int = Field(ge=0, le=100)
    timeSpent: int = Field(ge=0)
    vocabularyMastered: List[str] = []

# Create FastAPI app
app = FastAPI(
    title=PROJECT_NAME,
    version="2.0.0",
    description="Enhanced CineFluent API with full frontend sync",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enhanced mock data matching frontend expectations
MOCK_MOVIES = [
    {
        "id": "1",
        "title": "Finding Nemo",
        "language": "Spanish",
        "difficulty": "Beginner",
        "rating": 4.8,
        "duration": "100 min",
        "scenes": "12 scenes",
        "progress": 35,
        "thumbnail": "🐠",
        "totalLessons": 12,
        "completedLessons": 4
    },
    {
        "id": "2",
        "title": "Toy Story",
        "language": "Spanish",
        "difficulty": "Beginner",
        "rating": 4.9,
        "duration": "81 min",
        "scenes": "10 scenes",
        "progress": 100,
        "thumbnail": "🤠",
        "totalLessons": 10,
        "completedLessons": 10
    },
    {
        "id": "3",
        "title": "Ratatouille",
        "language": "French",
        "difficulty": "Intermediate",
        "rating": 4.7,
        "duration": "111 min",
        "scenes": "15 scenes",
        "progress": 0,
        "thumbnail": "🐭",
        "totalLessons": 15,
        "completedLessons": 0
    },
    {
        "id": "4",
        "title": "The Incredibles",
        "language": "Spanish",
        "difficulty": "Intermediate",
        "rating": 4.6,
        "duration": "115 min",
        "scenes": "14 scenes",
        "progress": 20,
        "thumbnail": "💪",
        "totalLessons": 14,
        "completedLessons": 3
    },
    {
        "id": "5",
        "title": "Monsters, Inc.",
        "language": "German",
        "difficulty": "Beginner",
        "rating": 4.5,
        "duration": "92 min",
        "scenes": "11 scenes",
        "progress": 0,
        "thumbnail": "👹",
        "totalLessons": 11,
        "completedLessons": 0
    },
    {
        "id": "6",
        "title": "Coco",
        "language": "Spanish",
        "difficulty": "Intermediate",
        "rating": 4.9,
        "duration": "105 min",
        "scenes": "13 scenes",
        "progress": 60,
        "thumbnail": "💀",
        "totalLessons": 13,
        "completedLessons": 8
    }
]

MOCK_VOCABULARY = [
    {
        "word": "océano",
        "translation": "ocean",
        "pronunciation": "/oh-SEH-ah-no/",
        "example": "El pez vive en el océano."
    },
    {
        "word": "familia",
        "translation": "family",
        "pronunciation": "/fah-MEE-lee-ah/",
        "example": "Mi familia es muy grande."
    },
    {
        "word": "aventura",
        "translation": "adventure",
        "pronunciation": "/ah-ben-TOO-rah/",
        "example": "Esta es una gran aventura."
    }
]

MOCK_QUIZ = [
    {
        "id": "1",
        "type": "multiple-choice",
        "question": "What does 'océano' mean?",
        "options": ["river", "ocean", "lake", "sea"],
        "correctAnswer": "ocean",
        "explanation": "'Océano' means ocean in Spanish."
    },
    {
        "id": "2",
        "type": "multiple-choice",
        "question": "How do you say 'family' in Spanish?",
        "options": ["amigo", "familia", "casa", "comida"],
        "correctAnswer": "familia",
        "explanation": "'Familia' means family in Spanish."
    }
]

MOCK_LESSONS = [
    {
        "id": "1",
        "movieId": "1",
        "title": "Meeting Nemo",
        "subtitle": "Hola, soy Nemo. Vivo en el océano con mi familia.",
        "translation": "Hello, I am Nemo. I live in the ocean with my family.",
        "audioUrl": "/audio/lesson1.mp3",
        "timestamp": "00:03:24",
        "vocabulary": MOCK_VOCABULARY,
        "quiz": MOCK_QUIZ,
        "completed": False
    },
    {
        "id": "2",
        "movieId": "1",
        "title": "The Great Barrier Reef",
        "subtitle": "Este es nuestro hogar, el arrecife de coral.",
        "translation": "This is our home, the coral reef.",
        "audioUrl": "/audio/lesson2.mp3",
        "timestamp": "00:05:12",
        "vocabulary": [
            {
                "word": "hogar",
                "translation": "home",
                "pronunciation": "/oh-GAHR/",
                "example": "Mi hogar está en el océano."
            }
        ],
        "quiz": [
            {
                "id": "3",
                "type": "multiple-choice",
                "question": "What does 'hogar' mean?",
                "options": ["house", "home", "hotel", "hospital"],
                "correctAnswer": "home",
                "explanation": "'Hogar' means home in Spanish."
            }
        ],
        "completed": True
    }
]

MOCK_USER = {
    "id": "1",
    "email": "demo@cinefluent.com",
    "name": "Demo User",
    "level": "Intermediate B1",
    "streak": 12,
    "totalWords": 1247,
    "studyTime": "47h 23m"
}

# Root endpoints
@app.get("/")
def root():
    return {
        "message": "Welcome to Enhanced CineFluent API",
        "version": "2.0.0",
        "docs": "/docs",
        "status": "Enhanced with full frontend sync",
        "environment": os.getenv("RAILWAY_ENVIRONMENT", "development")
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "cinefluent-api-enhanced",
        "version": "2.0.0",
        "features": [
            "Enhanced movie data",
            "Complete lesson system",
            "Progress tracking",
            "Community features",
            "Achievement system"
        ],
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# Authentication endpoints
@app.post("/api/v1/auth/login", response_model=AuthResponse)
async def login(credentials: LoginRequest):
    logger.info(f"Login attempt for: {credentials.username}")
    
    # Demo login
    if credentials.username == "demo@cinefluent.com" and credentials.password == "demo123":
        access_token = create_access_token("1")
        return AuthResponse(
            user=User(**MOCK_USER),
            token=access_token
        )
    
    # Additional test users
    if credentials.username == "test@cinefluent.com" and credentials.password == "test123":
        access_token = create_access_token("2")
        return AuthResponse(
            user=User(
                id="2",
                email="test@cinefluent.com",
                name="Test User",
                level="Beginner A1",
                streak=5,
                totalWords=234,
                studyTime="12h 45m"
            ),
            token=access_token
        )
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password"
    )

@app.post("/api/v1/auth/register", response_model=AuthResponse)
async def register(user_data: RegisterRequest):
    logger.info(f"Registration attempt for: {user_data.email}")
    
    # Check if user already exists (mock check)
    if user_data.email == "demo@cinefluent.com":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    access_token = create_access_token("new_user")
    return AuthResponse(
        user=User(
            id="new_user",
            email=user_data.email,
            name=user_data.name,
            level="Beginner A1",
            streak=0,
            totalWords=0,
            studyTime="0h 0m"
        ),
        token=access_token
    )

@app.get("/api/v1/user/me", response_model=User)
async def get_current_user():
    return User(**MOCK_USER)

# Movie endpoints
@app.get("/api/v1/movies", response_model=List[Movie])
async def get_movies():
    logger.info("Fetching movies list")
    return [Movie(**movie) for movie in MOCK_MOVIES]

@app.get("/api/v1/movies/{movie_id}", response_model=Movie)
async def get_movie(movie_id: str):
    logger.info(f"Fetching movie: {movie_id}")
    
    for movie in MOCK_MOVIES:
        if movie["id"] == movie_id:
            return Movie(**movie)
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Movie not found"
    )

@app.get("/api/v1/movies/{movie_id}/lessons", response_model=List[Lesson])
async def get_movie_lessons(movie_id: str):
    logger.info(f"Fetching lessons for movie: {movie_id}")
    
    # Filter lessons by movie ID
    lessons = [lesson for lesson in MOCK_LESSONS if lesson["movieId"] == movie_id]
    
    if not lessons:
        # Generate some lessons for the movie
        lessons = [
            {
                "id": f"{movie_id}_lesson_1",
                "movieId": movie_id,
                "title": f"Introduction Scene",
                "subtitle": "Hola, comenzamos nuestra aventura.",
                "translation": "Hello, we begin our adventure.",
                "audioUrl": f"/audio/{movie_id}_lesson_1.mp3",
                "timestamp": "00:02:15",
                "vocabulary": MOCK_VOCABULARY[:2],
                "quiz": MOCK_QUIZ[:1],
                "completed": False
            }
        ]
    
    return [Lesson(**lesson) for lesson in lessons]

# Lesson endpoints
@app.get("/api/v1/lessons/{lesson_id}", response_model=Lesson)
async def get_lesson(lesson_id: str):
    logger.info(f"Fetching lesson: {lesson_id}")
    
    for lesson in MOCK_LESSONS:
        if lesson["id"] == lesson_id:
            return Lesson(**lesson)
    
    # Generate a dynamic lesson if not found
    return Lesson(
        id=lesson_id,
        movieId="1",
        title="Dynamic Lesson",
        subtitle="Esta es una lección generada dinámicamente.",
        translation="This is a dynamically generated lesson.",
        audioUrl=f"/audio/{lesson_id}.mp3",
        timestamp="00:05:00",
        vocabulary=MOCK_VOCABULARY,
        quiz=MOCK_QUIZ,
        completed=False
    )

# Progress endpoints
@app.post("/api/v1/progress")
async def update_progress(progress: ProgressUpdate):
    logger.info(f"Progress update: {progress}")
    
    # Here you would typically update a database
    # For now, we'll just log the progress
    
    return {
        "status": "success",
        "message": "Progress updated successfully",
        "data": {
            "lessonId": progress.lessonId,
            "completed": progress.completed,
            "score": progress.score,
            "timeSpent": progress.timeSpent,
            "wordsLearned": len(progress.vocabularyMastered)
        }
    }

# Community endpoints
@app.get("/api/v1/community/posts")
async def get_community_posts():
    posts = [
        {
            "id": "1",
            "user": "Sarah Chen",
            "initials": "SC",
            "time": "2m ago",
            "content": "Just finished Toy Story in Spanish! The vocabulary was perfect for beginners 🎬",
            "likes": 12,
            "badge": "crown",
            "streak": 28
        },
        {
            "id": "2",
            "user": "Miguel Rodriguez",
            "initials": "MR",
            "time": "15m ago",
            "content": "Does anyone know where I can watch Finding Nemo with French subtitles?",
            "likes": 5,
            "badge": "medal",
            "streak": 21
        },
        {
            "id": "3",
            "user": "Emma Thompson",
            "initials": "ET",
            "time": "1h ago",
            "content": "Tip: Use the 'Export to Anki' feature after each lesson. It's been a game changer for retention! 🧠",
            "likes": 23,
            "badge": "award",
            "streak": 19
        }
    ]
    
    return posts

@app.get("/api/v1/community/leaderboard")
async def get_leaderboard():
    leaderboard = [
        {
            "rank": 1,
            "name": "Sarah Chen",
            "points": 2847,
            "streak": 28,
            "change": "+5",
            "badge": "crown",
            "avatar": "SC",
            "level": "Expert"
        },
        {
            "rank": 2,
            "name": "Miguel Rodriguez",
            "points": 2651,
            "streak": 21,
            "change": "+2",
            "badge": "medal",
            "avatar": "MR",
            "level": "Advanced"
        },
        {
            "rank": 3,
            "name": "Emma Thompson",
            "points": 2398,
            "streak": 19,
            "change": "-1",
            "badge": "award",
            "avatar": "ET",
            "level": "Advanced"
        },
        {
            "rank": 4,
            "name": "You",
            "points": 1847,
            "streak": 12,
            "change": "+3",
            "isCurrentUser": True,
            "avatar": "YU",
            "level": "Intermediate"
        },
        {
            "rank": 5,
            "name": "Akira Tanaka",
            "points": 1654,
            "streak": 15,
            "change": "0",
            "avatar": "AT",
            "level": "Intermediate"
        }
    ]
    
    return leaderboard

# Achievement endpoints
@app.get("/api/v1/achievements")
async def get_achievements():
    achievements = [
        {
            "id": "first_movie",
            "title": "First Movie",
            "description": "Complete your first movie",
            "status": "Earned",
            "icon": "🎬",
            "color": "primary",
            "earnedDate": "2 days ago"
        },
        {
            "id": "week_warrior",
            "title": "Week Warrior",
            "description": "7-day learning streak",
            "status": "Earned",
            "icon": "🔥",
            "color": "warning",
            "earnedDate": "1 week ago"
        },
        {
            "id": "vocabulary_master",
            "title": "Vocabulary Master",
            "description": "Learn 500 new words",
            "status": "In Progress",
            "icon": "📚",
            "color": "success",
            "progress": 69
        },
        {
            "id": "polyglot",
            "title": "Polyglot",
            "description": "Study 3 different languages",
            "status": "Locked",
            "icon": "🌍",
            "color": "muted"
        }
    ]
    
    return achievements

# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    return {
        "detail": "Internal server error", 
        "error": str(exc),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# Health check with enhanced info
@app.get("/api/v1/status")
async def detailed_status():
    return {
        "api_version": "2.0.0",
        "status": "operational",
        "features": {
            "authentication": "enabled",
            "movies": "enhanced_data",
            "lessons": "dynamic_generation",
            "progress_tracking": "enabled",
            "community": "enabled",
            "achievements": "enabled"
        },
        "endpoints": {
            "movies": f"{len(MOCK_MOVIES)} available",
            "lessons": f"{len(MOCK_LESSONS)} sample lessons",
            "users": "demo account ready"
        },
        "environment": os.getenv("RAILWAY_ENVIRONMENT", "development"),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    logger.info(f"Starting enhanced CineFluent API on 0.0.0.0:{port}")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False,
        log_level="info"
    )
