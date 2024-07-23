import { FaStar } from 'react-icons/fa';

interface ActivityRatingProps {
  rating: number;
}

export function ActivityRating({ rating }: ActivityRatingProps) {
  return (
    <div className="flex flex-col items-center justify-center w-[105px] py-5 px-[21px] bg-black-500 rounded-xl border border-black-400 md:w-[163px] lg:w-[300px] lg:px-[100px] lg:py-[30px] ">
      <h2 className="text-sm text-center text-gray-500 mb-[15px] lg:text-base lg:mb-[20px]">
        남긴 별점 평균
      </h2>
      <div className="flex items-center justify-center ">
        <FaStar className="mr-[5px] lg:w-6 lg:h-6" size="19px" color="#FFC83C" />
        <p className="text-white text-base md:text-xl lg:text-2xl">{rating}</p>
      </div>
    </div>
  );
}
