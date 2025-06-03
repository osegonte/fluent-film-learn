#!/bin/bash
echo "🚀 Starting CineFluent Backend"
echo "=============================="

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo "❌ Virtual environment not found. Run setup_backend.sh first."
    exit 1
fi

echo "🔥 Starting FastAPI server..."
echo "📖 API Docs: http://localhost:8000/docs"
echo "🔍 ReDoc: http://localhost:8000/redoc" 
echo "❤️  Health: http://localhost:8000/health"
echo ""
echo "🛑 Press Ctrl+C to stop"
echo ""

python main.py
