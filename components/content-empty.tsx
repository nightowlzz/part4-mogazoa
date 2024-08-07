import Image from 'next/image';
import EmptyImage from '@/public/assets/images/empty-logo.svg';

export default function ContentEmpty({ text = '상품이 없습니다.' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-3 py-[80px]">
      <Image src={EmptyImage} alt="상품이 없을 때 이미지" />
      <p className="text-gray-600 text-base">{text}</p>
    </div>
  );
}
