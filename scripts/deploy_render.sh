#!/bin/bash

echo "🎨 Deploying CineFluent to Render"
echo "==============================="

echo "📋 Render Deployment Checklist:"
echo ""
echo "1. Create a new Web Service on Render"
echo "2. Connect your GitHub repository"
echo "3. Set build command: cd backend && pip install -r requirements.txt"
echo "4. Set start command: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT"
echo "5. Add environment variables from .env.production"
echo ""
echo "For frontend:"
echo "1. Create a new Static Site on Render"
echo "2. Set build command: cd frontend && npm install && npm run build"
echo "3. Set publish directory: frontend/dist"
echo ""
echo "🔗 Visit https://dashboard.render.com to deploy"
