'use client';

import { Categories } from '@/app/(public)/_components/category-list';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';
import Logo from './logo';
import SearchBar from './search-bar';
import useButtonStore from '@/store/global-store';

function Gnb({ isLogin }: { isLogin: boolean }) {
  const { toggleButton } = useButtonStore();
  return (
    <div className="flex flex-col gap-[12px] order-3 pt-6 mt-6 border-t border-gray-600 md:order-1 md:border-t-0 md:mt-0 md:pt-0 md:flex-row md:gap-[30px] lg:gap-[60px]">
      <h2 className="block font-sm text-white pb-2 md:hidden">마이메뉴</h2>
      {isLogin && (
        <>
          <Link
            href="/compare"
            className={cn(
              buttonVariants({ variant: 'text', size: 'auto' }),
              'py-1 px-3 justify-start text-gray-600 md:justify-center md:text-white',
            )}
            onClick={toggleButton}
          >
            비교하기
          </Link>
          <Link
            href="/mypage"
            className={cn(
              buttonVariants({ variant: 'text', size: 'auto' }),
              'py-1 px-3 justify-start text-gray-600 md:justify-center md:text-white',
            )}
            onClick={toggleButton}
          >
            내 프로필
          </Link>
        </>
      )}
      {!isLogin && (
        <>
          <Link
            href="/signin"
            className={cn(
              buttonVariants({ variant: 'text', size: 'auto' }),
              'py-1 px-3 justify-start text-gray-600 md:justify-center md:text-white',
            )}
            onClick={toggleButton}
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ variant: 'text', size: 'auto' }),
              'py-1 px-3 justify-start text-gray-600 md:justify-center md:text-white',
            )}
            onClick={toggleButton}
          >
            회원가입
          </Link>
        </>
      )}
    </div>
  );
}

function Header({ isLoginServer }: { isLoginServer: boolean }) {
  const { data: session, status } = useSession();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { isHeaderMenuButtonClicked: isButtonClicked, toggleButton } = useButtonStore();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isLogin = isLoginServer || status === 'authenticated';

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
            <Suspense>
              <SearchBar />
            </Suspense>
            <Gnb isLogin={isLogin} />
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
              <SearchBar isMobileMode={true} setIsMobileSearchOpen={setIsMobileSearchOpen} />
            </div>
          </div>
        )}
      </div>

      {/* 모바일 전용 슬라이드 메뉴 */}
      {isButtonClicked && (
        <>
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="w-[200px] bg-black-500 flex flex-col space-y-4 p-4 overflow-y-auto">
              <Gnb isLogin={isLogin} />
              <h2 className="font-sm text-white">카테고리</h2>
              <Suspense>
                <Categories />
              </Suspense>
            </div>
            <div className="flex-1 bg-black-500 bg-opacity-50" onClick={toggleButton}></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
