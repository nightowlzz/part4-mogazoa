import React, { useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import KaKaoShareButton from './KaKaoShareButton';
import CopyLinkButton from './CopyLinkButton';
import CategoryTag from '@/components/ui/tags/CategoryTag';
import { useParams } from 'next/navigation';
import FavoriteButton from './FavoriteButton';
import Product from '@/components/modal/product';

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  writerId: number;
  currentUserId: number;
  categoryName: string;
  categoryId: number;
}

function ProductCard({
  name,
  description,
  image,
  writerId,
  currentUserId,
  categoryName,
  categoryId,
}: ProductCardProps) {
  const isUserProduct = useMemo(() => writerId === currentUserId, [writerId, currentUserId]); //내가 등록한 상품인지 비교(나중에 수정)
  const initialProduct = { name, description, image, categoryName }; // 초기 상품 정보 설정

  const { productId } = useParams();

  return (
    <div className="bg-[#1C1C22] w-[335px] md:w-[684px] lg:w-[940px] h-full flex flex-col md:flex-row">
      <div className="relative w-335px md:w-[280px] lg:w-[355px] h-[236px] md:h-[197px] lg:h-[250px] mb-5 md:mb-[88px] lg:mb-[29px] md:mr-5 lg:mr-10">
        <Image
          src={image}
          alt="상품 이미지"
          fill
          priority
          sizes="(max-width: 768px) 280px, (max-width: 1024px) 355px, 100vw"
        />
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
            <KaKaoShareButton />
            <CopyLinkButton />
          </div>
        </div>

        <div className="w-auto h-[29px] flex justify-between mb-[10px]">
          <div className="flex items-center gap-[15px]">
            <h2 className="text-[#F1F1F5] md:text-xl lg:text-2xl font-semibold">{name}</h2>
            <FavoriteButton productId={Number(productId)} initialIsFavorited={false} />
          </div>

          {/* 태블릿 이상 화면에서는 하트 버튼 옆에 카카오톡과 공유 버튼을 배치 */}
          <div className="hidden md:flex gap-[10px]">
            <KaKaoShareButton />
            <CopyLinkButton />
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
          {isUserProduct && (
            <Product
              name={name}
              description={description}
              image={image}
              categoryName={categoryName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
