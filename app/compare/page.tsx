'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Gnb from '../_styled-guide/_components/gnb';
import ComparePageInput from './_components/compare-page-input';
import CompareTableData from './_components/compare-table-data';
import useCompareStore from '@/store/compareStore';
import { IoMdAdd } from 'react-icons/io';
import { getSession } from 'next-auth/react';
import FloatAddButton from '../_styled-guide/_components/float-add-button';

function ComparePage() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setIsLogin(!!session?.user?.accessToken);
    };

    fetchSession();
  }, []);
  const clearCompareItems = useCompareStore((state) => state.clearCompareItems);

  const clearButtonOnClick = () => {
    clearCompareItems();
  };

  const AddProductButton = (
    <Button variant="circleBlue" size={'auto'} className="w-[60px] h-[60px] fixed bottom-8 right-8">
      <IoMdAdd color="white" size={30} />
    </Button>
  );
  return (
    <>
      <Gnb isLogin={isLogin} />
      <FloatAddButton />
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
