import { create } from 'zustand';

export const userAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  isCheckingAuth: true,

  setAuth: (user) =>
    set({ isAuthenticated: true, user, isCheckingAuth: false }),

  clearAuth: () =>
    set({ isAuthenticated: false, user: null, isCheckingAuth: false }),

  setCheckingAuth: (value) => set({ isCheckingAuth: value }),
}));
