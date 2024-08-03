import { create } from 'zustand';

interface ButtonStore {
  sortOrder: string;
  setSortOrder: (order: string) => void; // 정렬 순서 설정 함수
}
const useSortOrderStore = create<ButtonStore>((set) => ({
  sortOrder: 'recent', // 기본 정렬 순서
  setSortOrder: (order) => set(() => ({ sortOrder: order })), // 정렬 순서 설정 함수
}));

export default useSortOrderStore;
