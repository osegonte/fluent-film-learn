-- CineFluent Database Schema
-- Run this on your production PostgreSQL database

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    level VARCHAR(50) DEFAULT 'Beginner',
    streak INTEGER DEFAULT 0,
    total_words INTEGER DEFAULT 0,
    study_time INTEGER DEFAULT 0, -- in minutes
    is_active BOOLEAN DEFAULT true,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Languages table
CREATE TABLE languages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL, -- en, es, fr, etc.
    flag_emoji VARCHAR(10)
);

-- Movies table
CREATE TABLE movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    language_id UUID REFERENCES languages(id),
    difficulty VARCHAR(50) NOT NULL,
    rating DECIMAL(2,1),
    duration_minutes INTEGER,
    total_scenes INTEGER,
    thumbnail_url VARCHAR(500),
    video_url VARCHAR(500),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Lessons table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    movie_id UUID REFERENCES movies(id),
    title VARCHAR(255) NOT NULL,
    subtitle TEXT NOT NULL,
    translation TEXT NOT NULL,
    audio_url VARCHAR(500),
    video_timestamp VARCHAR(20), -- HH:MM:SS format
    lesson_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Vocabulary table
CREATE TABLE vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID REFERENCES lessons(id),
    word VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL,
    pronunciation VARCHAR(255),
    example_sentence TEXT,
    language_id UUID REFERENCES languages(id)
);

-- Quiz questions table
CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID REFERENCES lessons(id),
    question_type VARCHAR(50) NOT NULL, -- multiple-choice, fill-blank, etc.
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    options JSONB, -- for multiple choice options
    explanation TEXT,
    question_order INTEGER NOT NULL
);

-- User progress table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    lesson_id UUID REFERENCES lessons(id),
    completed BOOLEAN DEFAULT false,
    score INTEGER DEFAULT 0, -- percentage
    time_spent INTEGER DEFAULT 0, -- in seconds
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id)
);

-- User vocabulary mastery
CREATE TABLE user_vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    vocabulary_id UUID REFERENCES vocabulary(id),
    mastery_level INTEGER DEFAULT 1, -- 1-5 scale
    last_reviewed TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, vocabulary_id)
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX idx_lessons_movie_id ON lessons(movie_id);
CREATE INDEX idx_vocabulary_lesson_id ON vocabulary(lesson_id);
CREATE INDEX idx_quiz_questions_lesson_id ON quiz_questions(lesson_id);

-- Insert sample languages
INSERT INTO languages (name, code, flag_emoji) VALUES 
    ('Spanish', 'es', '🇪🇸'),
    ('French', 'fr', '🇫🇷'),
    ('German', 'de', '🇩🇪'),
    ('Italian', 'it', '🇮🇹'),
    ('Portuguese', 'pt', '🇵🇹');
