
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  level: string;
  streak: number;
  totalWords: number;
  studyTime: string;
}

export interface Movie {
  id: string;
  title: string;
  language: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  duration: string;
  scenes: string;
  progress: number;
  thumbnail: string;
  totalLessons: number;
  completedLessons: number;
}

export interface Lesson {
  id: string;
  movieId: string;
  title: string;
  subtitle: string;
  translation: string;
  audioUrl: string;
  timestamp: string;
  vocabulary: VocabularyItem[];
  quiz: QuizQuestion[];
}

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Progress {
  lessonId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  vocabularyMastered: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}
