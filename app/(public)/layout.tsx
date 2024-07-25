import styled from '@/app/(public)/_styles/main.module.scss';
import { cn } from '@/lib/utils';
import RankingList from './_components/ranking-list';
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
