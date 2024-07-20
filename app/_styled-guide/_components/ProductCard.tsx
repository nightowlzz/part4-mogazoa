import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import KaKaoShareButton from './KaKaoShareButton';
import CopyLinkButton from './CopyLinkButton';
import CategoryTag from '@/components/ui/tags/CategoryTag';
import { useParams, useRouter } from 'next/navigation';
import FavoriteButton from './FavoriteButton';
import EditProduct from '@/app/product/[productId]/EditProduct';
import useCompareStore from '@/store/compareStore';
import CompareConfirmModal from '@/app/product/[productId]/CompareConfirmModal';
import CompareProductReplacementModal from '@/app/product/[productId]/CompareProductReplacementModal';

export interface ProductCardProps {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId } = useParams();

  const { compareItems, addCompareItem } = useCompareStore();

  const handleCompareButtonClick = () => {
    /*if (!isLoggedIn) {
      toast.error('로그인이 필요합니다.');
      return;
    }*/

    setIsModalOpen(true);
    addCompareItem(name);
  };

  const getModalContent = () => {
    if (compareItems.length === 1) {
      return {
        title: '비교상품으로 추가되었습니다',
        buttonText: '확인',
      };
    } else if (compareItems.length === 2) {
      return {
        title: (
          <>
            비교상품이 교체되었습니다. <br />
            바로 확인해보시겠어요?
          </>
        ),
        buttonText: '바로가기',
      };
    }
    return null;
  };

  const modalContent = getModalContent();

  return (
    <div className="bg-[#1C1C22] w-[335px] md:w-[684px] lg:w-[940px] h-full flex flex-col md:flex-row">
      <div className="relative w-[335px] md:w-[280px] lg:w-[355px] h-[236px] md:h-[197px] lg:h-[250px] mb-5 md:mb-[88px] lg:mb-[29px] md:mr-5 lg:mr-10">
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

        <div className="w-auto h-[29px] flex justify-between">
          <div className="hidden md:flex items-center gap-[15px]">
            <h2 className="text-[#F1F1F5] md:text-xl lg:text-2xl font-semibold">{name}</h2>
            <FavoriteButton productId={Number(productId)} initialIsFavorited={false} />
          </div>

          <h2 className="md:hidden text-[#F1F1F5] md:text-xl lg:text-2xl font-semibold">{name}</h2>
          <span className="md:hidden">
            <FavoriteButton productId={Number(productId)} initialIsFavorited={false} />
          </span>

          {/* 태블릿 이상 화면에서는 하트 버튼 옆에 카카오톡과 공유 버튼을 배치 */}
          <div className="hidden md:flex gap-[10px]">
            <KaKaoShareButton />
            <CopyLinkButton />
          </div>
        </div>

        <p
          className="md:w-[383px] lg:w-[545px] text-[#F1F1F5] md:text-sm lg:text-base font-normal mt-5 md:mt-[49px] mb-[67px] md:mb-[60px] whitespace-normal"
          style={{ wordBreak: 'keep-all' }}
        >
          {description}
        </p>
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-[10px] lg:gap-5">
          <Button>리뷰 작성하기</Button>
          {/*{!isLoggedIn && (
            <Button variant="outlineBlue" data-text="비교하기" onClick={handleCompareButtonClick}>
              variant:outlineBlue 버튼
            </Button>
          )}*/}
          {compareItems.length < 2 && (
            <Button variant="outlineBlue" data-text="비교하기" onClick={handleCompareButtonClick}>
              비교하기
            </Button>
          )}

          {modalContent && (
            <CompareConfirmModal
              title={modalContent.title}
              buttonText={modalContent.buttonText}
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
            />
          )}
          {compareItems.length === 2 && <CompareProductReplacementModal productName={name} />}

          {isUserProduct && (
            <EditProduct
              productId={productId}
              name={name}
              description={description}
              image={image}
              categoryId={categoryId}
              categoryName={categoryName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
