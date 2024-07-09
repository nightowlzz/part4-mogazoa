import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaStar } from 'react-icons/fa';

interface User {
  image: string;
  nickname: string;
}

interface ReviewProfileProps {
  user: User;
  likeCount: number;
}

export function ReviewProfile({ user, likeCount }: ReviewProfileProps) {
  const { image, nickname } = user;
  return (
    <div className="flex gap-2.5 items-center">
      <Avatar className="w-9 h-9 lg:w-[42px] lg:h-[42px]">
        <AvatarImage src={image} alt={`Profile of ${nickname}`} />
        <AvatarFallback>
          <span>{nickname[0]}</span>
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h2 className="text-white text-sm lg:text-base">{nickname}</h2>
        <div className="flex gap-[2px]">
          {Array.from({ length: likeCount }, (_, index) => (
            <FaStar key={index} color="#FFC83C" className="w-3 h-3 lg:w-[18px] lg:h-[18px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
