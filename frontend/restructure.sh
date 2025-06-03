#!/bin/bash

# CineFluent Project Restructuring Script
# This script moves all current files to a frontend/ directory
# and sets up the proper full-stack project structure

echo "🚀 Starting CineFluent project restructuring..."
echo "================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from your project root directory."
    exit 1
fi

# Create backup just in case
echo "📦 Creating backup..."
cp -r . ../cinefluent-backup-$(date +%Y%m%d_%H%M%S) 2>/dev/null || echo "⚠️  Backup failed, but continuing..."

# Create frontend directory
echo "📁 Creating frontend directory..."
mkdir -p frontend

# List of files/directories to move to frontend
# We'll move everything except .git and any directories we create
echo "📂 Moving files to frontend directory..."

# Move all files and directories except .git, frontend, and any new directories we create
for item in *; do
    if [ "$item" != ".git" ] && [ "$item" != "frontend" ] && [ "$item" != "backend" ]; then
        echo "   Moving $item..."
        mv "$item" frontend/ 2>/dev/null
    fi
done

# Move hidden files except .git
for item in .*; do
    if [ "$item" != "." ] && [ "$item" != ".." ] && [ "$item" != ".git" ]; then
        echo "   Moving $item..."
        mv "$item" frontend/ 2>/dev/null || echo "   (Skipped $item - might not exist)"
    fi
done

# Create backend directory
echo "📁 Creating backend directory..."
mkdir -p backend

# Create root-level README.md
echo "📄 Creating root README.md..."
cat > README.md << 'EOF'
# CineFluent 🎬

Learn languages through your favorite movies - a full-stack language learning platform.

## Project Structure

```
cinefluent/
├── frontend/          # React TypeScript application
├── backend/           # FastAPI Python application
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

## Quick Start

### Frontend Development
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) to view the app.

### Backend Development (Coming Soon)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
API will be available at [http://localhost:8000](http://localhost:8000).

## Development Workflow

1. **Frontend**: React app runs on `http://localhost:8080`
2. **Backend**: FastAPI server runs on `http://localhost:8000`
3. **Database**: PostgreSQL runs on `http://localhost:5432`

## Tech Stack

### Frontend
- ⚛️ React 18 + TypeScript
- 🎨 Tailwind CSS + shadcn/ui
- ⚡ Vite build tool
- 🧭 React Router for navigation

### Backend (Coming Soon)
- 🐍 FastAPI + Python
- 🐘 PostgreSQL database
- 🔧 SQLAlchemy ORM
- 🔐 JWT authentication

## Features

- 🎬 **Movie-based Learning**: Learn through authentic movie content
- 📚 **Interactive Lessons**: Video clips with subtitles and translations
- 🧠 **Smart Quizzes**: Contextual questions and vocabulary tracking
- 📊 **Progress Analytics**: Track learning journey and streaks
- 👥 **Community Features**: Connect with fellow learners
- 🏆 **Gamification**: Achievements and leaderboards

## Demo Credentials

For testing the frontend:
- **Email**: demo@cinefluent.com
- **Password**: demo123

## Contributing

1. Fork the repository
2. Create a feature branch
3. Work in either `frontend/` or `backend/` directory
4. Test your changes thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
EOF

# Create root-level .gitignore
echo "📄 Creating root .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
env/
venv/
.venv/
pip-log.txt
pip-delete-this-directory.txt

# Build outputs
dist/
build/
*.egg-info/
.tox/
.coverage
.pytest_cache/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Database
*.db
*.sqlite
*.sqlite3
migrations/

# Logs
*.log
logs/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# IDE and Editor files
.vscode/
.idea/
*.swp
*.swo
*~
.project
.classpath
.settings/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Docker
docker-compose.override.yml
.dockerignore

# Temporary files
tmp/
temp/
*.tmp
*.temp

# Package files
*.7z
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip

