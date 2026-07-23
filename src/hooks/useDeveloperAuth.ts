import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEV_PASSWORD = 'patrimoine-dev-2024';

interface DeveloperAuthState {
  isDeveloper: boolean;
  showRepo: boolean;
  authenticate: (password: string) => boolean;
  logout: () => void;
}

export const useDeveloperAuth = create<DeveloperAuthState>()(
  persist(
    (set) => ({
      isDeveloper: false,
      showRepo: false,
      authenticate: (password: string) => {
        if (password === DEV_PASSWORD) {
          set({ isDeveloper: true, showRepo: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isDeveloper: false, showRepo: false }),
    }),
    { name: 'patrimoine-dev-auth' }
  )
);
