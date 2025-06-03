import { User, Movie, Lesson, Progress, AuthResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async logout(): Promise<void> {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Movies
  async getMovies(): Promise<Movie[]> {
    return this.request<Movie[]>('/movies');
  }

  async getMovie(id: string): Promise<Movie> {
    return this.request<Movie>(`/movies/${id}`);
  }

  // Lessons
  async getLesson(id: string): Promise<Lesson> {
    return this.request<Lesson>(`/lessons/${id}`);
  }

  async getMovieLessons(movieId: string): Promise<Lesson[]> {
    return this.request<Lesson[]>(`/movies/${movieId}/lessons`);
  }

  // Progress
  async updateProgress(progress: Progress): Promise<void> {
    await this.request('/progress', {
      method: 'POST',
      body: JSON.stringify(progress),
    });
  }

  async getUserProgress(): Promise<Progress[]> {
    return this.request<Progress[]>('/progress');
  }

  // User
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/user/me');
  }
}

export const apiService = new ApiService();
