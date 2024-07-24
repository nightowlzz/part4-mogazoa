'use client';
import styled from '@/app/(public)/_styles/main.module.scss';
import { PRODUCT_SORT_OPTIONS } from '@/constants/sortOrder';
import { cn } from '@/lib/utils';
import { ReviewSortOrder } from '@/types/data';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import ProductList from '../(public)/_components/product-list';
import RankingList from '../(public)/_components/ranking-list';
import SideBarList from '../(public)/_components/side-bar-list';
import SortSelector from '../_styled-guide/_components/sort-selector';

const ProductTitle = ({ setKeyWord }: { setKeyWord: Dispatch<SetStateAction<string | null>> }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const keyword = searchParams.get('keyword');
  const searchTerm = category ? category : keyword ? keyword : undefined;

  useEffect(() => {
    setKeyWord(keyword);
  }, [keyword, setKeyWord]);

  return <h2 className="text-[22px] text-white font-bold">{searchTerm} 의 모든 상품</h2>;
};

export default function ProductPage() {
  const [sortOrder, setSortOrder] = useState<ReviewSortOrder>('recent');
  const [category, setCategory] = useState<number | null>(null);
  const [keyword, setKeyWord] = useState<string | null>(null);

  return (
    <div className={cn(styled['main-wrap'], 'max-w-[1560px] m-auto')}>
      <SideBarList setCategory={setCategory} />
      <main className={(cn(styled['main-contact']), 'py-[60px] w-full justify-self-center')}>
        <div className="flex items-center justify-between pb-[30px] ">
          <Suspense fallback={<h2>상품</h2>}>
            <ProductTitle setKeyWord={setKeyWord} />
          </Suspense>
          <SortSelector
            sort={sortOrder}
            setSortOrder={setSortOrder}
            sortSelectOption={PRODUCT_SORT_OPTIONS}
          />
        </div>
        <ProductList
          category={Number(category)}
          keyword={keyword ? keyword : undefined}
          order={sortOrder || 'recent'}
        />
      </main>
      <RankingList />
    </div>
  );
}
