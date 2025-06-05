#!/bin/bash

echo "🧹 Cleaning up CineFluent project for deployment"
echo "==============================================="

# Function to safely remove files/directories
safe_remove() {
    if [ -e "$1" ]; then
        echo "🗑️  Removing: $1"
        rm -rf "$1"
    fi
}

# Function to keep only essential files in a directory
clean_directory() {
    local dir="$1"
    local keep_pattern="$2"
    
    if [ -d "$dir" ]; then
        echo "🧹 Cleaning directory: $dir"
        find "$dir" -type f ! -name "$keep_pattern" -delete 2>/dev/null || true
    fi
}

echo "🔍 Current directory: $(pwd)"

# Remove development and build artifacts
echo "📦 Removing development artifacts..."
safe_remove "node_modules"
safe_remove "frontend/node_modules"
safe_remove "frontend/dist"
safe_remove "frontend/.vercel"
safe_remove ".vercel"
safe_remove "__pycache__"
safe_remove "backend/__pycache__"
safe_remove "*.pyc"
safe_remove ".pytest_cache"
safe_remove ".coverage"
safe_remove "htmlcov"

# Remove IDE and OS files
echo "💻 Removing IDE and OS files..."
safe_remove ".vscode"
safe_remove ".idea"
safe_remove ".DS_Store"
safe_remove "*.swp"
safe_remove "*.swo"
safe_remove "*~"
safe_remove "Thumbs.db"
safe_remove "desktop.ini"

# Remove unnecessary documentation and assets
echo "📚 Removing non-essential documentation..."
safe_remove "frontend/public/create_icons.txt"
safe_remove "frontend/public/robots.txt"
safe_remove "scripts"
safe_remove "docker-compose.yml"
safe_remove "docker-compose.prod.yml"
safe_remove "Dockerfile.backend"
safe_remove "frontend/Dockerfile"
safe_remove "frontend/nginx.conf"

# Remove deployment configs we don't need
echo "⚙️ Removing unused deployment configs..."
safe_remove "Procfile"
safe_remove "nixpacks.toml"
safe_remove "deploy_frontend.sh"
safe_remove "backend/start_backend.sh"

# Remove backend database files (we're using mock data)
echo "🗄️ Removing database files..."
safe_remove "backend/database"

# Remove environment files (keep templates)
echo "🔐 Cleaning environment files..."
safe_remove "backend/.env.production"
safe_remove "frontend/.env.production"

# Remove git-related files for clean deployment
echo "📝 Removing git artifacts..."
safe_remove ".git"
safe_remove ".gitignore"

# Remove unnecessary CSS and theme files
echo "🎨 Cleaning up CSS files..."
safe_remove "frontend/src/App.css"
safe_remove "frontend/src/force-icon-fixes.css"
safe_remove "frontend/src/ios-improvements.css"
safe_remove "frontend/src/ThemeSettings.tsx"

# Clean up unused components
echo "🧩 Removing unused components..."
safe_remove "frontend/src/components/CommunityPost.tsx"
safe_remove "frontend/src/components/LeaderboardCard.tsx"
safe_remove "frontend/src/components/LessonCard.tsx"
safe_remove "frontend/src/components/ProgressChart.tsx"
safe_remove "frontend/src/components/StatsCard.tsx"
safe_remove "frontend/src/components/StreakWidget.tsx"
safe_remove "frontend/src/components/WeeklyHeatmap.tsx"
safe_remove "frontend/src/components/Settings.tsx"
safe_remove "frontend/src/components/ThemeToggle.tsx"

# Remove unused navigation
safe_remove "frontend/src/navigation"

# Remove mock data (backend has its own)
safe_remove "frontend/src/data"

# Remove unused hooks
safe_remove "frontend/src/hooks/useTheme.ts"
safe_remove "frontend/src/hooks/use-mobile.tsx"

# Remove unused pages
safe_remove "frontend/src/pages"

# Create essential deployment files
echo "📝 Creating essential deployment files..."

# Create .gitignore for clean repo
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc

# Build outputs
dist/
build/
.vercel/

# Environment files
.env
.env.local
.env.production

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
EOF

# Create vercel.json for frontend deployment
cat > frontend/vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "https://your-backend-url.railway.app",
    "VITE_USE_MOCK_DATA": "false"
  }
}
EOF

# Create railway.toml for backend deployment
cat > railway.toml << 'EOF'
[build]
builder = "nixpacks"

[deploy]
startCommand = "uvicorn main:app --host 0.0.0.0 --port $PORT"
healthcheckPath = "/health"
healthcheckTimeout = 100

[env]
PYTHONUNBUFFERED = "1"
EOF

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📁 Essential files remaining:"
echo "   📂 frontend/ (React app)"
echo "   📂 backend/ → main.py, requirements.txt"
echo "   📄 railway.toml (for backend deployment)"
echo "   📄 frontend/vercel.json (for frontend deployment)"
echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Deploy backend to Railway: cd . && railway up"
echo "2. Deploy frontend to Vercel: cd frontend && vercel --prod"
echo "3. Update frontend/vercel.json with your Railway backend URL"
echo ""
echo "🎯 Your project is now optimized for production deployment!"