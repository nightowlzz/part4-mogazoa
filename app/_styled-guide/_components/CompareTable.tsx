'use client';

import { ProductDetailResponse } from '@/types/data';

interface CompareTableProps {
  product1: ProductDetailResponse;
  product2: ProductDetailResponse;
  results: {
    rating: JSX.Element | string;
    reviewCount: JSX.Element | string;
    favoriteCount: JSX.Element | string;
  };
}

// 반올림 부분. 별점은 소수점 1자리에서 반올림해 비교합니다.
export const roundToOneDecimal = (value: number): number => Math.round(value * 10) / 10;

const CompareTable = ({ product1, product2, results }: CompareTableProps) => {
  const twStyle = {
    header: 'py-5 md:py-[0.938rem] w-1/4 text-xs md:text-sm lg:text-base',
    compare: 'py-5 md:py-[1.875rem] text-xs md:text-sm lg:text-base',
    data: 'py-5 md:py-[1.875rem] text-white text-xs md:text-sm lg:text-base',
  };

  return (
    <div className="w-full lg:w-[940px] px-5 md:px-[30px] lg:px-0 max-w-full overflow-x-auto justify-center">
      <table className="w-full lg:max-w-[58.75rem] rounded-xl text-center bg-black-450 text-gray-500">
        <thead className="border-b border-gray-700">
          <tr>
            <th className={twStyle.header}>기준</th>
            <th className={twStyle.header}>{product1.name}</th>
            <th className={twStyle.header}>{product2.name}</th>
            <th className={twStyle.header}>결과</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={twStyle.compare}>별점</td>
            <td className={twStyle.data}>{roundToOneDecimal(product1.rating)}</td>
            <td className={twStyle.data}>{roundToOneDecimal(product2.rating)}</td>
            <td className={twStyle.data}>{results.rating}</td>
          </tr>
          <tr>
            <td className={twStyle.compare}>리뷰 개수</td>
            <td className={twStyle.data}>{product1.reviewCount}</td>
            <td className={twStyle.data}>{product2.reviewCount}</td>
            <td className={twStyle.data}>{results.reviewCount}</td>
          </tr>
          <tr>
            <td className={twStyle.compare}>찜 개수</td>
            <td className={twStyle.data}>{product1.favoriteCount}</td>
            <td className={twStyle.data}>{product2.favoriteCount}</td>
            <td className={twStyle.data}>{results.favoriteCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
