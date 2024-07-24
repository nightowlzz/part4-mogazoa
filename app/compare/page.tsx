'use client';

import { Button } from '@/components/ui/button';
import Gnb from '@/app/_styled-guide/_components/gnb';
import CompareTableData from './components/compare-table-data';
import useCompareStore from '@/store/compareStore';
import ComparePageInput from './components/compare-page-input';

function ComparePage() {
  const clearCompareItems = useCompareStore((state) => state.clearCompareItems);

  const clearButtonOnClick = () => {
    clearCompareItems();
  };

  return (
    <>
      <Gnb />
      <div className="w-full h-lvh bg-[#1c1c22] flex flex-col items-center">
        <div className="flex flex-col w-full md:flex-row items-end justify-center md:space-x-5 space-y-7 mt-[30px] md:mt-[40px] lg:mt-[60px] px-5 md:px-[30px]">
          <div role="product wrapper" className="w-full lg:w-fit">
            <div className="text-white mb-[10px]">상품 1</div>
            <ComparePageInput index={0} />
          </div>
          <div role="product wrapper" className="w-full lg:w-fit">
            <div className="text-white mb-[10px]">상품 2</div>
            <ComparePageInput index={1} />
          </div>
          <div className="w-full md:w-[160px] lg:w-[200px] shrink-0">
            <Button className="lg:h-[70px] md:h-[55px] w-full" onClick={clearButtonOnClick}>
              초기화
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <CompareTableData />
        </div>
      </div>
    </>
  );
}

export default ComparePage;