# Unit test / coverage reports
htmlcov/
.coverage
.coverage.*
coverage.xml
*.cover
.hypothesis/

# Documentation
docs/_build/
site/

# Backup files
*.bak
*.backup
*~
EOF

# Create docker-compose.yml for future full-stack development
echo "🐳 Creating docker-compose.yml..."
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  frontend:
    build: 
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:8000
      - VITE_USE_MOCK_DATA=false
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
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://cinefluent:password@db:5432/cinefluent
      - SECRET_KEY=your-secret-key-change-in-production
    depends_on:
      - db
    networks:
      - cinefluent-network

  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=cinefluent
      - POSTGRES_USER=cinefluent
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - cinefluent-network

volumes:
  postgres_data:

networks:
  cinefluent-network:
    driver: bridge
EOF

# Create a simple development script
echo "🛠️ Creating development helper script..."
cat > dev.sh << 'EOF'
#!/bin/bash

# CineFluent Development Helper Script

case "$1" in
    "frontend")
        echo "🚀 Starting frontend development server..."
        cd frontend && npm run dev
        ;;
    "backend")
        echo "🐍 Starting backend development server..."
        cd backend && python main.py
        ;;
    "install")
        echo "📦 Installing frontend dependencies..."
        cd frontend && npm install --legacy-peer-deps
        echo "✅ Frontend dependencies installed!"
        ;;
    "build")
        echo "🏗️ Building frontend for production..."
        cd frontend && npm run build
        ;;
    "docker")
        echo "🐳 Starting full stack with Docker..."
        docker-compose up --build
        ;;
    "docker-down")
        echo "🛑 Stopping Docker services..."
        docker-compose down
        ;;
    *)
        echo "CineFluent Development Helper"
        echo "Usage: ./dev.sh [command]"
        echo ""
        echo "Commands:"
        echo "  frontend     Start frontend development server"
        echo "  backend      Start backend development server"
        echo "  install      Install frontend dependencies"
        echo "  build        Build frontend for production"
        echo "  docker       Start full stack with Docker"
        echo "  docker-down  Stop Docker services"
        echo ""
        echo "Examples:"
        echo "  ./dev.sh frontend"
        echo "  ./dev.sh install"
        echo "  ./dev.sh docker"
        ;;
esac
EOF

# Make dev.sh executable
chmod +x dev.sh

# Create placeholder files for backend
echo "📄 Creating backend placeholder files..."
mkdir -p backend/app
cat > backend/README.md << 'EOF'
# CineFluent Backend

FastAPI backend for the CineFluent language learning platform.

## Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
python main.py
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
EOF

cat > backend/requirements.txt << 'EOF'
# FastAPI and dependencies
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6

# Database
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.12.1

# Authentication
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6

# Environment and configuration
python-dotenv==1.0.0
pydantic==2.5.0
pydantic-settings==2.1.0

# CORS
fastapi-cors==0.0.6

# Development
pytest==7.4.3
pytest-asyncio==0.21.1
black==23.11.0
isort==5.12.0
EOF

# Verify the structure
echo ""
echo "✅ Restructuring complete!"
echo "📁 Project structure:"
echo "   cinefluent/"
echo "   ├── frontend/     (your React app)"
echo "   ├── backend/      (ready for FastAPI)"
echo "   ├── README.md"
echo "   ├── .gitignore"
echo "   ├── docker-compose.yml"
echo "   └── dev.sh       (development helper)"
echo ""
echo "🧪 Testing frontend..."
if [ -f "frontend/package.json" ]; then
    echo "✅ Frontend files moved successfully!"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Test frontend: cd frontend && npm run dev"
    echo "2. Or use helper:  ./dev.sh frontend"
    echo "3. Ready for backend setup in Stage 2!"
else
    echo "❌ Error: Frontend files not found. Please check the move operation."
fi

echo ""
echo "================================================"
echo "🎉 CineFluent project structure ready!"