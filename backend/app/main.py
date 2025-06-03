"""
FastAPI application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CineFluent API",
    description="Learn languages through movies",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to CineFluent API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "cinefluent-api"}

# Mock endpoints that match frontend expectations
@app.post("/api/auth/login")
async def login(credentials: dict):
    # Mock login - replace with real auth later
    if credentials.get("username") == "demo@cinefluent.com" and credentials.get("password") == "demo123":
        return {
            "user": {
                "id": 1,
                "email": "demo@cinefluent.com",
                "name": "Demo User",
                "level": "Intermediate",
                "streak": 12,
                "totalWords": 1247,
                "studyTime": "47h 23m"
            },
            "token": "mock-jwt-token"
        }
    return {"error": "Invalid credentials"}

@app.post("/api/auth/register")
async def register(user_data: dict):
    # Mock registration
    return {
        "user": {
            "id": 2,
            "email": user_data.get("email"),
            "name": user_data.get("name"),
            "level": "Beginner",
            "streak": 0,
            "totalWords": 0,
            "studyTime": "0h 0m"
        },
        "token": "mock-jwt-token"
    }

@app.get("/api/user/me")
async def get_current_user():
    # Mock current user
    return {
        "id": 1,
        "email": "demo@cinefluent.com", 
        "name": "Demo User",
        "level": "Intermediate",
        "streak": 12,
        "totalWords": 1247,
        "studyTime": "47h 23m"
    }

@app.get("/api/movies")
async def get_movies():
    # Mock movies data
    return [
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
        }
    ]

@app.get("/api/movies/{movie_id}/lessons")
async def get_movie_lessons(movie_id: str):
    # Mock lessons
    return [
        {
            "id": "1",
            "movieId": movie_id,
            "title": "Meeting Nemo",
            "subtitle": "Hola, soy Nemo. Vivo en el océano con mi familia.",
            "translation": "Hello, I am Nemo. I live in the ocean with my family.",
            "audioUrl": "/audio/lesson1.mp3",
            "timestamp": "00:03:24",
            "vocabulary": [
                {
                    "word": "océano",
                    "translation": "ocean",
                    "pronunciation": "/oh-SEH-ah-no/",
                    "example": "El pez vive en el océano."
                }
            ],
            "quiz": [
                {
                    "id": "1",
                    "type": "multiple-choice", 
                    "question": "What does 'océano' mean?",
                    "options": ["river", "ocean", "lake", "sea"],
                    "correctAnswer": "ocean",
                    "explanation": "'Océano' means ocean in Spanish."
                }
            ]
        }
    ]

@app.get("/api/lessons/{lesson_id}")
async def get_lesson(lesson_id: str):
    # Mock lesson details
    return {
        "id": lesson_id,
        "movieId": "1",
        "title": "Meeting Nemo",
        "subtitle": "Hola, soy Nemo. Vivo en el océano con mi familia.",
        "translation": "Hello, I am Nemo. I live in the ocean with my family.",
        "audioUrl": "/audio/lesson1.mp3",
        "timestamp": "00:03:24",
        "vocabulary": [
            {
                "word": "océano",
                "translation": "ocean",
                "pronunciation": "/oh-SEH-ah-no/",
                "example": "El pez vive en el océano."
            }
        ],
        "quiz": [
            {
                "id": "1",
                "type": "multiple-choice",
                "question": "What does 'océano' mean?", 
                "options": ["river", "ocean", "lake", "sea"],
                "correctAnswer": "ocean",
                "explanation": "'Océano' means ocean in Spanish."
            }
        ]
    }

@app.post("/api/progress")
async def update_progress(progress_data: dict):
    # Mock progress update
    return {"status": "success", "message": "Progress updated"}
