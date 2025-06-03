#!/bin/bash
echo "🚀 Starting CineFluent Backend (Development)"
echo "============================================"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run setup first."
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Verify FastAPI is installed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "❌ FastAPI not found. Please run setup first."
    exit 1
fi

# Start the server
echo "🔥 Starting FastAPI server..."
echo "📖 API Documentation: http://localhost:8000/docs"
echo "🔍 Alternative Docs: http://localhost:8000/redoc"
echo "❤️  Health Check: http://localhost:8000/health"
echo "🔗 API Base URL: http://localhost:8000/api/v1"
echo ""
echo "🎯 Demo Credentials:"
echo "   Email: demo@cinefluent.com"
echo "   Password: demo123"
echo ""
echo "🧪 Test Commands:"
echo "   curl http://localhost:8000/health"
echo "   curl http://localhost:8000/api/v1/movies"
echo ""
echo "🛑 Press Ctrl+C to stop"
echo ""

python main.py
