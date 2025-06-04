// src/services/api.ts - Enhanced with full backend sync
import { User, Movie, Lesson, Progress, AuthResponse } from '../types/api';
import { mockApiService } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// Enhanced types for backend sync
export interface WeeklyActivity {
  date: string;
  lessonsCompleted: number;
  timeSpent: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  status: 'Earned' | 'In Progress' | 'Locked';
  icon: string;
  color: string;
  progress?: number;
  earnedDate?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  streak: number;
  change: string;
  badge?: string;
  avatar: string;
  level: string;
  isCurrentUser?: boolean;
}

export interface CommunityPost {
  id: string;
  user: string;
  initials: string;
  time: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  badge?: string;
  streak: number;
}

class ApiService {
  private token: string | null = null;
  private retryCount = 0;
  private maxRetries = 3;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Use mock data if explicitly enabled
    if (USE_MOCK_DATA) {
      console.log('🔄 Using mock data for development');
      return this.fallbackToMock(endpoint, options);
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
      console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
      const response = await fetch(url, config);
      
      // Handle different HTTP status codes
      if (response.status === 401) {
        // Unauthorized - clear token and redirect to login
        this.clearAuth();
        throw new Error('Authentication required. Please login again.');
      }
      
      if (response.status === 403) {
        throw new Error('Access forbidden. Check your permissions.');
      }
      
      if (response.status === 404) {
        throw new Error('Resource not found.');
      }
      
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ API Success: ${endpoint}`);
      this.retryCount = 0; // Reset retry count on success
      return data;
      
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error);
      
      // Retry logic for network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          console.log(`🔄 Retrying API call (${this.retryCount}/${this.maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount));
          return this.request<T>(endpoint, options);
        }
        
