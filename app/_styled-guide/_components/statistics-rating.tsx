import { FaStar } from 'react-icons/fa';

interface CategoryMetric {
  rating: number;
}

interface StatisticRatingProps {
  rating: number;
  categoryMetric: CategoryMetric;
}

export function StatisticRating({ rating, categoryMetric }: StatisticRatingProps) {
  const categoryRating = categoryMetric.rating.toFixed(1);
  const fixedRating = rating.toFixed(1);
  return (
    <div className="w-[355px] p-5 bg-black-500 rounded-xl border border-black-400 md:w-[218px] md:py-[30px] md:px-[40px] lg:w-[300px]  lg:px-[73px] lg:py-[30px]">
      <div className="flex items-center md:flex-col">
        <h2 className="text-sm text-white mr-[10px] md:mr-0 md:text-base md:mb-[15px] lg:text-lg lg:mb-[20px]">
          별점 평균
        </h2>
        <div className="flex items-center justify-center md:mb-[15px] lg:mb-[20px]">
          <FaStar
            className="mr-[5px] md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px]"
            size="19px"
            color="#FFC83C"
          />
          <p className="text-gray-500 text-base md:text-xl lg:text-2xl">{fixedRating}</p>
        </div>
      </div>
      <p className="text-gray-600 text-xs md:text-center lg:text-sm">
        같은 카테고리의 제품들보다 <span className="text-white">{categoryRating}점</span> 높을까요??
      </p>
    </div>
  );
}
