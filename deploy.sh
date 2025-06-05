#!/bin/bash

echo "🚀 CineFluent Deployment Script"
echo "==============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}$1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if required tools are installed
check_requirements() {
    print_status "🔍 Checking requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is required but not installed"
        exit 1
    fi
    
    # Check Python
    if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
        print_error "Python is required but not installed"
        exit 1
    fi
    
    print_success "All requirements satisfied"
}

# Install deployment tools
install_tools() {
    print_status "📦 Installing deployment tools..."
    
    # Install Vercel CLI
    if ! command -v vercel &> /dev/null; then
        print_status "Installing Vercel CLI..."
        npm install -g vercel@latest
    fi
    
    # Install Railway CLI
    if ! command -v railway &> /dev/null; then
        print_status "Installing Railway CLI..."
        npm install -g @railway/cli@latest
    fi
    
    print_success "Deployment tools ready"
}

# Setup frontend for deployment
setup_frontend() {
    print_status "⚛️  Setting up frontend..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install --legacy-peer-deps
    
    # Build project to test
    print_status "Testing frontend build..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Frontend build successful"
    else
        print_error "Frontend build failed"
        exit 1
    fi
    
    cd ..
}

# Setup backend for deployment
setup_backend() {
    print_status "🐍 Setting up backend..."
    
    # Check if we have requirements.txt in root
    if [ -f "requirements.txt" ]; then
        print_status "Found requirements.txt - backend ready"
        print_success "Backend setup complete"
    else
        print_error "requirements.txt not found in root directory"
        exit 1
    fi
}

# Deploy backend to Railway
deploy_backend() {
    print_status "🚂 Deploying backend to Railway..."
    
    # Login to Railway (will prompt user)
    print_status "Please login to Railway..."
    railway login
    
    if [ $? -ne 0 ]; then
        print_error "Railway login failed"
        exit 1
    fi
    
    # Deploy
    print_status "Deploying to Railway..."
    railway up
    
    if [ $? -eq 0 ]; then
        print_success "Backend deployed to Railway"
        print_status "🔗 Check your Railway dashboard for the deployment URL"
        return 0
    else
        print_error "Backend deployment to Railway failed"
        exit 1
    fi
}

# Deploy frontend to Vercel
deploy_frontend() {
    print_status "▲ Deploying frontend to Vercel..."
    
    cd frontend
    
    # Login to Vercel (will prompt user)
    print_status "Please login to Vercel..."
    vercel login
    
    if [ $? -ne 0 ]; then
        print_error "Vercel login failed"
        cd ..
        exit 1
    fi
    
    # Deploy to production
    print_status "Deploying to Vercel..."
    vercel --prod --yes
    
    if [ $? -eq 0 ]; then
        print_success "Frontend deployed to Vercel"
    else
        print_error "Frontend deployment to Vercel failed"
        cd ..
        exit 1
    fi
    
    cd ..
}

# Main deployment flow
main() {
    echo ""
    print_status "Starting CineFluent deployment process..."
    echo ""
    
    # Run checks
    check_requirements
    install_tools
    
    # Ask user what to deploy
    echo ""
    echo "What would you like to deploy?"
    echo "1) Backend only (Railway)"
    echo "2) Frontend only (Vercel)"
    echo "3) Both (Recommended)"
    echo "4) Just setup/test (no deployment)"
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            setup_backend
            deploy_backend
            ;;
        2)
            setup_frontend
            deploy_frontend
            ;;
        3)
            setup_backend
            setup_frontend
            deploy_backend
            deploy_frontend
            ;;
        4)
            setup_backend
            setup_frontend
            print_success "Setup complete - no deployment performed"
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
    
    echo ""
    print_success "🎉 Deployment process complete!"
    echo ""
    print_status "📱 Test your app with demo credentials:"
    echo "   Email: demo@cinefluent.com"
    echo "   Password: demo123"
    echo ""
    print_success "Happy coding! 🚀"
}

# Run main function
main "$@"