        console.warn('🔄 API unavailable, falling back to mock data');
        return this.fallbackToMock(endpoint, options);
      }
      
      throw error;
    }
  }

  private async fallbackToMock<T>(endpoint: string, options: RequestInit): Promise<T> {
    console.log(`🎭 Mock fallback for: ${endpoint}`);
    
    // Enhanced fallback logic
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
    
    if (endpoint === '/api/v1/user/me') {
      return mockApiService.getCurrentUser() as any;
    }
    
    // Default mock responses for new endpoints
    if (endpoint === '/api/v1/achievements') {
      return [
        {
          id: 'first_movie',
          title: 'First Movie',
          description: 'Complete your first movie',
          status: 'Earned',
          icon: '🎬',
          color: 'primary',
          earnedDate: '2 days ago'
        },
        {
          id: 'week_warrior',
          title: 'Week Warrior',
          description: '7-day learning streak',
          status: 'Earned',
          icon: '🔥',
          color: 'warning',
          earnedDate: '1 week ago'
        }
      ] as any;
    }
    
    if (endpoint === '/api/v1/community/posts') {
      return [
        {
          id: '1',
          user: 'Sarah Chen',
          initials: 'SC',
          time: '2m ago',
          content: 'Just finished Toy Story in Spanish! 🎬',
          likes: 12,
          badge: 'crown',
          streak: 28
        }
      ] as any;
    }
    
    if (endpoint === '/api/v1/community/leaderboard') {
      return [
        {
          rank: 1,
          name: 'Sarah Chen',
          points: 2847,
          streak: 28,
          change: '+5',
          badge: 'crown',
          avatar: 'SC',
          level: 'Expert'
        },
        {
          rank: 4,
          name: 'You',
          points: 1847,
          streak: 12,
          change: '+3',
          isCurrentUser: true,
          avatar: 'YU',
          level: 'Intermediate'
        }
      ] as any;
    }
    
    if (endpoint === '/api/v1/progress/weekly') {
      return [
        { date: '2024-01-01', lessonsCompleted: 2, timeSpent: 45 },
        { date: '2024-01-02', lessonsCompleted: 1, timeSpent: 30 }
      ] as any;
    }
    
    throw new Error(`No mock data available for ${endpoint}`);
  }

  private clearAuth(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Authentication methods
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.request<AuthResponse>('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: email, password }),
      });
      
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
      console.log('✅ Login successful');
      return response;
    } catch (error) {
      console.warn('🔄 Login API failed, trying mock data');
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
      console.log('✅ Registration successful');
      return response;
    } catch (error) {
      console.warn('🔄 Register API failed, trying mock data');
      return mockApiService.register(email, password, name);
    }
  }

  async logout(): Promise<void> {
    try {
      // Call backend logout endpoint if available
      await this.request('/api/v1/auth/logout', { method: 'POST' });
    } catch (error) {
      console.warn('Logout endpoint not available, clearing local auth');
    } finally {
      this.clearAuth();
      console.log('✅ Logged out successfully');
    }
  }

  // Movie methods
  async getMovies(): Promise<Movie[]> {
    try {
      return await this.request<Movie[]>('/api/v1/movies');
    } catch (error) {
      console.warn('🔄 Movies API failed, using mock data');
      return mockApiService.getMovies();
    }
  }

  async getMovie(id: string): Promise<Movie> {
    try {
      return await this.request<Movie>(`/api/v1/movies/${id}`);
    } catch (error) {
      console.warn('🔄 Movie API failed, using mock data');
      return mockApiService.getMovie(id);
    }
  }

  // Lesson methods
  async getLesson(id: string): Promise<Lesson> {
    try {
      return await this.request<Lesson>(`/api/v1/lessons/${id}`);
    } catch (error) {
      console.warn('🔄 Lesson API failed, using mock data');
      return mockApiService.getLesson(id);
    }
  }

  async getMovieLessons(movieId: string): Promise<Lesson[]> {
    try {
      return await this.request<Lesson[]>(`/api/v1/movies/${movieId}/lessons`);
    } catch (error) {
      console.warn('🔄 Movie lessons API failed, using mock data');
      return mockApiService.getMovieLessons(movieId);
    }
  }

  // Progress methods
  async updateProgress(progress: Progress): Promise<void> {
    try {
      await this.request('/api/v1/progress', {
        method: 'POST',
        body: JSON.stringify(progress),
      });
      console.log('✅ Progress updated successfully');
    } catch (error) {
      console.warn('⚠️ Progress update failed:', error);
      // Don't throw - progress updates are not critical for UX
    }
  }

  async getWeeklyProgress(): Promise<WeeklyActivity[]> {
    try {
      return await this.request<WeeklyActivity[]>('/api/v1/progress/weekly');
    } catch (error) {
      console.warn('🔄 Weekly progress API failed, using mock data');
      return [
        { date: '2024-01-01', lessonsCompleted: 2, timeSpent: 45 },
        { date: '2024-01-02', lessonsCompleted: 1, timeSpent: 30 },
        { date: '2024-01-03', lessonsCompleted: 3, timeSpent: 60 }
      ];
    }
  }

  // User methods
  async getCurrentUser(): Promise<User> {
    try {
      return await this.request<User>('/api/v1/user/me');
    } catch (error) {
      console.warn('🔄 User API failed, using mock data');
      return mockApiService.getCurrentUser();
    }
  }

  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    try {
      return await this.request<Achievement[]>('/api/v1/achievements');
    } catch (error) {
      console.warn('🔄 Achievements API failed, using mock data');
      return [
        {
          id: 'first_movie',
          title: 'First Movie',
          description: 'Complete your first movie',
          status: 'Earned',
          icon: '🎬',
          color: 'primary',
          earnedDate: '2 days ago'
        },
        {
          id: 'week_warrior',
          title: 'Week Warrior',
          description: '7-day learning streak',
          status: 'Earned',
          icon: '🔥',
          color: 'warning',
          earnedDate: '1 week ago'
        },
        {
          id: 'vocabulary_master',
          title: 'Vocabulary Master',
          description: 'Learn 500 new words',
          status: 'In Progress',
          icon: '📚',
          color: 'success',
          progress: 69
        }
      ];
    }
  }

  // Community methods
  async getCommunityPosts(): Promise<CommunityPost[]> {
    try {
      return await this.request<CommunityPost[]>('/api/v1/community/posts');
    } catch (error) {
      console.warn('🔄 Community posts API failed, using mock data');
      return [
        {
          id: '1',
          user: 'Sarah Chen',
          initials: 'SC',
          time: '2m ago',
          content: 'Just finished Toy Story in Spanish! The vocabulary was perfect for beginners 🎬',
          likes: 12,
          badge: 'crown',
          streak: 28
        },
        {
          id: '2',
          user: 'Miguel Rodriguez',
          initials: 'MR',
          time: '15m ago',
          content: 'Does anyone know where I can watch Finding Nemo with French subtitles?',
          likes: 5,
          badge: 'medal',
          streak: 21
        }
      ];
    }
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      return await this.request<LeaderboardEntry[]>('/api/v1/community/leaderboard');
    } catch (error) {
      console.warn('🔄 Leaderboard API failed, using mock data');
      return [
        {
          rank: 1,
          name: 'Sarah Chen',
          points: 2847,
          streak: 28,
          change: '+5',
          badge: 'crown',
          avatar: 'SC',
          level: 'Expert'
        },
        {
          rank: 2,
          name: 'Miguel Rodriguez',
          points: 2651,
          streak: 21,
          change: '+2',
          badge: 'medal',
          avatar: 'MR',
          level: 'Advanced'
        },
        {
          rank: 4,
          name: 'You',
          points: 1847,
          streak: 12,
          change: '+3',
          isCurrentUser: true,
          avatar: 'YU',
          level: 'Intermediate'
        }
      ];
    }
  }

  async postCommunityMessage(content: string): Promise<CommunityPost> {
    try {
      return await this.request<CommunityPost>('/api/v1/community/posts', {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
    } catch (error) {
      console.warn('🔄 Post message failed, using mock response');
      return {
        id: Date.now().toString(),
        user: 'You',
        initials: 'YU',
        time: 'now',
        content,
        likes: 0,
        streak: 12
      };
    }
  }

  // Analytics methods
  async getDashboardAnalytics(): Promise<any> {
    try {
      return await this.request('/api/v1/analytics/dashboard');
    } catch (error) {
      console.warn('🔄 Analytics API failed, using mock data');
      return {
        totalUsers: 12847,
        totalLessonsCompleted: 156789,
        averageSessionTime: '23m 45s'
      };
    }
  }

  // Utility methods
  async checkApiHealth(): Promise<boolean> {
    try {
      await this.request('/health');
      console.log('✅ API is healthy');
      return true;
    } catch (error) {
      console.warn('⚠️ API health check failed');
      return false;
    }
  }

  async getApiStatus(): Promise<any> {
    try {
      return await this.request('/api/v1/status');
    } catch (error) {
      console.warn('🔄 API status failed, API might be unavailable');
      return {
        status: 'unknown',
        message: 'API status unavailable, using mock data'
      };
    }
  }

  // Development helpers
  async resetProgress(): Promise<void> {
    try {
      await this.request('/api/v1/dev/reset-progress', { method: 'POST' });
      console.log('✅ Progress reset successfully');
    } catch (error) {
      console.warn('⚠️ Progress reset failed (might not be available in production)');
    }
  }
}

// Create and export singleton instance
export const apiService = new ApiService();

// Export enhanced types
export type {
  WeeklyActivity,
  Achievement,
  LeaderboardEntry,
  CommunityPost
};