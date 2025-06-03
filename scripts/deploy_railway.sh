#!/bin/bash

echo "🚂 Deploying CineFluent to Railway"
echo "================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Please login to Railway..."
railway login

# Deploy backend
echo "🐍 Deploying backend..."
cd backend
railway up

# Deploy frontend
echo "⚛️  Deploying frontend..."
cd ../frontend
railway up

echo "✅ Deployment complete!"
echo "🔗 Check your Railway dashboard for deployment URLs"
