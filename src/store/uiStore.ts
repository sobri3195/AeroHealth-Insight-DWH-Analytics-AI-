import { create } from 'zustand';

interface UIStore {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  selectedFacility: string | null;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSelectedFacility: (facilityId: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  theme: 'light',
  sidebarOpen: true,
  selectedFacility: null,

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),

  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),

  setSelectedFacility: (facilityId: string | null) =>
    set({ selectedFacility: facilityId }),
}));
