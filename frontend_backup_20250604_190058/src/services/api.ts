// src/services/api.ts
import { User, Movie, Lesson, Progress, AuthResponse } from '../types/api';
import { mockApiService } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Use mock data if explicitly enabled or in development without backend
    if (USE_MOCK_DATA) {
      console.log('Using mock data for development');
      throw new Error('Using mock data');
    }

    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    };

    try {
      console.log(`Making API request to: ${url}`);
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      
      // Fallback to mock data if API is unavailable
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('API unavailable, falling back to mock data');
        return this.fallbackToMock(endpoint, options);
      }
      
      throw error;
    }
  }

  private async fallbackToMock<T>(endpoint: string, options: RequestInit): Promise<T> {
    // Simple fallback logic for development
    if (endpoint === '/api/v1/movies' && options.method !== 'POST') {
      return mockApiService.getMovies() as any;
    }
    if (endpoint.startsWith('/api/v1/lessons/') && options.method !== 'POST') {
      const lessonId = endpoint.split('/').pop()!;
      return mockApiService.getLesson(lessonId) as any;
    }
    if (endpoint.includes('/lessons') && options.method !== 'POST') {
      const movieId = endpoint.split('/')[3];
      return mockApiService.getMovieLessons(movieId) as any;
    }
    
    throw new Error('API unavailable and no mock fallback available');
  }

  // Authentication
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.request<AuthResponse>('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: email, password }),
      });
      
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
      return response;
    } catch (error) {
      console.warn('Login API failed, trying mock data');
      return mockApiService.login(email, password);
    }
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      const response = await this.request<AuthResponse>('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });
      
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
      return response;
    } catch (error) {
      console.warn('Register API failed, trying mock data');
      return mockApiService.register(email, password, name);
    }
  }

  async logout(): Promise<void> {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Movies
  async getMovies(): Promise<Movie[]> {
    try {
      return await this.request<Movie[]>('/api/v1/movies');
    } catch (error) {
      console.warn('Movies API failed, using mock data');
      return mockApiService.getMovies();
    }
  }

  async getMovie(id: string): Promise<Movie> {
    try {
      return await this.request<Movie>(`/api/v1/movies/${id}`);
    } catch (error) {
      return mockApiService.getMovie(id);
    }
  }

  // Lessons
  async getLesson(id: string): Promise<Lesson> {
    try {
      return await this.request<Lesson>(`/api/v1/lessons/${id}`);
    } catch (error) {
      return mockApiService.getLesson(id);
    }
  }

  async getMovieLessons(movieId: string): Promise<Lesson[]> {
    try {
      return await this.request<Lesson[]>(`/api/v1/movies/${movieId}/lessons`);
    } catch (error) {
      return mockApiService.getMovieLessons(movieId);
    }
  }

  // Progress
  async updateProgress(progress: Progress): Promise<void> {
    try {
      await this.request('/api/v1/progress', {
        method: 'POST',
        body: JSON.stringify(progress),
      });
    } catch (error) {
      console.warn('Progress update failed:', error);
      // Don't throw - progress updates are not critical
    }
  }

  // User
  async getCurrentUser(): Promise<User> {
    try {
      return await this.request<User>('/api/v1/user/me');
    } catch (error) {
      return mockApiService.getCurrentUser();
    }
  }
}

export const apiService = new ApiService();
