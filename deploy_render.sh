#!/bin/bash

echo "🚀 CineFluent Deployment to Render + Vercel"
echo "============================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Create render.yaml for backend deployment
create_render_config() {
    print_status "📝 Creating Render configuration..."
    
    cat > render.yaml << 'EOF'
services:
  - type: web
    name: cinefluent-backend
    env: python
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    healthCheckPath: /health
    envVars:
      - key: PYTHONUNBUFFERED
        value: 1
      - key: SECRET_KEY
        generateValue: true
      - key: ENVIRONMENT
        value: production
EOF

    print_success "Created render.yaml"
}

# Update frontend for deployment
setup_frontend_for_render() {
    print_status "⚛️  Setting up frontend for Render backend..."
    
    cd frontend
    
    # Create environment file for production
    cat > .env.production << 'EOF'
VITE_API_URL=https://cinefluent-backend.onrender.com
VITE_USE_MOCK_DATA=false
VITE_APP_NAME=CineFluent
VITE_ENVIRONMENT=production
EOF

    # Update vercel.json with the Render URL
    cat > vercel.json << 'EOF'
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
    "VITE_API_URL": "https://cinefluent-backend.onrender.com",
    "VITE_USE_MOCK_DATA": "false"
  }
}
EOF
    
    cd ..
    print_success "Frontend configured for Render backend"
}

# Deploy frontend to Vercel
deploy_frontend() {
    print_status "▲ Deploying frontend to Vercel..."
    
    cd frontend
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_status "Installing Vercel CLI..."
        npm install -g vercel@latest
    fi
    
    # Login to Vercel
    print_status "Please login to Vercel..."
    vercel login
    
    if [ $? -ne 0 ]; then
        print_error "Vercel login failed"
        cd ..
        return 1
    fi
    
    # Build the project
    print_status "Building frontend..."
    npm run build
    
    if [ $? -ne 0 ]; then
        print_error "Frontend build failed"
        cd ..
        return 1
    fi
    
    # Deploy to Vercel
    print_status "Deploying to Vercel..."
    vercel --prod --yes
    
    if [ $? -eq 0 ]; then
        print_success "Frontend deployed to Vercel!"
    else
        print_error "Vercel deployment failed"
        cd ..
        return 1
    fi
    
    cd ..
}

# Main function
main() {
    echo ""
    print_status "Starting alternative deployment process..."
    echo ""
    
    print_warning "Railway hobby deployments are paused"
    print_status "Using Render.com for backend (free tier)"
    print_status "Using Vercel for frontend"
    echo ""
    
    # Create Render configuration
    create_render_config
    
    # Setup frontend
    setup_frontend_for_render
    
    # Deploy frontend
    deploy_frontend
    
    echo ""
    print_success "🎉 Deployment setup complete!"
    echo ""
    print_status "📋 Next steps for backend deployment:"
    echo "1. Go to https://render.com"
    echo "2. Sign up/login with GitHub"
    echo "3. Click 'New' → 'Web Service'"
    echo "4. Connect your GitHub repository"
    echo "5. Select this project"
    echo "6. Render will automatically detect the render.yaml file"
    echo "7. Click 'Create Web Service'"
    echo ""
    print_status "🔧 Manual deployment alternative:"
    echo "1. Create a GitHub repository with your code"
    echo "2. Push your code to GitHub"
    echo "3. Deploy from GitHub to Render"
    echo ""
    print_status "📱 Your frontend should be live on Vercel!"
    echo "Test with: demo@cinefluent.com / demo123"
    echo ""
    print_warning "Note: Backend will be available once deployed to Render"
    print_status "The frontend will use mock data until backend is live"
}

# Run main function
main "$@"