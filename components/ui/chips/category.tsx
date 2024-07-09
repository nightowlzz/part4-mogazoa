interface TagProps {
  categoryName: string;
  categoryId: number;
}

// 카테고리 id는 색상을 고유하게 만들기 위해서 사용합니다.
function CategoryTag({ categoryName, categoryId = 2 }: TagProps) {
  // categoryId 값이 유효한 범위를 넘을 때 방어코드
  const safeCategoryId = categoryId >= 0 && categoryId <= 30 ? categoryId : categoryId % 30;

  // Tailwind CSS 클래스 이름 생성
  const textColorClass = `text-tagColor-${safeCategoryId}`;
  const bgColorClass = `bg-tagBgColor-${safeCategoryId}`;

  return (
    <div
      className={`flex items-center justify-self-center sm:px-[10px] px-2 py-1 sm:h-[29px] h-[22px] w-fit rounded-lg sm:rounded-md text-xs sm:text-lg ${textColorClass} ${bgColorClass}`}
    >
      {categoryName}
    </div>
  );
}

export default CategoryTag;
