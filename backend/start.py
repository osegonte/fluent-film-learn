import subprocess
import sys
import os

# Install requirements first
print("Installing dependencies...")
subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

# Then start the app
print("Starting FastAPI app...")
port = int(os.environ.get("PORT", 8000))
subprocess.check_call([
    sys.executable, "-m", "uvicorn", 
    "main:app", 
    "--host", "0.0.0.0", 
    "--port", str(port)
])
