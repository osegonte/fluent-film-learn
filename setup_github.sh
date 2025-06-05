#!/bin/bash

echo "📂 Setting up CineFluent for GitHub + Render deployment"
echo "====================================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}$1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Initialize git repository
setup_git() {
    print_status "🔧 Setting up Git repository..."
    
    # Initialize git if not already done
    if [ ! -d ".git" ]; then
        git init
        print_success "Git repository initialized"
    else
        print_warning "Git repository already exists"
    fi
    
    # Create .gitignore if it doesn't exist
    if [ ! -f ".gitignore" ]; then
        cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
venv/
.venv/

# Build outputs
dist/
build/
.vercel/

# Environment files
.env
.env.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Runtime data
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Temporary folders
tmp/
temp/
EOF
        print_success "Created .gitignore"
    fi
}

# Create README for GitHub
create_readme() {
    print_status "📝 Creating README.md..."
    
    cat > README.md << 'EOF'
# 🎬 CineFluent - Learn Languages Through Movies

A modern language learning platform that uses movie scenes to teach vocabulary and grammar in context.

## ✨ Features

- 🎥 **Movie-based Learning**: Learn through authentic movie content
- 📚 **Interactive Lessons**: Video clips with subtitles and translations  
- 🧠 **Smart Quizzes**: Contextual questions and vocabulary tracking
- 📊 **Progress Analytics**: Track learning journey and streaks
- 👥 **Community Features**: Connect with fellow learners
- 🏆 **Gamification**: Achievements and leaderboards

## 🚀 Quick Start

### Demo Credentials
- **Email**: `demo@cinefluent.com`
- **Password**: `demo123`

### Tech Stack

**Frontend:**
- ⚛️ React 18 + TypeScript
- 🎨 Tailwind CSS + shadcn/ui
- ⚡ Vite build tool
- 🧭 React Router for navigation

**Backend:**
- 🐍 FastAPI + Python
- 🔐 JWT authentication
- 📊 RESTful API design

## 📂 Project Structure

```
cinefluent/
├── frontend/          # React TypeScript application
├── main.py            # FastAPI backend application
├── requirements.txt   # Python dependencies
├── render.yaml        # Render.com deployment config
└── README.md          # This file
```

## 🛠️ Development

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

### Backend
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🚀 Deployment

This app is configured for deployment on:

- **Frontend**: Vercel
- **Backend**: Render.com

### Deploy to Render + Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy Backend to Render**:
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

3. **Deploy Frontend to Vercel**:
   ```bash
   cd frontend
   vercel --prod
   ```

## 📱 API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/movies` - Get all movies
- `GET /api/v1/lessons/{id}` - Get lesson details
- `POST /api/v1/progress` - Update learning progress

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🎯 Demo

Try the live demo with the credentials above to explore:
- Movie-based lessons in Spanish, French, and German
- Interactive vocabulary learning
- Progress tracking and achievements
- Community features and leaderboards

Happy learning! 🚀
EOF

    print_success "Created README.md"
}

# Create GitHub Actions workflow (optional)
create_github_actions() {
    print_status "⚙️ Creating GitHub Actions workflow..."
    
    mkdir -p .github/workflows
    
    cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy CineFluent

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install frontend dependencies
      run: |
        cd frontend
        npm ci --legacy-peer-deps
    
    - name: Build frontend
      run: |
        cd frontend
        npm run build
    
    - name: Test frontend
      run: |
        cd frontend
        npm run preview &
        sleep 5
        curl -f http://localhost:4173 || exit 1

  test-backend:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install backend dependencies
      run: |
        pip install -r requirements.txt
    
    - name: Test backend
      run: |
        uvicorn main:app --host 0.0.0.0 --port 8000 &
        sleep 10
        curl -f http://localhost:8000/health || exit 1
EOF

    print_success "Created GitHub Actions workflow"
}

# Add and commit files
commit_files() {
    print_status "📝 Adding files to Git..."
    
    git add .
    
    print_status "💾 Committing files..."
    git commit -m "🎬 Initial CineFluent deployment setup

- Added FastAPI backend with movie learning API
- Added React frontend with modern UI
- Configured for Render.com + Vercel deployment
- Includes demo data and authentication
- Ready for production deployment"

    print_success "Files committed successfully"
}

# Main function
main() {
    echo ""
    print_status "Preparing CineFluent for GitHub deployment..."
    echo ""
    
    setup_git
    create_readme
    create_github_actions
    commit_files
    
    echo ""
    print_success "🎉 GitHub setup complete!"
    echo ""
    print_status "📋 Next steps:"
    echo "1. Create a new repository on GitHub"
    echo "2. Copy the remote URL"
    echo "3. Run: git remote add origin <your-repo-url>"
    echo "4. Run: git push -u origin main"
    echo ""
    print_status "🚀 Then deploy:"
    echo "1. Backend: Connect GitHub repo to Render.com"
    echo "2. Frontend: Run './deploy_render.sh' for Vercel"
    echo ""
    print_warning "Repository URL format:"
    echo "https://github.com/yourusername/cinefluent.git"
    echo ""
    print_status "🎯 Ready for deployment!"
}

# Run main function
main "$@"
