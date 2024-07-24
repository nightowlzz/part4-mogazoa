import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상품id, 상품명
export interface CompareItem {
  id: number;
  name: string;
}

interface CompareStoreState {
  compareItems: (CompareItem | undefined)[];
  addCompareItem: (item: CompareItem) => void;
  deleteCompareItem: (index: number) => void;
  updateCompareItem: (index: number, item: CompareItem) => void;
  clearCompareItems: () => void;
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

      deleteCompareItem: (index) =>
        set((state) => {
          const newCompareItems = [...state.compareItems];
          if (index >= 0 && index < newCompareItems.length) {
            newCompareItems[index] = undefined; // 요소를 undefined로 설정하여 인덱스를 유지
          }
          return { compareItems: newCompareItems };
        }),

      updateCompareItem: (index, newItem) =>
        set((state) => {
          const newCompareItems = [...state.compareItems];
          newCompareItems[index] = newItem;
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
