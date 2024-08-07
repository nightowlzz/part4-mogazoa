import styled from '@/app/(public)/_styles/handling.module.scss';
import { cn } from '@/lib/utils';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className={cn(styled['content-full-height'], 'flex items-center justify-center')}>
      <div className="w-full max-w-[680px] px-5">{children}</div>
    </section>
  );
}
