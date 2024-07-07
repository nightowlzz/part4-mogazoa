import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaStar } from 'react-icons/fa';

export function ReviewProfile() {
  const likeCount = 5; //나중에 지우기,,,
  return (
    <div className="flex gap-2.5 items-center">
      <Avatar className="w-9 h-9 lg:w-[42px] lg:h-[42px]">
        <AvatarImage />
        <AvatarFallback>OP</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="text-white text-sm lg:text-base">안녕하쇼</div>
        <div className="flex gap-[2px]">
          {Array.from({ length: likeCount }, (_, index) => (
            <FaStar key={index} color="yellow" className="w-3 h-3 lg:w-[18px] lg:h-[18px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
