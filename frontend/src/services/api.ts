// src/services/api.ts
import { User, Movie, Lesson, Progress, AuthResponse } from '../types/api';
import { mockApiService } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || false;

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Use mock data in development or when API is not available
    if (USE_MOCK_DATA) {
      throw new Error('Mock data should be used instead');
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
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      return mockApiService.login(email, password);
    }

    const response = await this.request<AuthResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: email, password }), // Backend expects 'username'
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      return mockApiService.register(email, password, name);
    }

    const response = await this.request<AuthResponse>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async logout(): Promise<void> {
    if (USE_MOCK_DATA) {
      this.token = null;
      localStorage.removeItem('auth_token');
      return;
    }

    try {
      await this.request('/api/v1/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('auth_token');
    }
  }

  // Movies
  async getMovies(): Promise<Movie[]> {
    if (USE_MOCK_DATA) {
      return mockApiService.getMovies();
    }

    return this.request<Movie[]>('/api/v1/movies');
  }

  async getMovie(id: string): Promise<Movie> {
    if (USE_MOCK_DATA) {
      return mockApiService.getMovie(id);
    }

    return this.request<Movie>(`/api/v1/movies/${id}`);
  }

  // Lessons
  async getLesson(id: string): Promise<Lesson> {
    if (USE_MOCK_DATA) {
      return mockApiService.getLesson(id);
    }

    return this.request<Lesson>(`/api/v1/lessons/${id}`);
  }

  async getMovieLessons(movieId: string): Promise<Lesson[]> {
    if (USE_MOCK_DATA) {
      return mockApiService.getMovieLessons(movieId);
    }

    return this.request<Lesson[]>(`/api/v1/movies/${movieId}/lessons`);
  }

  // Progress
  async updateProgress(progress: Progress): Promise<void> {
    if (USE_MOCK_DATA) {
      return mockApiService.updateProgress(progress);
    }

    await this.request('/api/v1/progress', {
      method: 'POST',
      body: JSON.stringify(progress),
    });
  }

  async getUserProgress(): Promise<Progress[]> {
    if (USE_MOCK_DATA) {
      // Return empty progress for now
      return [];
    }

    return this.request<Progress[]>('/api/v1/progress');
  }

  // User
  async getCurrentUser(): Promise<User> {
    if (USE_MOCK_DATA) {
      return mockApiService.getCurrentUser();
    }

    return this.request<User>('/api/v1/user/me');
  }
}

export const apiService = new ApiService();