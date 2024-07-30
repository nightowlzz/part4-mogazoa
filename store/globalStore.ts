import { create } from 'zustand';

interface ButtonStore {
  isHeaderMenuButtonClicked: boolean;
  toggleButton: () => void;
  closeButton: () => void;
}

const useButtonStore = create<ButtonStore>((set) => ({
  isHeaderMenuButtonClicked: false,
  toggleButton: () =>
    set((state) => ({ isHeaderMenuButtonClicked: !state.isHeaderMenuButtonClicked })),
  closeButton: () => set((state) => ({ isHeaderMenuButtonClicked: false })),
}));

export default useButtonStore;
