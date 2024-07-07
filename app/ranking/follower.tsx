import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Follower() {
  return (
    <div className="flex gap-5 items-center">
      <Avatar className="w-12 h-12 lg:w-13 lg:h-13">
        <AvatarImage />
        <AvatarFallback>AP</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="text-white text-base lg:text-lg">반갑고</div>
      </div>
    </div>
  );
}
