import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompareItem {
  id: number;
  name: string;
}

interface CompareStoreState {
  compareItems: CompareItem[];
  addCompareItem: (item: CompareItem) => void;
  replaceCompareItem: (index: number, newItem: CompareItem) => void;
}

const useCompareStore = create(
  persist<CompareStoreState>(
    (set) => ({
      compareItems: [],
      addCompareItem: (item) =>
        set((state) => {
          if (!state.compareItems.find(({ id }) => id === item.id)) {
            return { compareItems: [...state.compareItems, item] };
          }
          return state;
        }),
      replaceCompareItem: (index, newItem) =>
        set((state) => {
          const newCompareItems = [...state.compareItems];
          newCompareItems[index] = newItem;
          return { compareItems: newCompareItems };
        }),
    }),
    {
      name: 'compare-storage',
      getStorage: () => localStorage,
    },
  ),
);

export default useCompareStore;
