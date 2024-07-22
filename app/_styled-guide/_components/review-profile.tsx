import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaStar } from 'react-icons/fa';

interface User {
  id: number;
  image?: string;
  nickname: string;
}

interface ReviewProfileProps {
  user: User;
  rating: number;
}

export function ReviewProfile({ user, rating }: ReviewProfileProps) {
  const { image, nickname } = user;
  return (
    <div className="flex gap-2.5 items-start">
      <Avatar className="w-9 h-9 lg:w-[42px] lg:h-[42px]">
        <AvatarImage src={image} alt={`Profile of ${nickname}`} />
        <AvatarFallback>
          <span>{nickname[0]}</span>
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h2 className="text-white text-[12px] lg:text-[16px] leading-1">{nickname}</h2>
        <div className="flex gap-[2px] mt-[6px]">
          {Array.from({ length: rating }, (_, index) => (
            <FaStar key={index} color="#FFC83C" className="w-3 h-3 lg:w-[18px] lg:h-[18px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
