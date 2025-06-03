#!/bin/bash

echo "▲ Deploying CineFluent to Vercel"
echo "==============================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy frontend to Vercel
echo "⚛️  Deploying frontend to Vercel..."
cd frontend
vercel --prod

echo "✅ Frontend deployed to Vercel!"
echo "🔗 Your app URL will be shown above"
