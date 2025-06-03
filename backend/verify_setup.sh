#!/bin/bash
echo "🔍 Verifying CineFluent Backend Setup"
echo "===================================="

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo "❌ Virtual environment not found"
    exit 1
fi

# Check Python version
echo "🐍 Python Version:"
python --version

# Check key packages
echo -e "\n📦 Installed Packages:"
pip list | grep -E "(fastapi|uvicorn|pydantic|jose|passlib)"

# Test imports
echo -e "\n🧪 Testing Imports:"
python -c "
try:
    import fastapi
    import uvicorn
    import pydantic
    from jose import jwt
    from passlib.context import CryptContext
    print('✅ All required packages imported successfully!')
except ImportError as e:
    print(f'❌ Import error: {e}')
    exit(1)
"

# Check if main.py exists and is valid
echo -e "\n📄 Checking main.py:"
if [ -f "main.py" ]; then
    python -m py_compile main.py && echo "✅ main.py syntax is valid" || echo "❌ main.py has syntax errors"
else
    echo "❌ main.py not found"
fi

echo -e "\n✅ Setup verification complete!"
