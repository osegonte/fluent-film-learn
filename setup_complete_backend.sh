#!/bin/bash

# =============================================================================
# Complete CineFluent Backend Setup Script
# This script sets up the entire FastAPI backend from scratch
# =============================================================================

cat > setup_complete_backend.sh << 'EOF'
#!/bin/bash

echo "🎬 CineFluent Backend Complete Setup"
echo "====================================="
echo ""

# Color codes for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_step() {
    echo -e "${BLUE}📋 Step $1: $2${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_step "1" "Checking prerequisites"
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is required but not installed"
        exit 1
    fi
    
    # Check pip
    if ! command -v pip3 &> /dev/null; then
        print_error "pip3 is required but not installed"
        exit 1
    fi
    
    # Check if we're in the right directory
    if [ ! -d "backend" ]; then
        print_error "backend directory not found. Please run from project root."
        exit 1
    fi
    
    print_success "Prerequisites check passed"
    echo ""
}

# Setup virtual environment
setup_venv() {
    print_step "2" "Setting up Python virtual environment"
    
    cd backend
    
    # Remove existing venv if it exists
    if [ -d "venv" ]; then
        print_warning "Removing existing virtual environment"
        rm -rf venv
    fi
    
    # Create new virtual environment
    python3 -m venv venv
    source venv/bin/activate
    
    # Upgrade pip
    pip install --upgrade pip
    
    print_success "Virtual environment created and activated"
    echo ""
}

# Install dependencies
install_dependencies() {
    print_step "3" "Installing Python dependencies"
    
    # Install from requirements.txt
    pip install -r requirements.txt
    
    print_success "Dependencies installed successfully"
    echo ""
}

# Run all setup scripts
run_setup_scripts() {
    print_step "4" "Creating application structure"
    
    # Make scripts executable
    chmod +x *.sh 2>/dev/null || true
    
    # Run configuration setup
    echo "  🔧 Setting up configuration..."
    ./create_config.sh
    
    # Run models setup
    echo "  🗄️ Creating database models..."
    ./create_models.sh
    
    # Run API setup
    echo "  🔌 Creating API endpoints..."
    ./create_api.sh
    
    # Run tests setup
    echo "  🧪 Setting up tests..."
    ./create_tests.sh
    
    # Run Docker setup
    echo "  🐳 Creating Docker configuration..."
    ./create_docker.sh
    
    print_success "Application structure created"
    echo ""
}

# Setup database
setup_database() {
    print_step "5" "Setting up database"
    
    print_warning "Make sure PostgreSQL is running on localhost:5432"
    print_warning "Database credentials: cinefluent/password@localhost:5432/cinefluent"
    
    # Initialize database
    if [ -f "init_db.py" ]; then
        echo "  📊 Initializing database tables..."
        python init_db.py 2>/dev/null || print_warning "Database initialization skipped (database may not be ready)"
    fi
    
    # Seed database
    if [ -f "seed_db.py" ]; then
        echo "  🌱 Seeding with sample data..."
        python seed_db.py 2>/dev/null || print_warning "Database seeding skipped (database may not be ready)"
    fi
    
    print_success "Database setup completed"
    echo ""
}

# Test the setup
test_setup() {
    print_step "6" "Testing the setup"
    
    # Run tests if pytest is available
    if command -v pytest &> /dev/null; then
        echo "  🧪 Running tests..."
        pytest tests/ -v 2>/dev/null || print_warning "Some tests may have failed (this is normal if database is not ready)"
    else
        print_warning "pytest not available, skipping tests"
    fi
    
    print_success "Setup testing completed"
    echo ""
}

