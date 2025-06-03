"""
CineFluent Simple Backend
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="CineFluent API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request validation
class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str

@app.get("/")
def root():
    return {"message": "CineFluent API is running!", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "healthy"}

# Auth endpoints that match your frontend exactly
@app.post("/api/auth/login")
def login(credentials: LoginRequest):
    print(f"Login attempt: {credentials.username}")  # Debug log
    
    if credentials.username == "demo@cinefluent.com" and credentials.password == "demo123":
        return {
            "user": {
                "id": 1,
                "email": "demo@cinefluent.com",
                "name": "Demo User",
                "level": "Intermediate B1",
                "streak": 12,
                "totalWords": 1247,
                "studyTime": "47h 23m"
            },
            "token": "demo-token-123"
        }
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/api/auth/register") 
def register(user_data: RegisterRequest):
    print(f"Register attempt: {user_data.email}")  # Debug log
    
    return {
        "user": {
            "id": 2,
            "email": user_data.email,
            "name": user_data.name,
            "level": "Beginner",
            "streak": 0,
            "totalWords": 0,
            "studyTime": "0h"
        },
        "token": "demo-token-456"
    }

@app.get("/api/user/me")
def get_me():
    return {
        "id": 1,
        "email": "demo@cinefluent.com",
        "name": "Demo User", 
        "level": "Intermediate B1",
        "streak": 12,
        "totalWords": 1247,
        "studyTime": "47h 23m"
    }

# Add CORS preflight support
@app.options("/api/auth/login")
def login_options():
    return {"message": "OK"}

@app.options("/api/auth/register")
def register_options():
    return {"message": "OK"}

@app.get("/api/movies")
def get_movies():
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
def get_lessons(movie_id: str):
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
def get_lesson(lesson_id: str):
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
def update_progress(data: dict):
    return {"status": "success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
