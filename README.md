# CineFluent 🎬

Learn languages through your favorite movies - a full-stack language learning platform.

## Project Structure

```
cinefluent/
├── frontend/          # React TypeScript application
├── backend/           # FastAPI Python application
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

## Quick Start

### Frontend Development
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) to view the app.

### Backend Development (Coming Soon)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
API will be available at [http://localhost:8000](http://localhost:8000).

## Development Workflow

1. **Frontend**: React app runs on `http://localhost:8080`
2. **Backend**: FastAPI server runs on `http://localhost:8000`
3. **Database**: PostgreSQL runs on `http://localhost:5432`

## Tech Stack

### Frontend
- ⚛️ React 18 + TypeScript
- 🎨 Tailwind CSS + shadcn/ui
- ⚡ Vite build tool
- 🧭 React Router for navigation

### Backend (Coming Soon)
- 🐍 FastAPI + Python
- 🐘 PostgreSQL database
- 🔧 SQLAlchemy ORM
- 🔐 JWT authentication

## Features

- 🎬 **Movie-based Learning**: Learn through authentic movie content
- 📚 **Interactive Lessons**: Video clips with subtitles and translations
- 🧠 **Smart Quizzes**: Contextual questions and vocabulary tracking
- 📊 **Progress Analytics**: Track learning journey and streaks
- 👥 **Community Features**: Connect with fellow learners
- 🏆 **Gamification**: Achievements and leaderboards

## Demo Credentials

For testing the frontend:
- **Email**: demo@cinefluent.com
- **Password**: demo123

## Contributing

1. Fork the repository
2. Create a feature branch
3. Work in either `frontend/` or `backend/` directory
4. Test your changes thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
