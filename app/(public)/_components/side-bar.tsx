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
}

export function SideBarSuspense() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const { data: categorys } = useGetCategories();
  return (
    <>
      {categorys &&
        categorys.map((cate, i) => (
          <SideBarButton key={cate.id} {...cate} categoryId={Number(categoryId)} />
        ))}
    </>
  );
}

export function SideBarButton({ id, name, categoryId }: SideBarProps) {
  return (
    <Link
      href={`/product?category=${name}&categoryId=${id}`}
      className={cn(
        buttonVariants({ variant: 'nav', size: 'sm' }),
        `${categoryId === id ? 'border-[#353542] bg-[#252530] text-white' : ''}`,
      )}
    >
      {name}
    </Link>
  );
}

export default function SideBar() {
  return (
    <nav className={cn(styled['main-nav'], 'py-[45px] px-[20px] lg:px-[30px] hidden md:block')}>
      <h2 className="font-sm lg:font-base text-white md:pb-5">카테고리</h2>
      <Suspense fallback={<div></div>}>
        <SideBarSuspense />
      </Suspense>
    </nav>
  );
}
