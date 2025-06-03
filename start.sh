#!/bin/bash
echo "🚀 Starting CineFluent Backend"
echo "=============================="

if [ -d "venv" ]; then
    source venv/bin/activate
fi

echo "🔥 Server starting on http://localhost:8000"
echo "📖 API Docs: http://localhost:8000/docs"
echo "🔍 ReDoc: http://localhost:8000/redoc"
echo "❤️  Health: http://localhost:8000/health"
echo ""
echo "🛑 Press Ctrl+C to stop"
echo ""

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
