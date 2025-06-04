// src/data/mockData.ts
import { Movie, Lesson, User, VocabularyItem, QuizQuestion } from '../types/api';

export const mockUser: User = {
  id: '1',
  email: 'john@example.com',
  name: 'John Doe',
  avatar: '',
  level: 'Intermediate B1',
  streak: 12,
  totalWords: 1247,
  studyTime: '47h 23m',
};

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Finding Nemo',
    language: 'Spanish',
    difficulty: 'Beginner',
    rating: 4.8,
    duration: '100 min',
    scenes: '12 scenes',
    progress: 35,
    thumbnail: '🐠',
    totalLessons: 12,
    completedLessons: 4,
  },
  {
    id: '2',
    title: 'Toy Story',
    language: 'Spanish',
    difficulty: 'Beginner',
    rating: 4.9,
    duration: '81 min',
    scenes: '10 scenes',
    progress: 100,
    thumbnail: '🤠',
    totalLessons: 10,
    completedLessons: 10,
  },
  {
    id: '3',
    title: 'Ratatouille',
    language: 'French',
    difficulty: 'Intermediate',
    rating: 4.7,
    duration: '111 min',
    scenes: '15 scenes',
    progress: 0,
    thumbnail: '🐭',
    totalLessons: 15,
    completedLessons: 0,
  },
  {
    id: '4',
    title: 'The Incredibles',
    language: 'Spanish',
    difficulty: 'Intermediate',
    rating: 4.6,
    duration: '115 min',
    scenes: '14 scenes',
    progress: 20,
    thumbnail: '💪',
    totalLessons: 14,
    completedLessons: 3,
  },
  {
    id: '5',
    title: 'Monsters, Inc.',
    language: 'German',
    difficulty: 'Beginner',
    rating: 4.5,
    duration: '92 min',
    scenes: '11 scenes',
    progress: 0,
    thumbnail: '👹',
    totalLessons: 11,
    completedLessons: 0,
  },
];

const mockVocabulary: VocabularyItem[] = [
  {
    word: 'océano',
    translation: 'ocean',
    pronunciation: '/oh-SEH-ah-no/',
    example: 'El pez vive en el océano.',
  },
  {
    word: 'familia',
    translation: 'family',
    pronunciation: '/fah-MEE-lee-ah/',
    example: 'Mi familia es muy grande.',
  },
  {
    word: 'aventura',
    translation: 'adventure',
    pronunciation: '/ah-ben-TOO-rah/',
    example: 'Esta es una gran aventura.',
  },
];

const mockQuiz: QuizQuestion[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'What does "océano" mean in English?',
    options: ['river', 'ocean', 'lake', 'sea'],
    correctAnswer: 'ocean',
    explanation: '"Océano" is the Spanish word for ocean, a large body of saltwater.',
  },
  {
    id: '2',
    type: 'multiple-choice',
    question: 'How do you say "family" in Spanish?',
    options: ['amigo', 'familia', 'casa', 'comida'],
    correctAnswer: 'familia',
    explanation: '"Familia" means family in Spanish.',
  },
  {
    id: '3',
    type: 'fill-blank',
    question: 'Complete the sentence: "El pez vive en el ______."',
    correctAnswer: 'océano',
    explanation: 'Fish live in the ocean, which is "océano" in Spanish.',
  },
];

export const mockLessons: Lesson[] = [
  {
    id: '1',
    movieId: '1',
    title: 'Meeting Nemo',
    subtitle: 'Hola, soy Nemo. Vivo en el océano con mi familia.',
    translation: 'Hello, I am Nemo. I live in the ocean with my family.',
    audioUrl: '/audio/lesson1.mp3',
    timestamp: '00:03:24',
    vocabulary: mockVocabulary,
    quiz: mockQuiz,
  },
  {
    id: '2',
    movieId: '1',
    title: 'The Great Barrier Reef',
    subtitle: 'Este es nuestro hogar, el arrecife de coral.',
    translation: 'This is our home, the coral reef.',
    audioUrl: '/audio/lesson2.mp3',
    timestamp: '00:05:12',
    vocabulary: [
      {
        word: 'hogar',
        translation: 'home',
        pronunciation: '/oh-GAHR/',
        example: 'Mi hogar está en el océano.',
      },
      {
        word: 'arrecife',
        translation: 'reef',
        pronunciation: '/ah-reh-SEE-feh/',
        example: 'El arrecife es muy colorido.',
      },
    ],
    quiz: [
      {
        id: '4',
        type: 'multiple-choice',
        question: 'What does "hogar" mean?',
        options: ['house', 'home', 'hotel', 'hospital'],
        correctAnswer: 'home',
        explanation: '"Hogar" means home in Spanish.',
      },
    ],
  },
];

// Mock API responses with delays to simulate real API behavior
export const mockApiService = {
  async getMovies(): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockMovies;
  },

  async getMovie(id: string): Promise<Movie> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const movie = mockMovies.find(m => m.id === id);
    if (!movie) throw new Error('Movie not found');
    return movie;
  },

  async getLesson(id: string): Promise<Lesson> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const lesson = mockLessons.find(l => l.id === id);
    if (!lesson) throw new Error('Lesson not found');
    return lesson;
  },

  async getMovieLessons(movieId: string): Promise<Lesson[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLessons.filter(l => l.movieId === movieId);
  },

  async getCurrentUser(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUser;
  },

  async login(email: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email === 'demo@cinefluent.com' && password === 'demo123') {
      return {
        user: mockUser,
        token: 'mock-jwt-token',
      };
    }
    throw new Error('Invalid credentials');
  },

  async register(email: string, password: string, name: string) {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      user: { ...mockUser, email, name },
      token: 'mock-jwt-token',
    };
  },

  async updateProgress(progress: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Progress updated:', progress);
  },
};