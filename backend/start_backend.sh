#!/bin/bash

# 🚀 CineFluent Backend Startup Script
echo "🎬 Starting CineFluent Backend..."
echo "================================="

# Set environment variables for development
export SECRET_KEY="dev-secret-key-change-in-production"
export DEBUG="True"

# Check if requirements are installed
echo "📦 Checking dependencies..."
if ! python -c "import fastapi" 2>/dev/null; then
    echo "📥 Installing requirements..."
    pip install -r requirements.txt
fi

# Start the backend server
echo "🚀 Starting server on http://localhost:8000"
echo "📚 API docs: http://localhost:8000/docs"
echo "🔑 Demo login: demo@cinefluent.com / demo123"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================"

python main.py
