#!/bin/bash

# CineFluent Stage 4: Production Deployment Setup
# This script prepares your project for production deployment

echo "🚀 CineFluent Stage 4: Production Deployment Setup"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ]; then
    print_error "Please run this script from your project root directory"
    exit 1
fi

print_info "Starting Stage 4 setup for CineFluent..."
echo ""

# Stage 4.1: Production Environment Setup
echo "🔧 Stage 4.1: Setting up Production Environment"
echo "=============================================="

# Create production environment files
print_info "Creating production environment files..."

# Backend production environment
mkdir -p backend/config
cat > backend/.env.production << 'EOF'
# Production Environment Variables
ENVIRONMENT=production
DEBUG=False

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/cinefluent_prod
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-super-secret-production-key-change-this
JWT_SECRET_KEY=your-jwt-secret-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# API Configuration
API_V1_STR=/api/v1
PROJECT_NAME=CineFluent
BACKEND_CORS_ORIGINS=["https://yourdomain.com","https://www.yourdomain.com"]

# External Services
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# File Storage (Optional - for user avatars, etc.)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
S3_BUCKET_NAME=cinefluent-assets
AWS_REGION=us-east-1

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=GA-XXXX-X
SENTRY_DSN=your-sentry-dsn-for-error-tracking
EOF

# Frontend production environment
cat > frontend/.env.production << 'EOF'
# Production Environment Variables
VITE_API_URL=https://api.yourdomain.com
VITE_USE_MOCK_DATA=false
VITE_APP_NAME=CineFluent
VITE_ENVIRONMENT=production

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA-XXXX-X

# Feature Flags
VITE_ENABLE_COMMUNITY=true
VITE_ENABLE_PREMIUM=true
EOF

print_status "Environment files created"

# Stage 4.2: Database Setup
echo ""
echo "🗄️  Stage 4.2: Database Setup"
echo "============================="

# Create database schema
mkdir -p backend/database
cat > backend/database/schema.sql << 'EOF'
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
EOF

print_status "Database schema created"

# Stage 4.3: Docker Setup
echo ""
echo "🐳 Stage 4.3: Docker Configuration"
echo "=================================="

# Backend Dockerfile
cat > backend/Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

# Frontend Dockerfile
cat > frontend/Dockerfile << 'EOF'
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
EOF

# Nginx configuration for frontend
cat > frontend/nginx.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Docker Compose for full stack
cat > docker-compose.prod.yml << 'EOF'
version: '3.8'

services:
  frontend:
    build: 
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - cinefluent-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/cinefluent
    depends_on:
      - db
      - redis
    networks:
      - cinefluent-network

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=cinefluent
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    networks:
      - cinefluent-network

  redis:
    image: redis:7-alpine
    networks:
      - cinefluent-network

volumes:
  postgres_data:

networks:
  cinefluent-network:
    driver: bridge
EOF

print_status "Docker configuration created"

# Stage 4.4: Deployment Scripts
echo ""
echo "🚀 Stage 4.4: Deployment Scripts"
echo "==============================="

# Create deployment directory
mkdir -p scripts

# Railway deployment script
cat > scripts/deploy_railway.sh << 'EOF'
#!/bin/bash

echo "🚂 Deploying CineFluent to Railway"
echo "================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Please login to Railway..."
railway login

# Deploy backend
echo "🐍 Deploying backend..."
cd backend
railway up

# Deploy frontend
echo "⚛️  Deploying frontend..."
cd ../frontend
railway up

echo "✅ Deployment complete!"
echo "🔗 Check your Railway dashboard for deployment URLs"
EOF

# Vercel deployment script
cat > scripts/deploy_vercel.sh << 'EOF'
#!/bin/bash

echo "▲ Deploying CineFluent to Vercel"
echo "==============================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy frontend to Vercel
echo "⚛️  Deploying frontend to Vercel..."
cd frontend
vercel --prod

echo "✅ Frontend deployed to Vercel!"
echo "🔗 Your app URL will be shown above"
EOF

# Render deployment script
cat > scripts/deploy_render.sh << 'EOF'
#!/bin/bash

echo "🎨 Deploying CineFluent to Render"
echo "==============================="

echo "📋 Render Deployment Checklist:"
echo ""
echo "1. Create a new Web Service on Render"
echo "2. Connect your GitHub repository"
echo "3. Set build command: cd backend && pip install -r requirements.txt"
echo "4. Set start command: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT"
echo "5. Add environment variables from .env.production"
echo ""
echo "For frontend:"
echo "1. Create a new Static Site on Render"
echo "2. Set build command: cd frontend && npm install && npm run build"
echo "3. Set publish directory: frontend/dist"
echo ""
echo "🔗 Visit https://dashboard.render.com to deploy"
EOF

