'use client';

import ContentEmpty from '@/components/content-empty';
import { useGetProductDetail } from '@/hooks/product';
import useCompareStore from '@/store/compare-store';
import CompareTable, { roundToOneDecimal } from './compare-table';
// 항목을 비교하는 함수
const CompareTableData = () => {
  const { compareItems } = useCompareStore((state) => ({
    compareItems: state.compareItems,
  }));

  const product1Detail = useGetProductDetail(compareItems[0]?.id || 0, {
    enabled: !!compareItems[0]?.id,
  });
  const product2Detail = useGetProductDetail(compareItems[1]?.id || 0, {
    enabled: !!compareItems[1]?.id,
  });

  const product1 = product1Detail.data;
  const product2 = product2Detail.data;

  // 비교할 품목이 모두 들어오지 않으면 Loading을 표시합니다.
  if (!product1 || !product2) {
    return (
      <div className="flex justify-center">
        <ContentEmpty text="비교할 항목을 모두 추가해 보세요" />
      </div>
    );
  }

  // 두 값을 비교해 결과 메세지 출력.
  const compareValues = (value1: number | undefined, value2: number | undefined) => {
    if (value1 === undefined || value2 === undefined) {
      return '-';
    }
    if (value1 === value2) {
      return <div>무승부</div>;
    }
    return value1 > value2 ? (
      <div className="text-pink">상품 1 승리</div>
    ) : (
      <div className="text-green">상품 2 승리</div>
    );
  };

  const results = {
    rating: compareValues(roundToOneDecimal(product1.rating), roundToOneDecimal(product2.rating)),
    reviewCount: compareValues(product1.reviewCount, product2.reviewCount),
    favoriteCount: compareValues(product1.favoriteCount, product2.favoriteCount),
  };

  // 3가지 항목 중 몇 가지 항목에서 높은 지 계산
  const totalWins = {
    product1: 0,
    product2: 0,
  };

  if (roundToOneDecimal(product1.rating) > roundToOneDecimal(product2.rating)) totalWins.product1++;
  else if (roundToOneDecimal(product1.rating) < roundToOneDecimal(product2.rating))
    totalWins.product2++;

  if (product1.reviewCount > product2.reviewCount) totalWins.product1++;
  else if (product1.reviewCount < product2.reviewCount) totalWins.product2++;

  if (product1.favoriteCount > product2.favoriteCount) totalWins.product1++;
  else if (product1.favoriteCount < product2.favoriteCount) totalWins.product2++;

  const winnerMessage =
    totalWins.product1 > totalWins.product2 ? (
      <span>
        <span className="text-pink">{product1.name}</span> 상품이 <br className="lg:hidden" />{' '}
        승리하였습니다!
      </span>
    ) : totalWins.product1 < totalWins.product2 ? (
      <span>
        <span className="text-green">{product2.name}</span> 상품이 <br className="lg:hidden" />{' '}
        승리하였습니다!
      </span>
    ) : (
      '무승부'
    );

  const overallMessage =
    totalWins.product1 !== totalWins.product2
      ? `3가지 항목 중 ${Math.max(totalWins.product1, totalWins.product2)}가지 항목에서 우세합니다.`
      : '';

  return (
    <div className="flex flex-col items-center w-full pb-[60px]">
      <div className="text-white mt-[70px] md:mt-[140px] mb-5 text-xl lg:text-2xl">
        {winnerMessage}
      </div>
      <div className="text-white mb-4 text-xs lg:text-base">{overallMessage}</div>
      <CompareTable product1={product1} product2={product2} results={results} />
    </div>
  );
};

export default CompareTableData;
