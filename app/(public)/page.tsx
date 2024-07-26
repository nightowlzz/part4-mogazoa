import styled from '@/app/(public)/_styles/main.module.scss';
import { cn } from '@/lib/utils';
import ProductList from './_components/product-list';

export default function Home() {
  return (
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
  );
}
