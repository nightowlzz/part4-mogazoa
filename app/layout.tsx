import QueryProviderWrapper from '@/components/QueryProviderWrapper';
import { Provider } from '@/components/SessionProvider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import KakaoScript from './product/[productId]/_components/product-detail/kakao-script';
import Gnb from './_styled-guide/_components/gnb';
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/auth-options';
import FloatAddButton from './_styled-guide/_components/float-add-button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mogazoa',
  keywords: '상품, 비교, 리뷰, 쇼핑, 다나와',
  description: '상품을 업로드하고, 리뷰하고, 비교하세요.',
  themeColor: 'dark',

  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: 'Mogazoa',
    url: 'https://part4-mogazoa.vercel.app/',
    description: '상품을 업로드하고, 리뷰하고, 비교하세요.',
    siteName: 'Mogazoa',
    images: 'https://i.ibb.co/rQkCH3P/MOGAZOA.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mogazoa',
    description: '상품을 업로드하고, 리뷰하고, 비교하세요.',
  },
  alternates: {
    canonical: 'https://part4-mogazoa.vercel.app/',
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body className={cn(inter.className, 'bg-BgBlack px-5 pt-[70px] md:pt-[80px] lg:pt-[100px]')}>
        <QueryProviderWrapper>
          <Provider>
            <Gnb isLogin={!!session} />
            {children}
            {!!session && <FloatAddButton />}
          </Provider>
        </QueryProviderWrapper>
        <Toaster position="top-center" />
        <KakaoScript />
      </body>
    </html>
  );
}
