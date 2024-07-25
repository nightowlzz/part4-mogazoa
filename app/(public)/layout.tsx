import QueryProviderWrapper from '@/components/QueryProviderWrapper';
import { Provider } from '@/components/SessionProvider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RankingList from './_components/ranking-list';
import styled from '@/app/(public)/_styles/main.module.scss';
import SideBar from './_components/side-bar';
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn(styled['main-wrap'], 'max-w-[1560px] m-auto')}>
      <SideBar />
      {children}
      <RankingList />
    </div>
  );
}
