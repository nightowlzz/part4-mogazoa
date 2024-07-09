import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface ProductCardProps {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
}

export function ProductCard({ name, image, rating, reviewCount, favoriteCount }: ProductCardProps) {
  return (
    <div className="flex flex-col bg-black-500 rounded-xl border-black-400 p-[10px] w-40 md:w-[247px] lg:w-[300px]">
      <Image src={image} alt="제품 사진" width={140} height={98} className="mb-[10px]" />
      <h2 className="text-white text-sm mb-[5px] md:text-base md:mb-[10px] md:mx-[6.5px] lg:mx-[10px] lg:text-lg">
        {name}
      </h2>
      <div className="md:flex md:justify-between text-xs md:mx-[6.5px] md:mb-[10px] md:text-sm lg:mb-[15px] lg:mx-[10px] lg:text-base">
        <div className="flex gap-[10px] text-gray-600  mb-[5px]">
          <p>리뷰 {reviewCount}</p>
          <p>찜 {favoriteCount}</p>
        </div>
        <div className="flex gap-[2px] text-gray-500">
          <FaStar size={12} color="#FFC83C" className="md:w-[15px] md:h-[15px]" />
          {rating}
        </div>
      </div>
    </div>
  );
}
