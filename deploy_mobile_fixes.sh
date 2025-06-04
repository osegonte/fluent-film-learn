#!/bin/bash

echo "🚀 Deploying Mobile Fixes to Production"
echo "======================================"

# Build the frontend
cd frontend
echo "📦 Building frontend with mobile fixes..."
npm run build

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=dist

echo "✅ Mobile fixes deployed!"
echo "📱 Test your app: https://cinefluent.netlify.app"
echo ""
echo "🧪 Test checklist:"
echo "  ✓ Open on iPhone/Android"
echo "  ✓ Check touch targets (44x44 minimum)"
echo "  ✓ Verify safe area spacing"
echo "  ✓ Test landscape/portrait rotation"
echo "  ✓ Check text readability"
echo "  ✓ Verify smooth animations"
