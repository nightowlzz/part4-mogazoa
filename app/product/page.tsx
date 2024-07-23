'use client';
import styled from '@/app/(public)/_styles/main.module.scss';
import { PRODUCT_SORT_OPTIONS } from '@/constants/sortOrder';
import { useGetCategories } from '@/hooks/category';
import { cn } from '@/lib/utils';
import { ReviewSortOrder } from '@/types/data';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import MainNav from '../(public)/_components/main-nav';
import ProductList from '../(public)/_components/product-list';
import RankingList from '../(public)/_components/ranking-list';
import SortSelector from '../_styled-guide/_components/sort-selector';

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const keyword = searchParams.get('keyword');
  const { data: getCategory } = useGetCategories();
  const [sortOrder, setSortOrder] = useState<ReviewSortOrder>('recent');
  const searchTerm = category
    ? getCategory?.find((data) => String(data.id) === String(category))?.name
    : keyword
      ? keyword
      : undefined;

  return (
    <div className={cn(styled['main-wrap'], 'max-w-[1560px] m-auto')}>
      <nav className={cn(styled['main-nav'], 'py-[45px] px-[20px] lg:px-[30px] hidden md:block')}>
        <h2 className="font-sm lg:font-base text-white md:pb-5">카테고리</h2>
        <MainNav nav={getCategory} category={category} />
      </nav>
      <main className={(cn(styled['main-contact']), 'py-[60px] w-full justify-self-center')}>
        <div className="flex items-center justify-between pb-[30px] ">
          <h2 className="text-[22px] text-white font-bold">{searchTerm} 의 모든 상품</h2>
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
      <aside className={cn(styled['main-ranking'], 'pt-[45px] lx:px-[30px] overflow-hidden')}>
        <h2 className="font-sm lg:font-base text-white pb-5">리뷰어 랭킹</h2>
        <RankingList />
      </aside>
    </div>
  );
}
