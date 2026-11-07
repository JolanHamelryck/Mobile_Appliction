import { create } from 'zustand';
import {
  login as loginService,
  logout as logoutService,
  subscribeToAuthChanges,
} from '../services/authService';
import type { User } from '../types/User';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initializeAuth: () => () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  initializeAuth: () => {
    const subscription = subscribeToAuthChanges((user) => {
      set({ user, isAuthenticated: user !== null, isLoading: false });
    });

    return () => subscription.unsubscribe();
  },
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const user = await loginService(email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    await logoutService();
    set({ user: null, isAuthenticated: false });
  },
}));
