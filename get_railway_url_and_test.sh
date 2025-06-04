#!/bin/bash

echo "🔍 Getting Railway URL and Testing API"
echo "======================================"

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

# Navigate to backend if needed
if [ ! -f "main.py" ]; then
    if [ -d "backend" ]; then
        cd backend
    fi
fi

print_info "Getting Railway service information..."

# Get Railway domain/URL
RAILWAY_URL=$(railway domain 2>/dev/null || echo "")

if [ -z "$RAILWAY_URL" ]; then
    print_warning "Railway domain not found. Generating one..."
    print_info "Generating Railway domain..."
    railway domain
    RAILWAY_URL=$(railway domain 2>/dev/null || echo "")
fi

if [ -z "$RAILWAY_URL" ]; then
    print_error "Could not get Railway URL. Let's check status and create domain manually."
    echo ""
    print_info "Railway service details:"
    railway status
    echo ""
    print_info "Creating a domain for your service..."
    railway domain
    
    print_warning "If domain creation failed, do this manually:"
    echo "1. Go to Railway dashboard: https://railway.app/dashboard"
    echo "2. Select your cinefluent-backend project"
    echo "3. Go to Settings > Networking"
    echo "4. Click 'Generate Domain' or add a custom domain"
    echo ""
    read -p "Enter your Railway URL manually (e.g., https://your-app.railway.app): " MANUAL_URL
    RAILWAY_URL="$MANUAL_URL"
fi

if [ -n "$RAILWAY_URL" ]; then
    # Clean up URL (remove any trailing slashes)
    RAILWAY_URL=$(echo "$RAILWAY_URL" | sed 's/\/$//')
    
    print_status "Railway URL found: $RAILWAY_URL"
    echo ""
    
    print_info "Testing API endpoints..."
    echo ""
    
    # Test 1: Health check
    print_info "🏥 Testing health endpoint..."
    echo "Endpoint: $RAILWAY_URL/health"
    HEALTH_RESPONSE=$(curl -s "$RAILWAY_URL/health" || echo "ERROR")
    if [[ "$HEALTH_RESPONSE" == *"healthy"* ]]; then
        print_status "Health check passed!"
        echo "Response: $HEALTH_RESPONSE"
    else
        print_error "Health check failed!"
        echo "Response: $HEALTH_RESPONSE"
    fi
    echo ""
    
    # Test 2: Root endpoint
    print_info "🏠 Testing root endpoint..."
    echo "Endpoint: $RAILWAY_URL/"
    ROOT_RESPONSE=$(curl -s "$RAILWAY_URL/" || echo "ERROR")
    if [[ "$ROOT_RESPONSE" == *"CineFluent"* ]]; then
        print_status "Root endpoint working!"
        echo "Response: $ROOT_RESPONSE"
    else
        print_error "Root endpoint issue!"
        echo "Response: $ROOT_RESPONSE"
    fi
    echo ""
    
    # Test 3: Movies API
    print_info "🎬 Testing movies endpoint..."
    echo "Endpoint: $RAILWAY_URL/api/v1/movies"
    MOVIES_RESPONSE=$(curl -s "$RAILWAY_URL/api/v1/movies" || echo "ERROR")
    if [[ "$MOVIES_RESPONSE" == *"Finding Nemo"* ]]; then
        print_status "Movies API working!"
        echo "Response: $MOVIES_RESPONSE"
    else
        print_error "Movies API issue!"
        echo "Response: $MOVIES_RESPONSE"
    fi
    echo ""
    
    # Test 4: Login endpoint
    print_info "🔐 Testing login endpoint..."
    echo "Endpoint: $RAILWAY_URL/api/v1/auth/login"
    LOGIN_RESPONSE=$(curl -s -X POST "$RAILWAY_URL/api/v1/auth/login" \
        -H "Content-Type: application/json" \
        -d '{"username":"demo@cinefluent.com","password":"demo123"}' || echo "ERROR")
    
    if [[ "$LOGIN_RESPONSE" == *"Demo User"* ]]; then
        print_status "Login API working!"
        echo "Response: $LOGIN_RESPONSE"
    else
        print_error "Login API issue!"
        echo "Response: $LOGIN_RESPONSE"
    fi
    echo ""
    
    # Summary
    echo "🎯 API TESTING SUMMARY"
    echo "===================="
    echo "✨ Your Railway backend URL: $RAILWAY_URL"
    echo "📖 API Documentation: $RAILWAY_URL/docs"
    echo "🔗 Alternative docs: $RAILWAY_URL/redoc"
    echo ""
    
    print_info "Save this URL for your frontend configuration:"
    echo "VITE_API_URL=$RAILWAY_URL"
    echo ""
    
    # Create env file for frontend
    if [ -d "../frontend" ]; then
        print_info "Creating frontend environment file..."
        cat > ../frontend/.env.production << EOF
# Production Environment Variables
VITE_API_URL=$RAILWAY_URL
VITE_USE_MOCK_DATA=false
VITE_APP_NAME=CineFluent
VITE_ENVIRONMENT=production

# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=GA-XXXX-X

# Feature Flags
VITE_ENABLE_COMMUNITY=true
VITE_ENABLE_PREMIUM=true
EOF
        print_status "Created frontend/.env.production with your Railway URL!"
    fi
    
    print_info "🚀 Next steps:"
    echo "1. Deploy your frontend to Vercel/Netlify with the Railway URL"
    echo "2. Test the full application end-to-end"
    echo "3. Share your app with the world! 🌍"
    
else
    print_error "Could not determine Railway URL. Please check your Railway dashboard."
    echo ""
    print_info "Manual steps:"
    echo "1. Go to https://railway.app/dashboard"
    echo "2. Select your cinefluent-backend project"
    echo "3. Go to Settings > Networking"
    echo "4. Generate a domain if you don't have one"
    echo "5. Test the URLs manually"
fi

echo ""
print_status "Railway backend testing complete! 🎉"