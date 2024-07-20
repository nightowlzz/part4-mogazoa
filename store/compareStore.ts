import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareStoreState {
  compareItems: string[];
  addCompareItem: (item: string) => void;
}

const useCompareStore = create(
  persist<CompareStoreState>(
    (set) => ({
      compareItems: [],

      addCompareItem: (item) =>
        set((state) => {
          if (!state.compareItems.includes(item)) {
            return { compareItems: [...state.compareItems, item] };
          }
          return state;
        }),
    }),
    {
      name: 'compare-storage',
      getStorage: () => sessionStorage,
    },
  ),
);

export default useCompareStore;
