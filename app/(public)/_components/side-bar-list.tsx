'use client';
import styled from '@/app/(public)/_styles/main.module.scss';
import { useGetCategories } from '@/hooks/category';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import SideBar from './side-bar';
import { Dispatch, SetStateAction, Suspense } from 'react';

const SideBarSuspense = ({
  handleMainNav,
}: {
  handleMainNav: ({ id, name }: { id: number; name: string }) => void;
}) => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const { data: getCategory } = useGetCategories();
  return (
    <>
      {getCategory &&
        getCategory.map((nav, i) => (
          <SideBar key={nav.id} {...nav} category={category} handleMainNav={handleMainNav} />
        ))}
    </>
  );
};

export default function SideBarList({
  setCategory,
}: {
  setCategory?: Dispatch<SetStateAction<number | null>>;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleMainNav = ({ id, name }: { id: number; name: string }) => {
    router.push(`/product?category=${name}`);
    if (setCategory) setCategory(id);
    queryClient.invalidateQueries({ queryKey: ['products', 'category'] });
  };
  return (
    <nav className={cn(styled['main-nav'], 'py-[45px] px-[20px] lg:px-[30px] hidden md:block')}>
      <h2 className="font-sm lg:font-base text-white md:pb-5">카테고리</h2>
      <Suspense fallback={<div></div>}>
        <SideBarSuspense handleMainNav={handleMainNav} />
      </Suspense>
    </nav>
  );
}
