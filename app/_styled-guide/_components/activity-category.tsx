interface ActivityCategoryProps {
  category: string;
}

export function ActivityCategory({ category }: ActivityCategoryProps) {
  return (
    <div className="flex flex-col items-center justify-center w-[105px] py-5 px-[21px] bg-black-500 rounded-xl border border-black-400 md:w-[163px] lg:w-[300px] lg:px-[105px] lg:py-[30px]">
      <h2 className="text-sm text-center text-gray-500 mb-[15px] lg:text-base lg:mb-[20px]">
        관심 카테고리
      </h2>
      <p>{category}</p>
    </div>
  );
}
