// Essential mock data for fallback
export const mockApiService = {
  async getMovies() {
    return [];
  },
  async getMovie(id: string) {
    throw new Error('Movie not found');
  },
  async getLesson(id: string) {
    throw new Error('Lesson not found');
  },
  async getMovieLessons(movieId: string) {
    return [];
  },
  async getCurrentUser() {
    return {
      id: '1',
      email: 'demo@cinefluent.com',
      name: 'Demo User',
      level: 'Intermediate B1',
      streak: 12,
      totalWords: 1247,
      studyTime: '47h 23m',
    };
  },
  async login(email: string, password: string) {
    if (email === 'demo@cinefluent.com' && password === 'demo123') {
      return {
        user: {
          id: '1',
          email: 'demo@cinefluent.com',
          name: 'Demo User',
          level: 'Intermediate B1',
          streak: 12,
          totalWords: 1247,
          studyTime: '47h 23m',
        },
        token: 'mock-jwt-token',
      };
    }
    throw new Error('Invalid credentials');
  },
  async register(email: string, password: string, name: string) {
    return {
      user: { id: '2', email, name, level: 'Beginner', streak: 0, totalWords: 0, studyTime: '0h 0m' },
      token: 'mock-jwt-token',
    };
  },
  async updateProgress(progress: any) {
    console.log('Progress updated:', progress);
  },
};
