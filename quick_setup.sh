#!/bin/bash

echo "⚡ Quick Setup for CineFluent Deployment"
echo "======================================="

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x cleanup.sh 2>/dev/null || true
chmod +x deploy.sh 2>/dev/null || true

# Create essential files if they don't exist
echo "📝 Creating essential configuration files..."

# Create frontend/vercel.json if it doesn't exist
if [ ! -f "frontend/vercel.json" ]; then
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
    echo "✅ Created frontend/vercel.json"
fi

# Create railway.toml if it doesn't exist
if [ ! -f "railway.toml" ]; then
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
    echo "✅ Created railway.toml"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
venv/

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
    echo "✅ Created .gitignore"
fi

echo ""
echo "🎯 Quick setup complete!"
echo ""
echo "Choose your deployment path:"
echo ""
echo "Option 1 - Clean and Deploy (Recommended):"
echo "  ./cleanup.sh  # Remove unnecessary files"
echo "  ./deploy.sh   # Deploy to Railway + Vercel"
echo ""
echo "Option 2 - Direct Deploy (Keep all files):"
echo "  ./deploy.sh   # Deploy directly"
echo ""
echo "Option 3 - Manual Steps:"
echo "  Backend: railway up"
echo "  Frontend: cd frontend && vercel --prod"
echo ""
echo "🚀 Ready to deploy your CineFluent app!"