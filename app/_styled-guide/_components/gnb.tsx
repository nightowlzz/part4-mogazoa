'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Logo from './logo';
import { FiMenu } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';
import GnbSearchBar from './gnb-search-bar';
import useButtonStore from '@/store/globalStore';
import { useGetCategories } from '@/hooks/category';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

interface GnbProps {
  isLogin?: boolean;
}

interface SideBarButtonProps {
  id: number;
  name: string;
  categoryId: number | null;
}

function SideBarButton({ id, name, categoryId }: SideBarButtonProps) {
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

function SideBarContents() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const { data: categories } = useGetCategories();
  return (
    <>
      {categories &&
        categories.map((cate) => (
          <SideBarButton key={cate.id} {...cate} categoryId={Number(categoryId)} />
        ))}
    </>
  );
}

function Gnb({ isLogin = true }: GnbProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { isHeaderMenuButtonClicked: isButtonClicked, toggleButton } = useButtonStore();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  useEffect(() => {
    if (isMobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  return (
    <div>
      {/* 태블릿 이상일 시 디자인 */}
      <div className="hidden md:block">
        <div className="flex justify-between items-center w-full md:h-20 lg:h-[100px] md:px-[30px] lg:px-[120px] fixed inset-x-0 top-0 bg-black-600 z-40">
          <Logo />
          <div className="flex justify-between md:gap-[30px] lg:gap-[60px]">
            <GnbSearchBar />
            {isLogin && (
              <>
                <Link href="/compare" className={buttonVariants({ variant: 'text', size: 'auto' })}>
                  비교하기
                </Link>
                <Link href="/mypage" className={buttonVariants({ variant: 'text', size: 'auto' })}>
                  내 프로필
                </Link>
              </>
            )}
            {!isLogin && (
              <>
                <Link href="/signin" className={buttonVariants({ variant: 'text', size: 'auto' })}>
                  로그인
                </Link>
                <Link href="/signup" className={buttonVariants({ variant: 'text', size: 'auto' })}>
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 모바일 디자인 */}
      <div className="block md:hidden">
        <div className="flex justify-between items-center w-full h-[70px] px-5 fixed inset-x-0 top-0 bg-black-600 z-30">
          <button onClick={toggleButton}>
            <FiMenu className="text-gray-500 h-6 w-6" />
          </button>
          <Logo />
          <button onClick={toggleMobileSearch}>
            <IoSearch className="text-gray-500 h-6 w-6" />
          </button>
        </div>
        {/* 모바일 전용 검색 버튼 동작 */}
        {isMobileSearchOpen && (
          <div className="fixed inset-x-0 top-0 w-full h-[70px] bg-black-600 z-30">
            <div className="flex items-center h-full px-5">
              <button
                className="flex-shrink-0 mr-5"
                onClick={() => {
                  toggleButton();
                  setIsMobileSearchOpen(false);
                }}
              >
                <FiMenu className="text-gray-500 h-6 w-6" />
              </button>
              <GnbSearchBar isMobileMode={true} setIsMobileSearchOpen={setIsMobileSearchOpen} />
            </div>
          </div>
        )}
      </div>

      {/* 모바일 전용 슬라이드 메뉴 */}
      {isButtonClicked && (
        <>
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="w-[200px] bg-black-500 flex flex-col space-y-4 p-4">
              {isLogin && (
                <>
                  <Link href="/compare" className={`${buttonVariants({ variant: 'default' })}`}>
                    비교하기
                  </Link>
                  <Link href="/mypage" className={buttonVariants({ variant: 'default' })}>
                    내 프로필
                  </Link>
                </>
              )}
              {!isLogin && (
                <>
                  <Link href="/signin" className={buttonVariants({ variant: 'text' })}>
                    로그인
                  </Link>
                  <Link href="/signup" className={buttonVariants({ variant: 'text' })}>
                    회원가입
                  </Link>
                </>
              )}

              <h2 className="font-sm text-white">카테고리</h2>
              <Suspense fallback={<div></div>}>
                <SideBarContents />
              </Suspense>
            </div>
            <div className="flex-1 bg-black-500 bg-opacity-50" onClick={toggleButton}></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Gnb;
