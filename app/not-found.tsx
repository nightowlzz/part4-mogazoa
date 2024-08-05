import Link from 'next/link';
import styled from './(public)/_styles/handling.module.scss';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div
      className={`${styled['content-full-height']} flex items-center justify-center text-center`}
    >
      <div>
        <h2 className="text-[50px] text-bold text-white">NOT FOUND</h2>
        <p className="text-[24px] text-bold text-gray-600 my-[20px]">페이지를 찾을수 없습니다.</p>
        <Link href={'/'} className={cn(buttonVariants())}>
          홈으로
        </Link>
      </div>
    </div>
  );
}
