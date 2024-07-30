'use client';
import styled from '@/app/(public)/_styles/main.module.scss';
import { buttonVariants } from '@/components/ui/button';
import { useGetCategories } from '@/hooks/category';
import { cn } from '@/lib/utils';
import { CategoryResponse } from '@/types/data';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface SideBarProps extends CategoryResponse {
  categoryId: number | null;
  keyword?: string | null;
}

function Categories() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const keyword = searchParams.get('keyword');
  const { data: categories, isError, isPending } = useGetCategories();

  if (isError) return <div>isERROR</div>;
  // [NOTE]:스켈레톤 작업
  if (isPending) return <div>로딩중</div>;

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
