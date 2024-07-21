import { create } from 'zustand';

interface CompareStoreState {
  compareItems: number[];
  addCompareItem: (item: number) => void;
}

const useCompareStore = create<CompareStoreState>((set) => ({
  compareItems: [],

  addCompareItem: (item) =>
    set((state) => {
      if (!state.compareItems.includes(item)) {
        return { compareItems: [...state.compareItems, item] };
      }
      return state;
    }),
}));

export default useCompareStore;
