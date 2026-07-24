import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userAuthStore = create()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isCheckingAuth: true,

      setAuth: (user) =>
        set({ isAuthenticated: true, user, isCheckingAuth: false }),

      clearAuth: () =>
        set({ isAuthenticated: false, user: null, isCheckingAuth: false }),

      setCheckingAuth: (value) => set({ isCheckingAuth: value }),
    })
  )
);
