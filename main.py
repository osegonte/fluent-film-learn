"""
CineFluent FastAPI Backend - Enhanced for Complete Frontend Support
"""
import os
import logging
from fastapi import FastAPI, HTTPException, status, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any, Union
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
import json
import uuid

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

# CORS origins - Include common development ports
CORS_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:8081",  # Added for Vite fallback port
    "http://localhost:3000", 
    "http://localhost:5173",
    "http://localhost:5174",  # Another common Vite port
    "http://127.0.0.1:8080",
    "http://127.0.0.1:8081",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "https://your-frontend.vercel.app",
    "https://cinefluent.vercel.app",
]

if os.getenv("BACKEND_CORS_ORIGINS"):
    try:
        env_origins = json.loads(os.getenv("BACKEND_CORS_ORIGINS"))
        CORS_ORIGINS.extend(env_origins)
    except Exception as e:
        logger.warning(f"Failed to parse BACKEND_CORS_ORIGINS: {e}")

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

# Enhanced Pydantic models matching frontend exactly
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
    is_active: bool = True

class Achievement(BaseModel):
    id: str
    title: str
    description: str
    status: str = Field(..., description="Earned, In Progress, Locked")
    icon: str
    color: str
    progress: Optional[int] = None
    earnedDate: Optional[str] = None

class CommunityPost(BaseModel):
    id: str
    user: str
    initials: str
    time: str
    content: str
    likes: int
    isLiked: bool = False
    badge: Optional[str] = None
    streak: int

class LeaderboardEntry(BaseModel):
    rank: int
    name: str
    points: int
    streak: int
    change: str
    badge: Optional[str] = None
    avatar: str
    level: str
    isCurrentUser: bool = False

class WeeklyActivity(BaseModel):
    date: str
    lessonsCompleted: int
    timeSpent: int

class LanguageProgress(BaseModel):
    name: str
    level: str
    progress: int
    flag: str
    wordsLearned: int
    nextMilestone: str

# Request models
class LoginRequest(BaseModel):
    username: str  # Frontend sends 'username' field for email
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str

class ProgressUpdate(BaseModel):
    lessonId: str
    completed: bool
    score: int = Field(ge=0, le=100)
    timeSpent: int = Field(ge=0)
    vocabularyMastered: List[str] = []

class PostMessageRequest(BaseModel):
    content: str

# Response models
class AuthResponse(BaseModel):
    user: User
    token: str

class ProgressResponse(BaseModel):
    status: str
    message: str
    data: Dict[str, Any]

