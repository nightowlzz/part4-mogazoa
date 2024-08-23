import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상품id, 상품명
export interface CompareItem {
  id: number;
  name: string;
}

interface CompareStoreState {
  compareItems: (CompareItem | null)[];
  addCompareItem: (item: CompareItem) => void;
  deleteCompareItem: (index: number) => void;
  updateCompareItem: (index: number, item: CompareItem) => void;
  clearCompareItems: () => void;
}

const useCompareStore = create(
  persist<CompareStoreState>(
    (set) => ({
      compareItems: [null, null],
      addCompareItem: (item) =>
        set((state) => {
          const newCompareItems = [...state.compareItems];
          const nullIndex = newCompareItems.indexOf(null);
          if (nullIndex !== -1) {
            newCompareItems[nullIndex] = item;
          }
          return { compareItems: newCompareItems };
        }),

      deleteCompareItem: (index) =>
        set((state) => {
          const newCompareItems = [...state.compareItems];
          if (index >= 0 && index < newCompareItems.length) {
            newCompareItems[index] = null;
          }
          return { compareItems: newCompareItems };
        }),
      updateCompareItem: (index, item) =>
        set((state) => {
          const newCompareItems = [...state.compareItems];
          newCompareItems[index] = item;
          return { compareItems: newCompareItems };
        }),
      clearCompareItems: () =>
        set(() => ({
          compareItems: [null, null],
        })),
    }),
    {
      name: 'compare-storage',
      getStorage: () => localStorage,
    },
  ),
);

export default useCompareStore;
