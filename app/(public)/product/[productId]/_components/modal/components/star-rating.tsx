import { FaStar } from 'react-icons/fa6';

interface StarRatingProps {
  rating: number;
  onStarClick: (index: number) => void;
}

export default function StarRating({ rating, onStarClick }: StarRatingProps) {
  return (
    <div className="flex items-center gap-4 lg:gap-5">
      <h3 className="text-gray-600">별점</h3>
      <div className="flex gap-[2px] lg:gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={`${i < rating ? 'text-yellow' : 'text-gray-400'} w-[22px] md:w-[26px] h-[22px] md:h-[26px] cursor-pointer`}
            onClick={() => onStarClick(i)}
          />
        ))}
      </div>
    </div>
  );
}
