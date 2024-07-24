import stringToFraction from '@/utils/stringToFraction';
import { MdOutlineClose } from 'react-icons/md';
import { Button } from '../button';
import { ReactEventHandler } from 'react';

interface TagProps {
  productName: string;
  onDelete?: ReactEventHandler;
  index: number;
}

// 상품명을 받아서 무작위 색상 태그를 만들어줍니다. x버튼을 가지고 있습니다.
// x버튼의 동작을 onDelete로 받습니다.
function CompareTag({ productName = '상품명', onDelete, index = 0 }: TagProps) {
  // Tailwind CSS 클래스 이름 생성
  let textColorClass = `text-tagColor-${index}`;
  let bgColorClass = `bg-tagBgColor-${index}`;

  if (index === 0) {
    textColorClass = 'text-pink';
    bgColorClass = 'bg-pinkBg';
  }
  if (index === 1) {
    textColorClass = 'text-green';
    bgColorClass = 'bg-greenBg';
  }

  return (
    <div
      className={`flex items-center justify-self-center px-2 py-[0.625rem] md:h-[2.188rem] h-[2.063rem] w-fit rounded-md text-sm md:text-base ${textColorClass} ${bgColorClass}`}
    >
      <div className="mr-2.5">{productName}</div>
      <Button variant={'tag'} size={'auto'} onClick={onDelete}>
        <MdOutlineClose className="text-white" />
      </Button>
    </div>
  );
}

export default CompareTag;
