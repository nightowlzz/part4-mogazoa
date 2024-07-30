import { create } from 'zustand';

interface ButtonStore {
  isHeaderMenuButtonClicked: boolean;
  toggleButton: () => void;
}

const useButtonStore = create<ButtonStore>((set) => ({
  isHeaderMenuButtonClicked: false,
  toggleButton: () =>
    set((state) => ({ isHeaderMenuButtonClicked: !state.isHeaderMenuButtonClicked })),
}));

export default useButtonStore;
