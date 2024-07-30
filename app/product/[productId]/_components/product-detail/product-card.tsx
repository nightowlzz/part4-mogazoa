import CompareConfirmModal from '@/app/product/[productId]/_components/product-detail/compare-confirm-modal';
import CompareProductReplacementModal from '@/app/product/[productId]/_components/product-detail/compare-product-replacement-modal';
import EditProduct from '@/app/product/[productId]/_components/product-detail/edit-product-modal';
import { Button } from '@/components/ui/button';
import CategoryTag from '@/components/ui/tags/CategoryTag';
import useCompareStore from '@/store/compareStore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import CopyLinkButton from './copy-link-button';
import FavoriteButton from './favorite-button';
import KaKaoShareButton from './kakao-share-button';
import CreateReview from '../modal/create-review';

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  writerId: number;
  currentUserId: number | null;
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
  const [isReplacementModalOpen, setIsReplacementModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmModalTitle, setConfirmModalTitle] = useState<React.ReactNode>('');
  const [confirmButtonText, setConfirmButtonText] = useState('');
  const { productId } = useParams();

  // 토큰 값 가져오기
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { compareItems, addCompareItem } = useCompareStore();

  const handleCompareButtonClick = () => {
    if (!accessToken) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    // 현재 상품이 비교 목록에 이미 존재하는지 확인
    const isItemAlreadyInCompare = compareItems.some((item) => item?.id === Number(productId));

    if (compareItems.length === 0) {
      addCompareItem({ id: Number(productId), name });
      setConfirmModalTitle('비교상품으로 추가되었습니다');
      setConfirmButtonText('확인');
      setIsConfirmModalOpen(true);
    } else if (compareItems.length === 1) {
      if (isItemAlreadyInCompare) {
        setConfirmModalTitle('이미 비교할 상품으로 추가되었습니다.');
        setConfirmButtonText('확인');
        setIsConfirmModalOpen(true);
      } else {
        addCompareItem({ id: Number(productId), name });
        setConfirmModalTitle(
          <>
            상품을 비교할 수 있습니다. <br />
            바로 확인해보시겠어요?
          </>,
        );

        setConfirmButtonText('바로가기');
        setIsConfirmModalOpen(true);
      }
    } else if (compareItems.length === 2) {
      if (isItemAlreadyInCompare) {
        setConfirmModalTitle(
          <>
            이미 비교할 상품으로 추가되었습니다. <br />
            확인해보시겠어요?
          </>,
        );
        setConfirmButtonText('바로가기');
        setIsConfirmModalOpen(true);
      } else {
        setIsReplacementModalOpen(true);
      }
    }
  };

  const handleReplacementModalClose = (isOpen: boolean, isReplacement: boolean = true) => {
    setIsReplacementModalOpen(isOpen);
    if (!isOpen && isReplacement) {
      setConfirmModalTitle(
        <>
          비교할 상품이 교체되었습니다. <br />
          바로 확인해보시겠어요?
        </>,
      );
      setConfirmButtonText('바로가기');
      setIsConfirmModalOpen(true);
    }
  };

  const handleConfirmModalClose = (open: boolean) => {
    setIsConfirmModalOpen(open);
  };

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
        <div className="flex items-center justify-between mb-[11px] md:mb-[20px]">
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
          <CreateReview
            productId={Number(productId)}
            categoryName={categoryName}
            categoryId={categoryId}
            name={name}
          >
            <Button>리뷰 작성하기</Button>
          </CreateReview>

          <Button variant="outlineBlue" data-text="비교하기" onClick={handleCompareButtonClick}>
            비교하기
          </Button>

          <CompareConfirmModal
            title={confirmModalTitle}
            buttonText={confirmButtonText}
            open={isConfirmModalOpen}
            onOpenChange={handleConfirmModalClose}
          />

          <CompareProductReplacementModal
            productId={Number(productId)}
            productName={name}
            open={isReplacementModalOpen}
            onOpenChange={handleReplacementModalClose}
          />

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
