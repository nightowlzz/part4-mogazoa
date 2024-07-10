'use client';

import { TbTriangleSquareCircle } from 'react-icons/tb';

interface CategoryFilterProps {
  category?: string;
}

// 모바일 화면에서 나타나는 컴포넌트로, 현재 선택 중인 카테고리가 표시됩니다.
// 기본값일 경우 '카테고리'를 표시합니다. 폰트 색상이 조금 다릅니다.
const CategoryFilter = (props: CategoryFilterProps) => {
  const { category } = props;

  return (
    <div className="flex items-center align-middle px-3 py-[6px] w-fit bg-black-450 border-gray-650 border rounded-full">
      <TbTriangleSquareCircle className="text-gray-500 mr-[5px] h-[18px] w-[18px]" />
      {category ? (
        <span className="text-gray-500 text-sm">{category}</span>
      ) : (
        <span className="text-gray-600 text-sm">카테고리</span>
      )}
    </div>
  );
};

export default CategoryFilter;
