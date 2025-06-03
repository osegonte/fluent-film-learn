#!/bin/bash
echo "🚀 Starting CineFluent Backend"
echo "=============================="

if [ -d "venv" ]; then
    source venv/bin/activate
fi

echo "🔥 Server starting on http://localhost:8000"
echo "📖 API Docs: http://localhost:8000/docs"
echo ""

python main.py
