import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import Header from '@/components/header/header';
import FloatAddButton from '@/components/modal/float-add-button';
import QueryProviderWrapper from '@/components/query-provider-wrapper';
import { Provider } from '@/components/session-provider';
import { authOptions } from './api/auth/[...nextauth]/auth-options';
import './globals.css';
import KakaoScript from './(public)/product/[productId]/_components/product-detail/kakao-script';

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
      <body className={(inter.className, 'bg-BgBlack px-5 pt-[50px] md:pt-[60px] lg:pt-[100px]')}>
        <QueryProviderWrapper>
          <Provider>
            <Header isLoginServer={!!session} />
            {children}
            <FloatAddButton isLoginServer={!!session} />
          </Provider>
        </QueryProviderWrapper>
        <Toaster position="bottom-center" />
        <KakaoScript />
      </body>
    </html>
  );
}
