import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompareItem {
  id: number;
  name: string;
}

interface CompareStoreState {
  compareItems: CompareItem[];
  addCompareItem: (item: CompareItem) => void;
  deleteCompareItem: (item: number) => void;
  updateCompareItem: (index: number, item: CompareItem) => void;
  clearCompareItems: () => void;
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

      deleteCompareItem: (item) =>
        set((state) => ({
          compareItems: state.compareItems.filter((compareItem) => compareItem.id !== item),
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
    }),
    {
      name: 'compare-storage',
      getStorage: () => localStorage,
    },
  ),
);

export default useCompareStore;