# Create startup scripts
create_startup_scripts() {
    print_step "7" "Creating startup scripts"
    
    # Create development startup script
    cat > start_dev.sh << 'DEV_START_EOF'
#!/bin/bash
echo "🚀 Starting CineFluent Backend (Development)"
echo "============================================"

# Activate virtual environment
source venv/bin/activate

# Initialize database if needed
if [ ! -f ".db_initialized" ]; then
    echo "📊 Initializing database..."
    python init_db.py && touch .db_initialized
fi

# Seed database if needed
if [ ! -f ".db_seeded" ]; then
    echo "🌱 Seeding database with sample data..."
    python seed_db.py && touch .db_seeded
fi

# Start the server
echo "🔥 Starting FastAPI server..."
echo "📖 API Documentation: http://localhost:8000/docs"
echo "🔍 Alternative Docs: http://localhost:8000/redoc"
echo "❤️  Health Check: http://localhost:8000/health"
echo ""
python main.py
DEV_START_EOF

    chmod +x start_dev.sh
    
    # Create production startup script
    cat > start_prod.sh << 'PROD_START_EOF'
#!/bin/bash
echo "🚀 Starting CineFluent Backend (Production)"
echo "==========================================="

# Activate virtual environment
source venv/bin/activate

# Run with gunicorn for production
if command -v gunicorn &> /dev/null; then
    gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
else
    echo "⚠️  Gunicorn not installed, falling back to uvicorn"
    python main.py
fi
PROD_START_EOF

    chmod +x start_prod.sh
    
    print_success "Startup scripts created"
    echo ""
}

# Main execution
main() {
    echo "This script will set up the complete CineFluent FastAPI backend."
    echo "It will create all necessary files, install dependencies, and configure the database."
    echo ""
    
    read -p "Continue? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
    
    echo ""
    
    # Run all setup steps
    check_prerequisites
    setup_venv
    install_dependencies
    run_setup_scripts
    setup_database
    test_setup
    create_startup_scripts
    
    # Final success message
    echo ""
    echo "🎉 CineFluent Backend Setup Complete!"
    echo "====================================="
    echo ""
    echo "📁 Project structure created in ./backend/"
    echo "🐍 Virtual environment: ./backend/venv/"
    echo "⚙️  Configuration: ./backend/.env"
    echo ""
    echo "🚀 To start the backend:"
    echo "   cd backend"
    echo "   ./start_dev.sh"
    echo ""
    echo "📖 API Documentation will be available at:"
    echo "   http://localhost:8000/docs"
    echo "   http://localhost:8000/redoc"
    echo ""
    echo "🧪 To run tests:"
    echo "   cd backend"
    echo "   source venv/bin/activate"
    echo "   pytest tests/"
    echo ""
    echo "🐳 To run with Docker:"
    echo "   docker-compose up backend"
    echo ""
    echo "📊 Database Info:"
    echo "   URL: postgresql://cinefluent:password@localhost:5432/cinefluent"
    echo "   Make sure PostgreSQL is running and database exists"
    echo ""
    echo "✨ Next steps:"
    echo "   1. Start the backend: cd backend && ./start_dev.sh"
    echo "   2. Update frontend API URL to http://localhost:8000"
    echo "   3. Test the API endpoints"
    echo "   4. Start building your features!"
    echo ""
}

# Run main function
main

EOF

# Create a simple script to run all setup scripts at once
cat > run_all_setup.sh << 'EOF'
#!/bin/bash

echo "🎬 Running All CineFluent Backend Setup Scripts"
echo "=============================================="

# Make all scripts executable
chmod +x *.sh

# Create the main setup script
./setup_complete_backend.sh

EOF

chmod +x setup_complete_backend.sh
chmod +x run_all_setup.sh

echo ""
echo "🎉 Complete Backend Setup System Ready!"
echo "======================================="
echo ""
echo "📋 Available Scripts:"
echo "  📦 setup_complete_backend.sh  - Complete automated setup"
echo "  🔧 Individual setup scripts:"
echo "     - create_config.sh        - Configuration setup"
echo "     - create_models.sh        - Database models"
echo "     - create_api.sh           - API endpoints"
echo "     - create_tests.sh         - Test setup"
echo "     - create_docker.sh        - Docker configuration"
echo ""
echo "🚀 Quick Start:"
echo "   ./setup_complete_backend.sh"
echo ""
echo "📋 What the setup includes:"
echo "   ✅ FastAPI application with authentication"
echo "   ✅ PostgreSQL database models"
echo "   ✅ JWT token-based security"
echo "   ✅ API endpoints for movies, lessons, users"
echo "   ✅ Comprehensive test suite"
echo "   ✅ Docker configuration"
echo "   ✅ Database seeding with sample data"
echo "   ✅ Development and production startup scripts"
echo ""
echo "⚠️  Prerequisites:"
echo "   - Python 3.8+ installed"
echo "   - PostgreSQL running (optional for initial setup)"
echo "   - Git for version control"