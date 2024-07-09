import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface FollowerProfileProps {
  image: string;
  nickname: string;
}

export function Follower({ image, nickname }: FollowerProfileProps) {
  return (
    <div className="flex gap-5 items-center">
      <Avatar className="w-12 h-12 lg:w-[52px] lg:h-[52px]">
        <AvatarImage src={image} alt={`Profile of ${nickname}`} />
        <AvatarFallback>
          <span>{nickname[0]}</span>
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-white text-base lg:text-lg">{nickname}</p>
      </div>
    </div>
  );
}