# Make scripts executable
chmod +x scripts/*.sh

print_status "Deployment scripts created"

# Stage 4.5: Monitoring & Analytics
echo ""
echo "📊 Stage 4.5: Monitoring Setup"
echo "============================"

# Create monitoring configuration
mkdir -p monitoring

cat > monitoring/sentry_setup.js << 'EOF'
// Sentry Error Tracking Setup
// Add this to your frontend main.tsx and backend main.py

// Frontend (React)
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

// Backend (FastAPI)
/*
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn="YOUR_SENTRY_DSN",
    integrations=[FastApiIntegration()],
    traces_sample_rate=1.0,
    environment="production"
)
*/
EOF

cat > monitoring/google_analytics.js << 'EOF'
// Google Analytics 4 Setup
// Add this to your frontend index.html

/*
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
*/

// Track custom events in your React components
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }
};

// Example usage:
// trackEvent('lesson_completed', {
//   lesson_id: 'lesson-123',
//   movie_title: 'Finding Nemo',
//   score: 85
// });
EOF

print_status "Monitoring configuration created"

# Stage 4.6: Final Setup Instructions
echo ""
echo "📋 Stage 4.6: Final Setup Instructions"
echo "====================================="

cat > DEPLOYMENT_GUIDE.md << 'EOF'
# CineFluent Production Deployment Guide

## Prerequisites
- [ ] Domain name purchased
- [ ] SSL certificate (handled by hosting platforms)
- [ ] Production database (PostgreSQL)
- [ ] Email service (Gmail, SendGrid, etc.)
- [ ] Error tracking (Sentry account)
- [ ] Analytics (Google Analytics)

## Quick Deployment Options

### Option 1: Railway (Recommended for beginners)
```bash
./scripts/deploy_railway.sh
```

### Option 2: Vercel + Railway
```bash
# Deploy backend to Railway
cd backend && railway up

# Deploy frontend to Vercel
./scripts/deploy_vercel.sh
```

### Option 3: Render
```bash
./scripts/deploy_render.sh
```

## Manual Deployment Steps

### 1. Database Setup
1. Create PostgreSQL database on your hosting platform
2. Run the schema: `psql -d your_database < backend/database/schema.sql`
3. Update DATABASE_URL in your environment variables

### 2. Backend Deployment
1. Deploy backend code to your hosting platform
2. Set environment variables from `.env.production`
3. Ensure health check endpoint is accessible

### 3. Frontend Deployment
1. Update VITE_API_URL to your backend URL
2. Build and deploy frontend
3. Set up custom domain (optional)

### 4. Post-Deployment
1. Test all functionality
2. Set up monitoring and alerts
3. Configure backup strategy
4. Set up CI/CD pipeline

## Environment Variables Checklist

### Backend (.env.production)
- [ ] DATABASE_URL
- [ ] SECRET_KEY (generate new one!)
- [ ] JWT_SECRET_KEY (generate new one!)
- [ ] BACKEND_CORS_ORIGINS
- [ ] SMTP configuration
- [ ] SENTRY_DSN (optional)

### Frontend (.env.production)
- [ ] VITE_API_URL
- [ ] VITE_GOOGLE_ANALYTICS_ID (optional)

## Security Checklist
- [ ] Change all default passwords
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Configure rate limiting
- [ ] Set up backup strategy

## Performance Optimization
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure database connection pooling
- [ ] Add Redis for caching (optional)
- [ ] Optimize images and assets

## Monitoring & Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Configure Google Analytics
- [ ] Set up uptime monitoring
- [ ] Create performance dashboards

## Maintenance
- [ ] Set up automated backups
- [ ] Plan regular updates
- [ ] Monitor resource usage
- [ ] Keep dependencies updated
EOF

print_status "Deployment guide created"

# Final instructions
echo ""
echo "🎉 Stage 4 Setup Complete!"
echo "========================="
echo ""
print_info "Your CineFluent project is now ready for production deployment!"
echo ""
echo "📁 Files created:"
echo "  ├── backend/.env.production"
echo "  ├── frontend/.env.production"
echo "  ├── backend/database/schema.sql"
echo "  ├── backend/Dockerfile"
echo "  ├── frontend/Dockerfile"
echo "  ├── docker-compose.prod.yml"
echo "  ├── scripts/deploy_railway.sh"
echo "  ├── scripts/deploy_vercel.sh"
echo "  ├── scripts/deploy_render.sh"
echo "  ├── monitoring/sentry_setup.js"
echo "  ├── monitoring/google_analytics.js"
echo "  └── DEPLOYMENT_GUIDE.md"
echo ""
echo "🚀 Next Steps:"
echo "1. Review and update environment variables"
echo "2. Choose your deployment platform"
echo "3. Follow the DEPLOYMENT_GUIDE.md"
echo "4. Run the appropriate deployment script"
echo ""
echo "💡 Quick start:"
echo "  - For Railway: ./scripts/deploy_railway.sh"
echo "  - For Vercel:  ./scripts/deploy_vercel.sh"
echo "  - For Render:  ./scripts/deploy_render.sh"
echo ""
print_status "Good luck with your deployment! 🚀"