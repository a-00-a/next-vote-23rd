// 클라이언트 컴포넌트에서만 사용 가능
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSummary } from '@/types/auth';

interface AuthStore {
  user: UserSummary | null;
  setUser: (user: UserSummary) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'auth-storage' }
  )
);
