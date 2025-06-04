"""
CineFluent FastAPI Backend - Production Ready
"""
import os
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta, timezone
from jose import jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
PROJECT_NAME = os.getenv("PROJECT_NAME", "CineFluent")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# CORS origins - Add your frontend URLs here
CORS_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:3000", 
    "http://localhost:5173",
    "https://your-frontend.vercel.app",  # Add your actual frontend URL
    "https://cinefluent.vercel.app",     # Example production URL
]

# Add environment-based CORS origins
if os.getenv("BACKEND_CORS_ORIGINS"):
    import json
    env_origins = json.loads(os.getenv("BACKEND_CORS_ORIGINS"))
    CORS_ORIGINS.extend(env_origins)

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

# Create FastAPI app
app = FastAPI(
    title=PROJECT_NAME,
    version="1.0.0",
    description="Learn languages through movies - CineFluent API",
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class LoginRequest(BaseModel):
    username: str  # email (frontend sends 'username' field)
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str

class AuthResponse(BaseModel):
    user: dict
    token: str

# Root endpoints
@app.get("/")
def root():
    return {
        "message": "Welcome to CineFluent API",
        "version": "1.0.0",
        "docs": "/docs",
        "environment": os.getenv("ENVIRONMENT", "development")
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "cinefluent-api",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# Auth endpoints - MATCHING FRONTEND EXPECTATIONS
@app.post("/api/v1/auth/login", response_model=AuthResponse)
async def login(credentials: LoginRequest):
    # Demo login credentials
    if credentials.username == "demo@cinefluent.com" and credentials.password == "demo123":
        access_token = create_access_token("1")
        return AuthResponse(
            user={
                "id": "1",
                "email": "demo@cinefluent.com",
                "name": "Demo User",
                "level": "Intermediate B1",
                "streak": 12,
                "total_words": 1247,
                "study_time": "47h 23m",
                "avatar": None,
                "is_active": True
            },
            token=access_token
        )
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password"
    )

@app.post("/api/v1/auth/register", response_model=AuthResponse)
async def register(user_data: RegisterRequest):
    access_token = create_access_token("2")
    return AuthResponse(
        user={
            "id": "2",
            "email": user_data.email,
            "name": user_data.name,
            "level": "Beginner",
            "streak": 0,
            "total_words": 0,
            "study_time": "0h 0m",
            "avatar": None,
            "is_active": True
        },
        token=access_token
    )

@app.get("/api/v1/user/me")
async def get_current_user_info():
    return {
        "id": "1",
        "email": "demo@cinefluent.com",
        "name": "Demo User",
        "level": "Intermediate B1",
        "streak": 12,
        "totalWords": 1247,
        "studyTime": "47h 23m",
        "avatar": None,
        "is_active": True
    }

# Movie endpoints
@app.get("/api/v1/movies")
async def get_movies():
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
        }
    ]

@app.get("/api/v1/movies/{movie_id}/lessons")
async def get_movie_lessons(movie_id: str):
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
                },
                {
                    "word": "familia",
                    "translation": "family",
                    "pronunciation": "/fah-MEE-lee-ah/",
                    "example": "Mi familia es muy grande."
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
            ],
            "completed": False
        }
    ]

@app.get("/api/v1/lessons/{lesson_id}")
async def get_lesson(lesson_id: str):
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
        ],
        "completed": False
    }

@app.post("/api/v1/progress")
async def update_progress(progress_data: dict):
    print(f"Progress updated: {progress_data}")
    return {"status": "success", "message": "Progress updated successfully"}

# For Railway deployment - this is crucial
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False  # Set to False for production
    )
