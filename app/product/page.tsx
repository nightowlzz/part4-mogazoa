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

interface ProductSearchParamsProps {
  setKeyWord: Dispatch<SetStateAction<string | null>>;
  setCategoryId: Dispatch<SetStateAction<number | null>>;
}

const ProductSearchParams = ({ setKeyWord, setCategoryId }: ProductSearchParamsProps) => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get('category');
  const categoryId = searchParams.get('categoryId');
  const keyword = searchParams.get('keyword');
  const searchTerm = categoryName ? categoryName : keyword ? keyword : undefined;

  useEffect(() => {
    setKeyWord(keyword);
    setCategoryId(Number(categoryId));
  }, [, categoryId, keyword, setKeyWord, , setCategoryId]);

  return <h2 className="text-[22px] text-white font-bold">{searchTerm} 의 모든 상품</h2>;
};

export default function ProductPage() {
  const [sortOrder, setSortOrder] = useState<ReviewSortOrder>('recent');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [keyword, setKeyWord] = useState<string | null>(null);

  return (
    <div className={cn(styled['main-wrap'], 'max-w-[1560px] m-auto')}>
      <SideBarList />
      <main className={(cn(styled['main-contact']), 'py-[60px] w-full justify-self-center')}>
        <div className="flex items-center justify-between pb-[30px] ">
          <Suspense fallback={<h2>상품</h2>}>
            <ProductSearchParams setKeyWord={setKeyWord} setCategoryId={setCategoryId} />
          </Suspense>
          <SortSelector
            sort={sortOrder}
            setSortOrder={setSortOrder}
            sortSelectOption={PRODUCT_SORT_OPTIONS}
          />
        </div>
        <ProductList
          category={Number(categoryId)}
          keyword={keyword ? keyword : undefined}
          order={sortOrder || 'recent'}
        />
      </main>
      <RankingList />
    </div>
  );
}
