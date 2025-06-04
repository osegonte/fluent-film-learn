# CineFluent API Documentation

## Overview

The CineFluent API v3.0.0 provides complete backend support for the language learning platform. It includes authentication, movie management, lesson tracking, progress analytics, community features, and achievement systems.

## Base URL

- **Development**: `http://localhost:8000`
- **Production**: `https://your-backend-url.railway.app`

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Demo Credentials

- **Email**: `demo@cinefluent.com`
- **Password**: `demo123`

## API Endpoints

### Authentication

#### POST `/api/v1/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "username": "demo@cinefluent.com",
  "password": "demo123"
}
```

**Response:**
```json
{
  "user": {
    "id": "1",
    "email": "demo@cinefluent.com",
    "name": "Demo User",
    "level": "Intermediate B1",
    "streak": 12,
    "totalWords": 1247,
    "studyTime": "47h 23m"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/v1/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### POST `/api/v1/auth/logout`
Logout current user.

#### GET `/api/v1/user/me`
Get current user information (requires authentication).

### Movies

#### GET `/api/v1/movies`
Get list of all movies.

**Query Parameters:**
- `language` (optional): Filter by language (Spanish, French, German, etc.)

**Response:**
```json
[
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
  }
]
```

#### GET `/api/v1/movies/{movie_id}`
Get specific movie details.

#### GET `/api/v1/movies/{movie_id}/lessons`
Get all lessons for a specific movie.

### Lessons

#### GET `/api/v1/lessons/{lesson_id}`
Get specific lesson details including vocabulary and quiz.

**Response:**
```json
{
  "id": "1",
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
  "completed": false
}
```

#### POST `/api/v1/lessons/{lesson_id}/complete`
Mark a lesson as completed.

### Progress Tracking

#### POST `/api/v1/progress`
Update user progress for a lesson.

**Request Body:**
```json
{
  "lessonId": "1",
  "completed": true,
  "score": 85,
  "timeSpent": 1200,
  "vocabularyMastered": ["océano", "familia"]
}
```

#### GET `/api/v1/progress/weekly`
Get weekly activity data for progress visualization.

#### GET `/api/v1/user/stats`
Get detailed user statistics including streaks, vocabulary, and achievements.

### Community Features

#### GET `/api/v1/community/posts`
Get community posts from other learners.

**Query Parameters:**
- `limit` (optional): Number of posts to return (default: 50)

#### POST `/api/v1/community/posts`
Create a new community post (requires authentication).

**Request Body:**
```json
{
  "content": "Just finished my first Spanish movie! 🎬"
}
```

#### GET `/api/v1/community/leaderboard`
Get the community leaderboard.

**Query Parameters:**
- `limit` (optional): Number of entries to return (default: 10)

#### POST `/api/v1/community/posts/{post_id}/like`
Like a community post (requires authentication).

#### DELETE `/api/v1/community/posts/{post_id}/like`
Unlike a community post (requires authentication).

### Achievements

#### GET `/api/v1/achievements`
Get user achievements (requires authentication).

**Response:**
```json
[
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
    "id": "vocabulary_master",
    "title": "Vocabulary Master",
    "description": "Learn 500 new words",
    "status": "In Progress",
    "icon": "📚",
    "color": "success",
    "progress": 69
  }
]
```

### User Languages

#### GET `/api/v1/user/languages`
Get user's language learning progress (requires authentication).

### Search

#### GET `/api/v1/search/movies`
Search for movies.

**Query Parameters:**
- `q`: Search query
- `language`: Filter by language
- `difficulty`: Filter by difficulty
- `limit`: Number of results (default: 20)

#### GET `/api/v1/search/vocabulary`
Search vocabulary items.

**Query Parameters:**
- `q`: Search query
- `language`: Filter by language
- `limit`: Number of results (default: 50)

### User Preferences

#### GET `/api/v1/user/preferences`
Get user preferences (requires authentication).

#### PUT `/api/v1/user/preferences`
Update user preferences (requires authentication).

### Analytics

#### GET `/api/v1/analytics/dashboard`
Get dashboard analytics data.

#### GET `/api/v1/user/stats`
Get detailed user statistics.

### Admin & Development

#### GET `/api/v1/admin/stats`
Get platform-wide statistics (admin only).

#### POST `/api/v1/dev/reset-progress`
Reset user progress (development only).

#### GET `/api/v1/dev/generate-data`
Generate additional mock data (development only).

### System Health

#### GET `/health`
Basic health check endpoint.

#### GET `/api/v1/status`
Detailed API status and feature availability.

**Response:**
```json
{
  "api_version": "3.0.0",
  "status": "operational",
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
    "movies": 8,
    "lessons": 2,
    "achievements": 4,
    "community_posts": 4,
    "leaderboard_entries": 6
  }
}
```

## Error Handling

The API returns standard HTTP status codes:

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **422**: Validation Error
- **500**: Internal Server Error

Error responses include detailed information:

```json
{
  "error": true,
  "status_code": 404,
  "detail": "Movie not found",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Rate Limiting

Currently no rate limiting is implemented, but it's recommended for production use.

## CORS

The API supports CORS for the following origins:
- `http://localhost:8080`
- `http://localhost:3000`
- `http://localhost:5173`
- Production frontend URLs

## Interactive Documentation

- **Swagger UI**: `/docs`
- **ReDoc**: `/redoc`

## Data Models

### User
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "avatar": "string (optional)",
  "level": "string",
  "streak": "integer",
  "totalWords": "integer",
  "studyTime": "string",
  "is_active": "boolean"
}
```

### Movie
```json
{
  "id": "string",
  "title": "string",
  "language": "string",
  "difficulty": "string",
  "rating": "float",
  "duration": "string",
  "scenes": "string",
  "progress": "integer (0-100)",
  "thumbnail": "string",
  "totalLessons": "integer",
  "completedLessons": "integer"
}
```

### Lesson
```json
{
  "id": "string",
  "movieId": "string",
  "title": "string",
  "subtitle": "string",
  "translation": "string",
  "audioUrl": "string",
  "timestamp": "string",
  "vocabulary": "array of VocabularyItem",
  "quiz": "array of QuizQuestion",
  "completed": "boolean"
}
```

## Development Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the development server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

3. Access the API:
   - Base URL: `http://localhost:8000`
   - Documentation: `http://localhost:8000/docs`

## Deployment

The API is configured for deployment on:
- **Railway**: Uses `railway.json` configuration
- **Vercel**: Can be deployed as serverless functions
- **Docker**: Uses provided Dockerfile

Environment variables needed for production:
- `SECRET_KEY`: JWT signing key
- `BACKEND_CORS_ORIGINS`: Frontend URLs
- `PORT`: Server port (auto-set by Railway)

## Notes

- All timestamps are in ISO 8601 format (UTC)
- All endpoints that modify data require authentication
- Mock data is used for development and demo purposes
- Real database integration would replace the in-memory mock data