import React from 'react';
import Image from 'next/image';

export default function LoadingTable() {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-5">
      <div className="relative w-[50px] md:w-[70px] h-[40px] md:h-[50px]">
        <Image src="/assets/images/loading.svg" alt="Loading" fill priority />
      </div>
      <div className="text-gray-500 text-base md:text-lg"> 비교할 항목을 모두 추가해 보세요</div>
    </div>
  );
}
