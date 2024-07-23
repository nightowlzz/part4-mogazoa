'use client';
import styled from '@/app/(public)/_styles/main.module.scss';
import { useGetCategories } from '@/hooks/category';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import MainNav from './_components/main-nav';
import ProductList from './_components/product-list';
import RankingList from './_components/ranking-list';

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const { data: getCategory } = useGetCategories();

  return (
    <div className={cn(styled['main-wrap'], 'max-w-[1560px] m-auto')}>
      <nav className={cn(styled['main-nav'], 'py-[45px] px-[20px] lg:px-[30px] hidden md:block')}>
        <h2 className="font-sm lg:font-base text-white md:pb-5">카테고리</h2>
        <MainNav nav={getCategory} category={category} />
      </nav>
      <main className={(cn(styled['main-contact']), 'py-[60px] w-full justify-self-center')}>
        <h2 className="flex items-center justify-start pb-[30px] text-[22px] text-white font-bold gap-[10px]">
          지금 핫한 상품
          <span className="flex bg-clip-text text-transparent bg-gradient-to-r from-[#5097FA] to-[#5363FF]">
            TOP6
          </span>
        </h2>
        <ProductList order="rating" />
        <h2 className="pb-[30px] text-[22px] text-white font-bold pt-[60px]">별점이 높은 상품</h2>
        <ProductList order="reviewCount" />
      </main>
      <aside className={cn(styled['main-ranking'], 'pt-[45px] lx:px-[30px] overflow-hidden')}>
        <h2 className="font-sm lg:font-base text-white pb-5">리뷰어 랭킹</h2>
        <RankingList />
      </aside>
    </div>
  );
}
