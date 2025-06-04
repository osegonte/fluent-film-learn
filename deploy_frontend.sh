#!/bin/bash

echo "🚀 Deploying CineFluent Frontend to Vercel"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
fi

# Navigate to frontend directory
cd frontend

echo "🔧 Setting up environment variables..."

# Get Railway backend URL
echo "📝 Please provide your Railway backend URL from the deployment above"
echo "   (it should look like: https://your-app-name.railway.app)"
read -p "Enter your Railway backend URL: " RAILWAY_URL

# Remove trailing slash if present
RAILWAY_URL=${RAILWAY_URL%/}

# Create or update production environment file
cat > .env.production << EOF
VITE_API_URL=${RAILWAY_URL}
VITE_USE_MOCK_DATA=false
VITE_APP_NAME=CineFluent
VITE_ENVIRONMENT=production
EOF

echo "✅ Environment variables configured:"
echo "   VITE_API_URL=${RAILWAY_URL}"
echo "   VITE_USE_MOCK_DATA=false"

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the application to test
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi

echo "🚀 Deploying to Vercel..."

# Deploy to Vercel
vercel --prod --yes

echo ""
echo "✅ Frontend deployment complete!"
echo ""
echo "📱 Your CineFluent app is now live and ready for mobile testing!"
echo ""
echo "🔗 Next steps:"
echo "   1. Open the Vercel URL on your mobile device"
echo "   2. Test login with: demo@cinefluent.com / demo123"
echo "   3. Try the movie learning experience"
echo "   4. Test all screens: Learn, Progress, Community, Profile"
echo ""
echo "🐛 If you encounter any issues:"
echo "   1. Check browser console for errors"
echo "   2. Verify the backend URL is correct"
echo "   3. Ensure CORS is properly configured"
echo ""
echo "🎉 Happy learning with CineFluent!"