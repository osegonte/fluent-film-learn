#!/bin/bash
#!/bin/bash

echo "🎬 CineFluent Simple Backend Setup"
echo "================================="

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install minimal dependencies
pip install --upgrade pip
pip install fastapi uvicorn

echo "📁 Creating structure..."
mkdir -p app
touch app/__init__.py

# Create simple main.py
cat > main.py << 'SIMPLE_MAIN_EOF'
"""
CineFluent Simple Backend
"""
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CineFluent API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "CineFluent API is running!", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "healthy"}

# Mock auth endpoints
@app.post("/api/auth/login")
def login(credentials: dict):
    email = credentials.get("username", "")
    password = credentials.get("password", "")
    
    if email == "demo@cinefluent.com" and password == "demo123":
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
            "token": "demo-token-123"
        }
    
    return {"error": "Invalid credentials"}, 401

@app.post("/api/auth/register") 
def register(user_data: dict):
    return {
        "user": {
            "id": 2,
            "email": user_data.get("email"),
            "name": user_data.get("name"),
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
        "level": "Intermediate",
        "streak": 12,
        "totalWords": 1247,
        "studyTime": "47h 23m"
    }

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
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
SIMPLE_MAIN_EOF

# Create start script
cat > start.sh << 'START_EOF'
#!/bin/bash
echo "🚀 Starting CineFluent Backend"
echo "=============================="

if [ -d "venv" ]; then
    source venv/bin/activate
fi

echo "🔥 Server starting on http://localhost:8000"
echo "📖 API Docs: http://localhost:8000/docs"
echo ""

python main.py
START_EOF

chmod +x start.sh

echo "✅ Simple backend created!"
echo "🚀 Start with: ./start.sh"

