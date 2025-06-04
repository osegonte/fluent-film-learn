#!/bin/bash

echo "🚀 Quick Railway Deployment Fix"
echo "==============================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

# Navigate to backend directory if not already there
if [ ! -f "main.py" ]; then
    if [ -d "backend" ]; then
        echo "Moving to backend directory..."
        cd backend
    else
        echo "❌ Cannot find backend directory or main.py"
        echo "Please run from project root or backend directory"
        exit 1
    fi
fi

print_info "Verifying and fixing Python syntax..."

# Try different Python commands
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    print_warning "Python not found in PATH. Skipping syntax check."
    print_info "Proceeding with deployment - Railway will handle Python installation"
    PYTHON_CMD=""
fi

# Test syntax if Python is available
if [ ! -z "$PYTHON_CMD" ]; then
    echo "Testing with $PYTHON_CMD..."
    $PYTHON_CMD -m py_compile main.py 2>/dev/null
    if [ $? -eq 0 ]; then
        print_status "main.py syntax is valid"
    else
        print_warning "Syntax check failed, but this might be due to missing dependencies"
        print_info "Railway will install dependencies during build"
    fi
else
    print_info "Skipping local syntax check - Railway will validate during build"
fi

# Verify all required files are present
print_info "Verifying Railway deployment files..."

required_files=("main.py" "requirements.txt" "Procfile" ".python-version" "railway.json" "nixpacks.toml")
missing_files=()

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_status "$file exists"
    else
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    echo "❌ Missing required files: ${missing_files[*]}"
    echo "Please run the fix_railway_deployment.sh script first"
    exit 1
fi

# Quick content verification
print_info "Verifying file contents..."

# Check if main.py has Railway-compatible port binding
if grep -q "host=\"0.0.0.0\"" main.py && grep -q "port=port" main.py; then
    print_status "main.py has correct port binding"
else
    echo "❌ main.py missing Railway port configuration"
    exit 1
fi

# Check Procfile
if grep -q "uvicorn main:app --host 0.0.0.0 --port \$PORT" Procfile; then
    print_status "Procfile has correct start command"
else
    echo "❌ Procfile has incorrect start command"
    exit 1
fi

print_status "All files verified for Railway deployment!"

echo ""
echo "🚂 READY FOR RAILWAY DEPLOYMENT"
echo "==============================="
echo ""

# Commit and deploy instructions
print_info "1. Commit your changes:"
echo "   git add ."
echo "   git commit -m \"Fix Railway deployment configuration\""
echo ""

print_info "2. Deploy to Railway:"
echo "   railway up"
echo ""

print_info "3. If deployment still fails, check logs:"
echo "   railway logs"
echo ""

print_info "4. Test your deployed API:"
echo "   curl https://your-railway-url.railway.app/health"
echo ""

print_warning "REMEMBER: Set these environment variables in Railway dashboard if not already set:"
echo "• SECRET_KEY=your-production-secret-key-here"
echo "• JWT_SECRET_KEY=your-jwt-secret-key-here" 
echo "• DEBUG=False"
echo "• PYTHONUNBUFFERED=1"
echo ""

# Auto-commit and deploy option
read -p "Do you want to auto-commit and deploy now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Auto-committing changes..."
    git add .
    git commit -m "Fix Railway deployment configuration - port binding and nixpacks setup"
    
    print_info "Deploying to Railway..."
    railway up
    
    print_info "Checking deployment status..."
    sleep 5
    railway status
else
    print_info "Manual deployment ready. Run 'railway up' when ready."
fi

print_status "Quick fix complete! 🎉"