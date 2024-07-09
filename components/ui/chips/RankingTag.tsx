interface TagProps {
  rank: number;
}

function RankingTag({ rank = 3 }: TagProps) {
  // Tailwind CSS 클래스 이름 생성, 3등 이상은 gray-500으로 동일
  const textColorClass = rank === 1 ? `text-pink` : rank === 2 ? 'text-green' : 'text-gray-500';
  const bgColorClass = rank === 1 ? `bg-pinkBg` : rank === 2 ? 'bg-greenBg' : 'bg-gray-700';

  return (
    <div
      className={`flex items-center justify-self-center lg:px-2 px-[0.375rem] py-[0.5rem] lg:h-4 h-[1.125rem] w-fit rounded-full text-[0.625rem] lg:text-xs ${textColorClass} ${bgColorClass}`}
    >
      {rank}등
    </div>
  );
}

export default RankingTag;
