'use client';

import { Button } from '@/components/ui/button';
import ComparePageInput from './_components/compare-page-input';
import CompareTableData from './_components/compare-table-data';
import useCompareStore from '@/store/compareStore';
import styled from '@/app/(public)/_styles/handling.module.scss';
import { cn } from '@/lib/utils';

function ComparePage() {
  const clearCompareItems = useCompareStore((state) => state.clearCompareItems);

  return (
    <>
      <div
        className={cn(styled['content-full-height'], 'flex flex-col items-center justify-center')}
      >
        <div className="flex flex-col w-full md:flex-row items-end justify-center md:space-x-5 space-y-7 pt-[60px] md:px-[30px]">
          <div role="product wrapper" className="w-full lg:w-fit">
            <div className="text-white mb-[10px]">상품 1</div>
            <ComparePageInput index={0} />
          </div>
          <div role="product wrapper" className="w-full lg:w-fit">
            <div className="text-white mb-[10px]">상품 2</div>
            <ComparePageInput index={1} />
          </div>
          <div className="w-full md:w-[160px] lg:w-[200px] shrink-0">
            <Button className="lg:h-[70px] md:h-[55px] w-full" onClick={clearCompareItems}>
              초기화
            </Button>
          </div>
        </div>
        <div className=" flex-1 w-full flex flex-col items-center justify-center">
          <CompareTableData />
        </div>
      </div>
    </>
  );
}

export default ComparePage;