# Create FastAPI app
app = FastAPI(
    title=PROJECT_NAME,
    version="3.0.0",
    description="Complete CineFluent API with full frontend feature support",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Enhanced mock data with complete frontend compatibility
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
    },
    {
        "id": "7",
        "title": "Frozen",
        "language": "French",
        "difficulty": "Beginner",
        "rating": 4.7,
        "duration": "102 min",
        "scenes": "12 scenes",
        "progress": 0,
        "thumbnail": "❄️",
        "totalLessons": 12,
        "completedLessons": 0
    },
    {
        "id": "8",
        "title": "Moana",
        "language": "Spanish",
        "difficulty": "Intermediate",
        "rating": 4.8,
        "duration": "107 min",
        "scenes": "14 scenes",
        "progress": 45,
        "thumbnail": "🌊",
        "totalLessons": 14,
        "completedLessons": 6
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
    },
    {
        "word": "amistad",
        "translation": "friendship",
        "pronunciation": "/ah-mees-TAHD/",
        "example": "La amistad es muy importante."
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
    },
    {
        "id": "3",
        "type": "fill-blank",
        "question": "Complete: 'Mi _____ es grande.'",
        "correctAnswer": "familia",
        "explanation": "The correct word is 'familia' (family)."
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
        "vocabulary": MOCK_VOCABULARY[:3],
        "quiz": MOCK_QUIZ[:2],
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
            },
            {
                "word": "arrecife",
                "translation": "reef",
                "pronunciation": "/ah-reh-SEE-feh/",
                "example": "El arrecife es hermoso."
            }
        ],
        "quiz": [
            {
                "id": "4",
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
    "studyTime": "47h 23m",
    "is_active": True
}

MOCK_ACHIEVEMENTS = [
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

MOCK_COMMUNITY_POSTS = [
    {
        "id": "1",
        "user": "Sarah Chen",
        "initials": "SC",
        "time": "2m ago",
        "content": "Just finished Toy Story in Spanish! The vocabulary was perfect for beginners 🎬",
        "likes": 12,
        "isLiked": False,
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
        "isLiked": True,
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
        "isLiked": False,
        "badge": "award",
        "streak": 19
    },
    {
        "id": "4",
        "user": "Carlos Rodriguez",
        "initials": "CR",
        "time": "2h ago",
        "content": "Finished my first week on CineFluent! Already learned 50+ new words through movies 🚀",
        "likes": 8,
        "isLiked": False,
        "badge": None,
        "streak": 7
    }
]

MOCK_LEADERBOARD = [
    {
        "rank": 1,
        "name": "Sarah Chen",
        "points": 2847,
        "streak": 28,
        "change": "+5",
        "badge": "crown",
        "avatar": "SC",
        "level": "Expert",
        "isCurrentUser": False
    },
    {
        "rank": 2,
        "name": "Miguel Rodriguez",
        "points": 2651,
        "streak": 21,
        "change": "+2",
        "badge": "medal",
        "avatar": "MR",
        "level": "Advanced",
        "isCurrentUser": False
    },
    {
        "rank": 3,
        "name": "Emma Thompson",
        "points": 2398,
        "streak": 19,
        "change": "-1",
        "badge": "award",
        "avatar": "ET",
        "level": "Advanced",
        "isCurrentUser": False
    },
    {
        "rank": 4,
        "name": "You",
        "points": 1847,
        "streak": 12,
        "change": "+3",
        "badge": None,
        "avatar": "YU",
        "level": "Intermediate",
        "isCurrentUser": True
    },
    {
        "rank": 5,
        "name": "Akira Tanaka",
        "points": 1654,
        "streak": 15,
        "change": "0",
        "badge": None,
        "avatar": "AT",
        "level": "Intermediate",
        "isCurrentUser": False
    },
    {
        "rank": 6,
        "name": "Maria Garcia",
        "points": 1432,
        "streak": 9,
        "change": "+1",
        "badge": None,
        "avatar": "MG",
        "level": "Beginner",
        "isCurrentUser": False
    }
]

# Dependency for token validation
async def get_current_user(authorization: Optional[str] = Header(None)) -> Optional[str]:
    if not authorization:
        return None
    
    try:
        token = authorization.replace("Bearer ", "")
        user_id = verify_token(token)
        return user_id
    except:
        return None

# Root endpoints
@app.get("/")
def root():
    return {
        "message": "Welcome to Enhanced CineFluent API",
        "version": "3.0.0",
        "docs": "/docs",
        "redoc": "/redoc",
        "status": "Complete frontend integration ready",
        "features": [
            "Authentication & Authorization",
            "Movie & Lesson Management",
            "Progress Tracking",
            "Community Features",
            "Achievement System",
            "Leaderboard",
            "Weekly Activity Tracking"
        ],
        "environment": os.getenv("RAILWAY_ENVIRONMENT", "development")
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "cinefluent-api-complete",
        "version": "3.0.0",
        "database": "mock_data_ready",
        "features_ready": {
            "authentication": True,
            "movies": True,
            "lessons": True,
            "progress": True,
            "community": True,
            "achievements": True,
            "leaderboard": True
        },
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
    test_users = {
        "test@cinefluent.com": {
            "id": "2",
            "email": "test@cinefluent.com",
            "name": "Test User",
            "level": "Beginner A1",
            "streak": 5,
            "totalWords": 234,
            "studyTime": "12h 45m",
            "is_active": True
        },
        "sarah@cinefluent.com": {
            "id": "3",
            "email": "sarah@cinefluent.com",
            "name": "Sarah Chen",
            "level": "Expert",
            "streak": 28,
            "totalWords": 2847,
            "studyTime": "156h 30m",
            "is_active": True
        }
    }
    
    if credentials.username in test_users and credentials.password == "test123":
        user_data = test_users[credentials.username]
        access_token = create_access_token(user_data["id"])
        return AuthResponse(
            user=User(**user_data),
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
    existing_emails = ["demo@cinefluent.com", "test@cinefluent.com", "sarah@cinefluent.com"]
    if user_data.email in existing_emails:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    new_user_id = str(uuid.uuid4())
    access_token = create_access_token(new_user_id)
    
    new_user = User(
        id=new_user_id,
        email=user_data.email,
        name=user_data.name,
        level="Beginner A1",
        streak=0,
        totalWords=0,
        studyTime="0h 0m",
        is_active=True
    )
    
    return AuthResponse(
        user=new_user,
        token=access_token
    )

@app.post("/api/v1/auth/logout")
async def logout():
    return {"message": "Successfully logged out"}

@app.get("/api/v1/user/me", response_model=User)
async def get_current_user_info(user_id: Optional[str] = Depends(get_current_user)):
    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Return user based on ID
    if user_id == "1":
        return User(**MOCK_USER)
    else:
        # Generate user data for other IDs
        return User(
            id=user_id,
            email="user@cinefluent.com",
            name="Current User",
            level="Intermediate B1",
            streak=12,
            totalWords=1247,
            studyTime="47h 23m",
            is_active=True
        )

# Movie endpoints
@app.get("/api/v1/movies", response_model=List[Movie])
async def get_movies(language: Optional[str] = None):
    logger.info(f"Fetching movies list, language filter: {language}")
    
    movies = [Movie(**movie) for movie in MOCK_MOVIES]
    
    if language and language != "All":
        movies = [movie for movie in movies if movie.language == language]
    
    return movies

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
        # Generate lessons for any movie
        lessons = [
            {
                "id": f"{movie_id}_lesson_1",
                "movieId": movie_id,
                "title": "Introduction Scene",
                "subtitle": "Hola, comenzamos nuestra aventura.",
                "translation": "Hello, we begin our adventure.",
                "audioUrl": f"/audio/{movie_id}_lesson_1.mp3",
                "timestamp": "00:02:15",
                "vocabulary": MOCK_VOCABULARY[:2],
                "quiz": MOCK_QUIZ[:1],
                "completed": False
            },
            {
                "id": f"{movie_id}_lesson_2",
                "movieId": movie_id,
                "title": "Character Development",
                "subtitle": "Los personajes se conocen mejor.",
                "translation": "The characters get to know each other better.",
                "audioUrl": f"/audio/{movie_id}_lesson_2.mp3",
                "timestamp": "00:08:30",
                "vocabulary": MOCK_VOCABULARY[2:4],
                "quiz": MOCK_QUIZ[1:3],
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
@app.post("/api/v1/progress", response_model=ProgressResponse)
async def update_progress(progress: ProgressUpdate, user_id: Optional[str] = Depends(get_current_user)):
    logger.info(f"Progress update: {progress}")
    
    if not user_id:
        logger.warning("Progress update attempted without authentication")
    
    # Here you would typically update a database
    # For now, we'll just log the progress and return success
    
    return ProgressResponse(
        status="success",
        message="Progress updated successfully",
        data={
            "lessonId": progress.lessonId,
            "completed": progress.completed,
            "score": progress.score,
            "timeSpent": progress.timeSpent,
            "wordsLearned": len(progress.vocabularyMastered),
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    )

@app.get("/api/v1/progress/weekly", response_model=List[WeeklyActivity])
async def get_weekly_progress(user_id: Optional[str] = Depends(get_current_user)):
    logger.info("Fetching weekly progress data")
    
    # Generate mock weekly activity data
    base_date = datetime.now() - timedelta(days=35)
    weekly_data = []
    
    for i in range(35):
        date = base_date + timedelta(days=i)
        # Simulate some activity pattern
        lessons = max(0, int(3 * (0.5 + 0.5 * (i % 7) / 6)) if i % 7 != 0 else 0)
        time_spent = lessons * 15 + (lessons * 5 if lessons > 0 else 0)  # 15-20 min per lesson
        
        weekly_data.append(WeeklyActivity(
            date=date.strftime("%Y-%m-%d"),
            lessonsCompleted=lessons,
            timeSpent=time_spent
        ))
    
    return weekly_data

# Achievement endpoints
@app.get("/api/v1/achievements", response_model=List[Achievement])
async def get_achievements(user_id: Optional[str] = Depends(get_current_user)):
    logger.info("Fetching user achievements")
    return [Achievement(**achievement) for achievement in MOCK_ACHIEVEMENTS]

# Community endpoints
@app.get("/api/v1/community/posts", response_model=List[CommunityPost])
async def get_community_posts(limit: int = 50):
    logger.info(f"Fetching community posts, limit: {limit}")
    
    posts = MOCK_COMMUNITY_POSTS[:limit]
    return [CommunityPost(**post) for post in posts]

@app.post("/api/v1/community/posts", response_model=CommunityPost)
async def create_community_post(
    post_data: PostMessageRequest, 
    user_id: Optional[str] = Depends(get_current_user)
):
    logger.info(f"Creating new community post: {post_data.content[:50]}...")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    new_post = CommunityPost(
        id=str(uuid.uuid4()),
        user="You",
        initials="YU",
        time="now",
        content=post_data.content,
        likes=0,
        isLiked=False,
        badge=None,
        streak=12  # Current user's streak
    )
    
    return new_post

@app.get("/api/v1/community/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard(limit: int = 10):
    logger.info(f"Fetching leaderboard, limit: {limit}")
    
    leaderboard = MOCK_LEADERBOARD[:limit]
    return [LeaderboardEntry(**entry) for entry in leaderboard]

# Language and profile endpoints
@app.get("/api/v1/user/languages", response_model=List[LanguageProgress])
async def get_user_languages(user_id: Optional[str] = Depends(get_current_user)):
    logger.info("Fetching user language progress")
    
    languages = [
        {
            "name": "Spanish",
            "level": "Intermediate B1",
            "progress": 65,
            "flag": "🇪🇸",
            "wordsLearned": 847,
            "nextMilestone": "Advanced"
        },
        {
            "name": "French",
            "level": "Beginner A2",
            "progress": 30,
            "flag": "🇫🇷",
            "wordsLearned": 234,
            "nextMilestone": "Intermediate"
        },
        {
            "name": "German",
            "level": "Beginner A1",
            "progress": 15,
            "flag": "🇩🇪",
            "wordsLearned": 89,
            "nextMilestone": "A2 Level"
        }
    ]
    
    return [LanguageProgress(**lang) for lang in languages]

# Analytics and stats endpoints
@app.get("/api/v1/analytics/dashboard")
async def get_dashboard_analytics(user_id: Optional[str] = Depends(get_current_user)):
    logger.info("Fetching dashboard analytics")
    
    return {
        "totalUsers": 12847,
        "totalLessonsCompleted": 156789,
        "averageSessionTime": "23m 45s",
        "topLanguages": ["Spanish", "French", "German"],
        "totalMovies": len(MOCK_MOVIES),
        "totalLessons": sum(movie["totalLessons"] for movie in MOCK_MOVIES),
        "userGrowth": "+15.2%",
        "engagement": {
            "dailyActiveUsers": 3421,
            "weeklyActiveUsers": 8934,
            "averageStreak": 8.5
        }
    }

@app.get("/api/v1/user/stats")
async def get_user_stats(user_id: Optional[str] = Depends(get_current_user)):
    logger.info("Fetching detailed user statistics")
    
    return {
        "streak": {
            "current": 12,
            "longest": 28,
            "weeklyGoal": 5,
            "weeklyProgress": 3
        },
        "vocabulary": {
            "totalWords": 1247,
            "weeklyWords": 47,
            "masterLevel": 892
        },
        "time": {
            "totalTime": "47h 23m",
            "weeklyTime": "3h 45m",
            "averageSession": "23m"
        },
        "movies": {
            "completed": 3,
            "inProgress": 2,
            "totalAvailable": len(MOCK_MOVIES)
        },
        "achievements": {
            "earned": 8,
            "inProgress": 3,
            "total": 15
        },
        "ranking": {
            "currentRank": 4,
            "points": 1847,
            "nextRankPoints": 2000
        }
    }

# Search and discovery endpoints
@app.get("/api/v1/search/movies")
async def search_movies(
    q: str = "",
    language: Optional[str] = None,
    difficulty: Optional[str] = None,
    limit: int = 20
):
    logger.info(f"Searching movies: query='{q}', language={language}, difficulty={difficulty}")
    
    movies = MOCK_MOVIES.copy()
    
    # Filter by search query
    if q:
        movies = [
            movie for movie in movies 
            if q.lower() in movie["title"].lower()
        ]
    
    # Filter by language
    if language and language != "All":
        movies = [
            movie for movie in movies 
            if movie["language"] == language
        ]
    
    # Filter by difficulty
    if difficulty and difficulty != "All":
        movies = [
            movie for movie in movies 
            if movie["difficulty"] == difficulty
        ]
    
    return [Movie(**movie) for movie in movies[:limit]]

@app.get("/api/v1/search/vocabulary")
async def search_vocabulary(
    q: str = "",
    language: Optional[str] = None,
    limit: int = 50
):
    logger.info(f"Searching vocabulary: query='{q}', language={language}")
    
    # This would search through all vocabulary items in a real implementation
    vocabulary = MOCK_VOCABULARY.copy()
    
    if q:
        vocabulary = [
            item for item in vocabulary 
            if q.lower() in item["word"].lower() or q.lower() in item["translation"].lower()
        ]
    
    return vocabulary[:limit]

# Preferences and settings endpoints
@app.get("/api/v1/user/preferences")
async def get_user_preferences(user_id: Optional[str] = Depends(get_current_user)):
    logger.info("Fetching user preferences")
    
    return {
        "language": {
            "primary": "Spanish",
            "learning": ["Spanish", "French", "German"]
        },
        "notifications": {
            "dailyReminder": True,
            "streakReminder": True,
            "achievementAlerts": True,
            "communityUpdates": False
        },
        "display": {
            "theme": "system",
            "subtitleSize": "medium",
            "playbackSpeed": 1.0
        },
        "privacy": {
            "profileVisible": True,
            "progressVisible": True,
            "achievementsVisible": True
        }
    }

@app.put("/api/v1/user/preferences")
async def update_user_preferences(
    preferences: Dict[str, Any],
    user_id: Optional[str] = Depends(get_current_user)
):
    logger.info(f"Updating user preferences: {preferences}")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    # In a real implementation, you would save these to a database
    return {
        "status": "success",
        "message": "Preferences updated successfully",
        "data": preferences
    }

# Lesson interaction endpoints
@app.post("/api/v1/lessons/{lesson_id}/complete")
async def complete_lesson(
    lesson_id: str,
    completion_data: Dict[str, Any],
    user_id: Optional[str] = Depends(get_current_user)
):
    logger.info(f"Completing lesson {lesson_id}: {completion_data}")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    return {
        "status": "success",
        "message": "Lesson completed successfully",
        "data": {
            "lessonId": lesson_id,
            "completedAt": datetime.now(timezone.utc).isoformat(),
            "score": completion_data.get("score", 0),
            "timeSpent": completion_data.get("timeSpent", 0),
            "newWordsLearned": completion_data.get("newWordsLearned", 0)
        }
    }

@app.post("/api/v1/vocabulary/{word_id}/master")
async def mark_word_mastered(
    word_id: str,
    user_id: Optional[str] = Depends(get_current_user)
):
    logger.info(f"Marking word as mastered: {word_id}")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    return {
        "status": "success",
        "message": "Word marked as mastered",
        "data": {
            "wordId": word_id,
            "masteredAt": datetime.now(timezone.utc).isoformat()
        }
    }

# Social features
@app.post("/api/v1/community/posts/{post_id}/like")
async def like_post(
    post_id: str,
    user_id: Optional[str] = Depends(get_current_user)
):
    logger.info(f"Liking post: {post_id}")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    return {
        "status": "success",
        "message": "Post liked successfully",
        "data": {
            "postId": post_id,
            "likedAt": datetime.now(timezone.utc).isoformat()
        }
    }

@app.delete("/api/v1/community/posts/{post_id}/like")
async def unlike_post(
    post_id: str,
    user_id: Optional[str] = Depends(get_current_user)
):
    logger.info(f"Unliking post: {post_id}")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    return {
        "status": "success",
        "message": "Post unliked successfully",
        "data": {
            "postId": post_id,
            "unlikedAt": datetime.now(timezone.utc).isoformat()
        }
    }

# Admin and development endpoints
@app.get("/api/v1/admin/stats")
async def get_admin_stats():
    """Admin endpoint for platform statistics"""
    return {
        "users": {
            "total": 12847,
            "active_today": 3421,
            "new_this_week": 234
        },
        "content": {
            "movies": len(MOCK_MOVIES),
            "lessons": len(MOCK_LESSONS) * len(MOCK_MOVIES),  # Approximate
            "vocabulary_items": len(MOCK_VOCABULARY) * 50  # Approximate
        },
        "engagement": {
            "lessons_completed_today": 8934,
            "average_session_time": "23m 45s",
            "retention_rate": "78.5%"
        }
    }

@app.post("/api/v1/dev/reset-progress")
async def reset_user_progress(user_id: Optional[str] = Depends(get_current_user)):
    """Development endpoint to reset user progress"""
    logger.info(f"Resetting progress for user: {user_id}")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    return {
        "status": "success",
        "message": "User progress reset successfully",
        "data": {
            "userId": user_id,
            "resetAt": datetime.now(timezone.utc).isoformat()
        }
    }

@app.get("/api/v1/dev/generate-data")
async def generate_mock_data():
    """Development endpoint to generate additional mock data"""
    return {
        "movies": len(MOCK_MOVIES),
        "lessons": len(MOCK_LESSONS),
        "achievements": len(MOCK_ACHIEVEMENTS),
        "community_posts": len(MOCK_COMMUNITY_POSTS),
        "leaderboard_entries": len(MOCK_LEADERBOARD),
        "generated_at": datetime.now(timezone.utc).isoformat()
    }

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    logger.error(f"HTTP exception: {exc.status_code} - {exc.detail}")
    from fastapi.responses import JSONResponse
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "status_code": exc.status_code,
            "detail": exc.detail,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    )

@app.exception_handler(Exception)
async def global_exception_handler(request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    from fastapi.responses import JSONResponse
    return JSONResponse(
        status_code=500,
        content={
            "error": True,
            "detail": "Internal server error", 
            "message": str(exc),
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    )

# Enhanced status endpoint
@app.get("/api/v1/status")
async def detailed_status():
    return {
        "api_version": "3.0.0",
        "status": "operational",
        "environment": os.getenv("RAILWAY_ENVIRONMENT", "development"),
        "features": {
            "authentication": "enabled",
            "movies": "enhanced_data",
            "lessons": "dynamic_generation",
            "progress_tracking": "enabled",
            "community": "enabled",
            "achievements": "enabled",
            "leaderboard": "enabled",
            "search": "enabled",
            "analytics": "enabled"
        },
        "data": {
            "movies": len(MOCK_MOVIES),
            "lessons": len(MOCK_LESSONS),
            "achievements": len(MOCK_ACHIEVEMENTS),
            "community_posts": len(MOCK_COMMUNITY_POSTS),
            "leaderboard_entries": len(MOCK_LEADERBOARD)
        },
        "endpoints": {
            "total": len([route for route in app.routes if hasattr(route, 'methods')]),
            "public": 4,  # Root, health, status, docs
            "authenticated": "most endpoints"
        },
        "performance": {
            "uptime": "100%",
            "response_time": "<100ms",
            "memory_usage": "optimal"
        },
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# Middleware for request logging
@app.middleware("http")
async def log_requests(request, call_next):
    start_time = datetime.now()
    
    # Log request
    logger.info(f"Request: {request.method} {request.url}")
    
    response = await call_next(request)
    
    # Calculate processing time
    process_time = (datetime.now() - start_time).total_seconds()
    
    # Log response
    logger.info(f"Response: {response.status_code} - {process_time:.3f}s")
    
    return response

# Main application entry point
if __name__ == "__main__":
    import uvicorn
    
    port = int(os.environ.get("PORT", 8000))
    host = "0.0.0.0"
    
    logger.info(f"Starting Enhanced CineFluent API v3.0.0")
    logger.info(f"Server: {host}:{port}")
    logger.info(f"Environment: {os.getenv('RAILWAY_ENVIRONMENT', 'development')}")
    logger.info(f"CORS Origins: {CORS_ORIGINS}")
    logger.info("Features: Complete frontend integration ready")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=False,
        log_level="info",
        access_log=True
    )