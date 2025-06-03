#!/bin/bash

# CineFluent Development Helper Script

case "$1" in
    "frontend")
        echo "🚀 Starting frontend development server..."
        cd frontend && npm run dev
        ;;
    "backend")
        echo "🐍 Starting backend development server..."
        cd backend && python main.py
        ;;
    "install")
        echo "📦 Installing frontend dependencies..."
        cd frontend && npm install --legacy-peer-deps
        echo "✅ Frontend dependencies installed!"
        ;;
    "build")
        echo "🏗️ Building frontend for production..."
        cd frontend && npm run build
        ;;
    "docker")
        echo "🐳 Starting full stack with Docker..."
        docker-compose up --build
        ;;
    "docker-down")
        echo "🛑 Stopping Docker services..."
        docker-compose down
        ;;
    *)
        echo "CineFluent Development Helper"
        echo "Usage: ./dev.sh [command]"
        echo ""
        echo "Commands:"
        echo "  frontend     Start frontend development server"
        echo "  backend      Start backend development server"
        echo "  install      Install frontend dependencies"
        echo "  build        Build frontend for production"
        echo "  docker       Start full stack with Docker"
        echo "  docker-down  Stop Docker services"
        echo ""
        echo "Examples:"
        echo "  ./dev.sh frontend"
        echo "  ./dev.sh install"
        echo "  ./dev.sh docker"
        ;;
esac
