import { create } from 'zustand';

interface ButtonStore {
  isHeaderMenuButtonClicked: boolean;
  toggleButton: () => void;
  closeButton: () => void;
}

export interface ProductOption {
  id: number;
  name: string;
}

interface PreviousSearchStore {
  previousSearches: ProductOption[];
  addPreviousSearch: (search: string) => void;
  nextId: number;
}

interface PreviousCompareStore {
  previousComparedValues: ProductOption[];
  addPreviousComparedValue: (search: ProductOption) => void;
}

export const useButtonStore = create<ButtonStore>((set) => ({
  isHeaderMenuButtonClicked: false,
  toggleButton: () =>
    set((state) => ({ isHeaderMenuButtonClicked: !state.isHeaderMenuButtonClicked })),
  closeButton: () => set((state) => ({ isHeaderMenuButtonClicked: false })),
}));

export const usePreviousSearchStore = create<PreviousSearchStore>((set) => ({
  previousSearches: [],
  nextId: -1,
  addPreviousSearch: (search: string) =>
    set((state) => {
      // 중복된 검색어 제거
      const filteredSearches = state.previousSearches.filter((item) => item.name !== search);
      // 새로운 검색어를 목록의 맨 앞에 추가
      const newId = state.nextId - 1; // 고유한 id 생성
      const updatedSearches = [{ name: search, id: newId }, ...filteredSearches];
      const nextId =
        updatedSearches.length > 5
          ? Math.min(...updatedSearches.map((item) => item.id)) - 1
          : newId;
      // 5개 까지만 저장
      if (updatedSearches.length > 5) {
        updatedSearches.pop();
      }
      return { previousSearches: updatedSearches, nextId };
    }),
}));

export const usePreviousCompareStore = create<PreviousCompareStore>((set) => ({
  previousComparedValues: [],
  addPreviousComparedValue: (search: ProductOption) =>
    set((state) => {
      // 중복된 검색어 제거
      const filteredComparedValues = state.previousComparedValues.filter(
        (item) => item.id !== search.id,
      );
      // 새로운 검색어를 목록의 맨 앞에 추가
      const updatedComparedValues = [search, ...filteredComparedValues];
      // 5개 까지만 저장
      if (updatedComparedValues.length > 5) {
        updatedComparedValues.pop();
      }
      return { previousComparedValues: updatedComparedValues };
    }),
}));

export default useButtonStore;
