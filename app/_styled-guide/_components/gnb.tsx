'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Logo from './logo';
import { FiMenu } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';
import GnbSearchBar from './gnb-search-bar';

interface GnbProps {
  isLogin?: boolean;
}

function Gnb({ isLogin = true }: GnbProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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
    <div className="mb-[70px] md:mb-20 lg:mb-[100px]">
      {/* 태블릿 이상일 시 디자인 */}
      <div className="hidden md:block">
        <div className="flex justify-between items-center w-full md:h-20 lg:h-[100px] md:px-[30px] lg:px-[120px] fixed inset-x-0 top-0 bg-black-600 z-50">
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
        <div className="flex justify-between items-center w-full h-[70px] px-5 fixed inset-x-0 top-0 bg-black-600 z-50">
          <button>
            <FiMenu className="text-gray-500 h-6 w-6" />
          </button>
          <Logo />
          <button onClick={toggleMobileSearch}>
            <IoSearch className="text-gray-500 h-6 w-6" />
          </button>
        </div>
        {isMobileSearchOpen && (
          <div className="fixed inset-x-0 top-0 w-full h-[70px] bg-black-600 z-50">
            <div className="flex items-center h-full px-5">
              <div className="flex-shrink-0 mr-5">
                <FiMenu className="text-gray-500 h-6 w-6" />
              </div>
              <GnbSearchBar isMobileMode={true} setIsMobileSearchOpen={setIsMobileSearchOpen} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gnb;
