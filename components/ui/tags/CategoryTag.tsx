interface TagProps {
  categoryName: string;
  categoryId: number;
  className?: string;
}

// 카테고리 이름을 고유한 색으로 보여주는 태그 컴포넌트입니다.
// 카테고리 id는 색상을 고유하게 만들기 위해서 사용합니다.
function CategoryTag({ categoryName, categoryId = 1, className }: TagProps) {
  // categoryId 값이 유효한 범위를 넘을 때 방어코드
  const safeCategoryId = categoryId >= 0 && categoryId < 16 ? categoryId : categoryId % 16;

  // Tailwind CSS 클래스 이름 생성
  const textColorClass = `text-tagColor-${safeCategoryId}`;
  const bgColorClass = `bg-tagBgColor-${safeCategoryId}`;

  return (
    <div
      className={`flex items-center justify-self-center md:px-[0.625rem] px-2 py-1 md:h-[1.813rem] h-[1.375rem] w-fit rounded-lg text-xs md:text-lg ${textColorClass} ${bgColorClass} ${className}`}
    >
      {categoryName}
    </div>
  );
}

export default CategoryTag;
