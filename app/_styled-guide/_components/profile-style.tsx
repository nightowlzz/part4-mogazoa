import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
interface UserProfileProps {
  image: string;
  description: string;
  nickname: string;
  followeesCount: number;
  followersCount: number;
  isFollowing?: boolean;
}

export default function UserProfile({
  image,
  nickname,
  description,
  followeesCount,
  followersCount,
  isFollowing,
}: UserProfileProps) {
  return (
    <div className="w-[335px] h-[466px] md:w-[509px] md:h-[451px] lg:w-[340px] lg:h-[603px] px-5 py-10 flex flex-col items-center border-[#353542] rounded-lg  bg-[#252530] gap-[30px] lg:gap-10">
      <Avatar className="w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] rounded-full overflow-hidden">
        {image ? (
          <AvatarImage src={image} alt={`Profile of ${nickname}`} />
        ) : (
          <AvatarFallback>
            <span>{nickname[0]}</span>
          </AvatarFallback>
        )}
      </Avatar>
      <div className="w-[295px] md:w-[449px] lg:w-[300px] flex flex-col items-center gap-5">
        <h2 className="text-[#F1F1F5] text-xl lg:text-2xl font-semibold ">{nickname}</h2>
        <p className="text-[#6E6E82] text-sm lg:text-base">{description}</p>
      </div>
      <div className="flex gap-[50px]">
        <div className="flex flex-col items-center gap-[10px]">
          <p className="text-[#F1F1F5] text-lg lg:text-xl font-semibold">{followeesCount}</p>
          <p className="text-[#9FA6B2] text-sm lg:text-base font-normal">팔로워</p>
        </div>
        <div className="flex flex-col items-center gap-[10px]">
          <p className="text-[#F1F1F5] text-lg lg:text-xl font-semibold">{followersCount}</p>
          <p className="text-[#9FA6B2] text-sm lg:text-base  font-normal">팔로잉</p>
        </div>
      </div>
      <button></button>
    </div>
  );
}
