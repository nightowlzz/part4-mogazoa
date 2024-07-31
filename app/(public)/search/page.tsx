'use client';
import styled from '@/app/(public)/_styles/main.module.scss';
import SortSelector from '@/app/_styled-guide/_components/sort-selector';
import { PRODUCT_SORT_OPTIONS } from '@/constants/sortOrder';
import { cn } from '@/lib/utils';
import { ReviewSortOrder } from '@/types/data';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import SearchList from './_components/search-list';

interface ProductSearchParamsProps {
  setKeyWord: Dispatch<SetStateAction<string | null>>;
  setCategoryId: Dispatch<SetStateAction<number | null>>;
}

function createMessage(categoryName: string | null, keyword: string | null) {
  if (categoryName && keyword) {
    return (
      <span>
        <strong className="text-gray-400 underline">{categoryName}</strong>의 상품 중에
        <strong className="text-gray-400 underline pl-1">{keyword}</strong> 상품
      </span>
    );
  } else if (categoryName) {
    return (
      <span>
        <strong className="text-gray-400 underline">{categoryName}</strong> 상품
      </span>
    );
  } else if (keyword) {
    return (
      <span>
        <strong className="text-gray-400 underline pl-1">{keyword}</strong> 상품
      </span>
    );
  } else {
    return <span>상품이 없습니다.</span>;
  }
}

const ProductSearchParams = ({ setKeyWord, setCategoryId }: ProductSearchParamsProps) => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get('category');
  const categoryId = searchParams.get('categoryId');
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    setKeyWord(keyword);
    setCategoryId(Number(categoryId));
  }, [categoryId, keyword, setKeyWord, setCategoryId]);

  return (
    <h2 className="text-[22px] text-white font-bold">{createMessage(categoryName, keyword)}</h2>
  );
};

export default function ProductPage() {
  const [sortOrder, setSortOrder] = useState<ReviewSortOrder>('recent');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [keyword, setKeyWord] = useState<string | null>(null);

  return (
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
      <SearchList
        category={Number(categoryId)}
        keyword={keyword ? keyword : undefined}
        order={sortOrder || 'recent'}
      />
    </main>
  );
}
