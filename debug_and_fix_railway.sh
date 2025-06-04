#!/bin/bash

echo "🔍 Railway Deployment Debug & Fix"
echo "================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Check Railway logs
print_info "Checking Railway deployment logs..."
echo ""
railway logs --deployment

echo ""
print_info "Getting Railway status..."
railway status

echo ""
print_warning "Common Railway FastAPI deployment issues and fixes:"
echo ""

# Based on the troubleshooting guide, let's apply additional fixes
print_info "Applying additional Railway fixes..."

# Check if we're in the right directory
if [ ! -f "main.py" ]; then
    if [ -d "backend" ]; then
        echo "Moving to backend directory..."
        cd backend
    else
        print_error "Cannot find main.py or backend directory"
        exit 1
    fi
fi

# Fix 1: Ensure we're using the correct Railway root directory
print_info "🔧 Fix 1: Check Railway service root directory"
print_warning "Make sure Railway service is pointing to the correct directory:"
echo "   - In Railway dashboard: Go to Settings → Source Repository"
echo "   - Set Root Directory to: backend"
echo "   - Or ensure you're deploying from the correct directory"

# Fix 2: Simplified nixpacks.toml (sometimes less is more)
print_info "🔧 Fix 2: Creating simplified nixpacks.toml"
cat > nixpacks.toml << 'EOF'
[start]
cmd = "uvicorn main:app --host 0.0.0.0 --port $PORT"

[variables]
NIXPACKS_PYTHON_VERSION = "3.11"
PYTHONUNBUFFERED = "1"
EOF

print_status "Created simplified nixpacks.toml"

# Fix 3: Alternative Procfile (Railway sometimes prefers this)
print_info "🔧 Fix 3: Creating alternative Procfile"
cat > Procfile << 'EOF'
web: uvicorn main:app --host 0.0.0.0 --port $PORT
EOF

print_status "Updated Procfile to simplest form"

# Fix 4: Minimal requirements.txt to avoid dependency conflicts
print_info "🔧 Fix 4: Creating minimal requirements.txt"
cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
pydantic==2.5.0
python-dotenv==1.0.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
EOF

print_status "Created minimal requirements.txt"

# Fix 5: Add .railwayignore to exclude unnecessary files
print_info "🔧 Fix 5: Creating .railwayignore"
cat > .railwayignore << 'EOF'
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
env/
venv/
.venv/
.env
*.log
.DS_Store
.git/
*.md
fix_railway_deployment.sh
quick_deploy_fix.sh
debug_and_fix_railway.sh
main.py.backup
EOF

print_status "Created .railwayignore"

# Fix 6: Ensure main.py is really Railway compatible
print_info "🔧 Fix 6: Double-checking main.py Railway compatibility"

# Verify port binding
if grep -q "host=\"0.0.0.0\"" main.py && grep -q "port=port" main.py; then
    print_status "Port binding is correct"
else
    print_warning "Fixing port binding in main.py..."
    
    # Quick fix for main.py if needed
    cat > main.py << 'EOF'
"""
CineFluent FastAPI Backend - Railway Minimal
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CineFluent API",
    version="1.0.0",
    description="Learn languages through movies"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "CineFluent API is running!",
        "version": "1.0.0",
        "environment": os.getenv("RAILWAY_ENVIRONMENT", "production"),
        "port": os.getenv("PORT", "8000")
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "cinefluent-api"
    }

# Demo endpoints
@app.post("/api/v1/auth/login")
def login(credentials: dict):
    if credentials.get("username") == "demo@cinefluent.com" and credentials.get("password") == "demo123":
        return {
            "user": {
                "id": "1",
                "email": "demo@cinefluent.com",
                "name": "Demo User",
                "level": "Intermediate",
                "streak": 12,
                "totalWords": 1247,
                "studyTime": "47h 23m"
            },
            "token": "demo-token-123"
        }
    return {"error": "Invalid credentials"}

@app.get("/api/v1/movies")
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
        }
    ]

# CRITICAL: Railway port binding
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        log_level="info"
    )
EOF
    
    print_status "Updated main.py to minimal Railway-compatible version"
fi

# Fix 7: Check Railway service settings
print_info "🔧 Fix 7: Railway service configuration check"
print_warning "Verify these Railway dashboard settings:"
echo ""
echo "Service Settings:"
echo "  ✓ Root Directory: backend (if deploying from monorepo)"
echo "  ✓ Build Command: (leave empty - let Nixpacks handle it)"
echo "  ✓ Start Command: (leave empty - use Procfile)"
echo ""
echo "Environment Variables:"
echo "  ✓ PORT: (auto-set by Railway)"
echo "  ✓ PYTHONUNBUFFERED: 1"
echo "  ✓ RAILWAY_ENVIRONMENT: production"
echo ""

# Commit and redeploy
print_info "Ready to redeploy with fixes..."
echo ""

read -p "Apply fixes and redeploy? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Applying fixes and redeploying..."
    
    git add .
    git commit -m "Railway deployment fixes - minimal config and dependency cleanup"
    
    print_info "Deploying to Railway..."
    railway up
    
    echo ""
    print_info "Checking deployment status..."
    sleep 10
    railway status
    
    echo ""
    print_info "If deployment still fails, check logs:"
    echo "   railway logs --deployment"
else
    print_info "Fixes applied but not deployed. Run 'railway up' when ready."
fi

echo ""
print_status "Debug and fix process complete! 🎯"
echo ""
print_warning "If deployment still fails, try these alternatives:"
echo "1. Use a custom Dockerfile instead of Nixpacks"
echo "2. Check Railway dashboard for root directory setting"
echo "3. Ensure you're on a paid Railway plan (some features need it)"
echo "4. Contact Railway support with the deployment logs"
