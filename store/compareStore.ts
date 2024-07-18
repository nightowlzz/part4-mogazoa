import { create } from 'zustand';

interface CompareStoreState {
  compareItems: number[];
  isLoggedIn: boolean;
  addCompareItem: (item: number) => void;
  setLoginStatus: (status: boolean) => void;
}

const useCompareStore = create<CompareStoreState>((set) => ({
  compareItems: [],
  isLoggedIn: false,
  addCompareItem: (item) =>
    set((state) => {
      if (!state.compareItems.includes(item)) {
        return { compareItems: [...state.compareItems, item] };
      }
      return state;
    }),

  setLoginStatus: (status) => set({ isLoggedIn: status }),
}));

export default useCompareStore;
