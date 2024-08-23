'use client';
import styled from '@/app/(public)/_styles/main.module.scss';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCategories } from '@/hooks/category';
import { cn } from '@/lib/utils';
import useButtonStore from '@/store/global-store';
import { CategoryResponse } from '@/types/data';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface SideBarProps extends CategoryResponse {
  categoryId: number | null;
  keyword?: string | null;
}

export function Categories() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const keyword = searchParams.get('keyword');
  const { data: categories, isError, isPending } = useGetCategories();

  if (isError) return <div>isERROR</div>;

  if (isPending)
    return (
      <div className="flex flex-col space-y-3 opacity-50">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton
            key={'cate' + i}
            className={cn(buttonVariants({ variant: 'nav', size: 'sm' }))}
          ></Skeleton>
        ))}
      </div>
    );

  return (
    <>
      {categories &&
        categories.map((cate, i) => (
          <CategoryButton
            key={cate.id}
            {...cate}
            categoryId={Number(categoryId)}
            keyword={keyword}
          />
        ))}
    </>
  );
}

function CategoryButton({ id, name, categoryId, keyword }: SideBarProps) {
  const { closeButton } = useButtonStore();
  let link;
  if (categoryId && id !== categoryId) {
    link = `/search?category=${name}&categoryId=${id}`;
  } else {
    link = `/search?category=${name}&categoryId=${id}${keyword ? `&keyword=${keyword}` : ''}`;
  }
  return (
    <Link
      href={link}
      className={cn(
        buttonVariants({ variant: 'nav', size: 'sm' }),
        `${categoryId === id ? 'border-[#353542] bg-[#252530] text-white' : ''}`,
      )}
      onClick={closeButton}
    >
      {name}
    </Link>
  );
}

export default function CategoryList() {
  return (
    <nav className={cn(styled['main-nav'], 'py-[45px] px-[20px] lg:px-[30px] hidden md:block')}>
      <h2 className="font-sm lg:font-base text-white md:pb-5">카테고리</h2>
      <Suspense fallback={<div></div>}>
        <Categories />
      </Suspense>
    </nav>
  );
}
