import { create } from 'zustand';

interface CompareStoreState {
  compareItems: number[];
  addCompareItem: (item: number) => void;
  deleteCompareItem: (item: number) => void;
  updateCompareItem: (index: number, item: number) => void;
  clearCompareItems: () => void;
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

  deleteCompareItem: (item) =>
    set((state) => ({
      compareItems: state.compareItems.filter((compareItem) => compareItem !== item),
    })),
  updateCompareItem: (index, item) =>
    set((state) => {
      const newCompareItems = [...state.compareItems];
      newCompareItems[index] = item;
      return { compareItems: newCompareItems };
    }),
  clearCompareItems: () =>
    set(() => ({
      compareItems: [],
    })),
}));

export default useCompareStore;
