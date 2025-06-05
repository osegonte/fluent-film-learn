# 🎬 CineFluent - Learn Languages Through Movies

A modern language learning platform that uses movie scenes to teach vocabulary and grammar in context.

## ✨ Features

- 🎥 **Movie-based Learning**: Learn through authentic movie content
- 📚 **Interactive Lessons**: Video clips with subtitles and translations  
- 🧠 **Smart Quizzes**: Contextual questions and vocabulary tracking
- 📊 **Progress Analytics**: Track learning journey and streaks
- 👥 **Community Features**: Connect with fellow learners
- 🏆 **Gamification**: Achievements and leaderboards

## 🚀 Quick Start

### Demo Credentials
- **Email**: `demo@cinefluent.com`
- **Password**: `demo123`

### Tech Stack

**Frontend:**
- ⚛️ React 18 + TypeScript
- 🎨 Tailwind CSS + shadcn/ui
- ⚡ Vite build tool
- 🧭 React Router for navigation

**Backend:**
- 🐍 FastAPI + Python
- 🔐 JWT authentication
- 📊 RESTful API design

## 📂 Project Structure

```
cinefluent/
├── frontend/          # React TypeScript application
├── main.py            # FastAPI backend application
├── requirements.txt   # Python dependencies
├── render.yaml        # Render.com deployment config
└── README.md          # This file
```

## 🛠️ Development

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

### Backend
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🚀 Deployment

This app is configured for deployment on:

- **Frontend**: Vercel
- **Backend**: Render.com

### Deploy to Render + Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy Backend to Render**:
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

3. **Deploy Frontend to Vercel**:
   ```bash
   cd frontend
   vercel --prod
   ```

## 📱 API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/movies` - Get all movies
- `GET /api/v1/lessons/{id}` - Get lesson details
- `POST /api/v1/progress` - Update learning progress

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🎯 Demo

Try the live demo with the credentials above to explore:
- Movie-based lessons in Spanish, French, and German
- Interactive vocabulary learning
- Progress tracking and achievements
- Community features and leaderboards

Happy learning! 🚀
