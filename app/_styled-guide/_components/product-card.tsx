import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IoMdHeartEmpty } from 'react-icons/io';
import { MdShare } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';
import CategoryTag from '@/components/ui/tags/CategoryTag';

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  writerId: number;
  currentUserId: number;
  categoryName: string;
  categoryId: number;
}

export default function ProductCard({
  name,
  description,
  image,
  writerId,
  currentUserId,
  categoryName,
  categoryId,
}: ProductCardProps) {
  {
    /*writerId와 currentUserId를 비교하여 내가 등록한 상품인지를 확인(임시) */
  }
  const isUserProduct = writerId === currentUserId;

  return (
    <div className="bg-[#1C1C22] w-[335px] md:w-[684px] lg:w-[940px] h-full flex flex-col md:flex-row">
      <div className="relative w-335px md:w-[280px] lg:w-[355px] h-[236px] md:h-[197px] lg:h-[250px] mb-5 md:mb-[88px] lg:mb-[29px] md:mr-5 lg:mr-10">
        <Image src={image} alt="product" fill priority />
      </div>
      <div>
        <div className="flex items-center justify-between mb-[11px] md:mb-[10px]">
          <span className="w-[58px] h-[22px] font-normal whitespace-nowrap">
            <CategoryTag
              categoryName={categoryName}
              categoryId={categoryId}
              className="text-xs md:text-xs"
            />
          </span>
          {/* 모바일 화면에서만 표시되는 카카오톡과 공유 버튼 */}
          <div className="flex md:hidden gap-[10px]">
            <Button asChild variant="iconBg" size="auto">
              <RiKakaoTalkFill color={'#9FA6B2'} size={18} />
            </Button>
            <Button asChild variant="iconBg" size="auto">
              <MdShare color={'#9FA6B2'} size={18} />
            </Button>
          </div>
        </div>

        <div className="w-auto h-[29px] flex justify-between mb-[10px]">
          <div className="flex items-center gap-[15px]">
            <h2 className="text-[#F1F1F5] md:text-xl lg:text-2xl font-semibold">{name}</h2>
            <Button asChild variant="icon" size="auto" className="md:p-0.5 lg:p-0">
              <IoMdHeartEmpty color={'#9FA6B2'} size={24} className="hover:fill-[#ddd]" />
            </Button>
          </div>

          {/* 태블릿 이상 화면에서는 하트 버튼 옆에 카카오톡과 공유 버튼을 배치 */}
          <div className="hidden md:flex gap-[10px]">
            <Button asChild variant="iconBg" size="auto">
              <RiKakaoTalkFill color={'#9FA6B2'} size={18} />
            </Button>
            <Button asChild variant="iconBg" size="auto">
              <MdShare color={'#9FA6B2'} size={18} />
            </Button>
          </div>
        </div>

        <div className="w-[82px] h-[19px] flex gap-[5px] text-[#6E6E82] md:text-sm lg:text-base font-light mb-5">
          <span className="whitespace-nowrap">조회</span>
          <span>43,521</span>
        </div>
        <p
          className="md:w-[383px] lg:w-[545px] text-[#F1F1F5] md:text-sm lg:text-base font-normal mb-[60px] whitespace-normal"
          style={{ wordBreak: 'keep-all' }}
        >
          {description}
        </p>
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-[10px] lg:gap-5">
          <Button>리뷰 작성하기</Button>
          <Button variant="outlineBlue" data-text="비교하기">
            variant:outlineBlue 버튼
          </Button>
          {isUserProduct && <Button variant="outline">편집하기</Button>}
        </div>
      </div>
    </div>
  );
}
