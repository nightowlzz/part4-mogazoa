'use client';

import useDropdown from '@/hooks/useDropdown';
import useSearchSuggestions from '@/hooks/useSearchSuggestions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import DropdownList from './dropdown-list';
import { ProductOption } from './suggestive-search-input';

interface SearchBarProps {
  placeholder?: string;
  isMobileMode?: boolean;
  setIsMobileSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Gnb에서 사용하기 위해서 만들어진 검색창입니다.
const GnbSearchBar = ({
  placeholder = '상품 이름을 검색해 보세요',
  isMobileMode = false,
  setIsMobileSearchOpen,
}: SearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const { suggestions, isLoading, isError } = useSearchSuggestions(keyword);
  const { inputRef, isDropdownOpen, handleFocus, handleBlur } = useDropdown();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const executeSearch = () => {
    if (keyword.trim()) {
      router.push(`/product?keyword=${keyword}`);
      if (setIsMobileSearchOpen) setIsMobileSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const onSelect = (value: ProductOption) => {
    setKeyword(value.name);
    inputRef.current?.focus();
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget)) {
      return;
    }
    handleBlur();
    if (setIsMobileSearchOpen) setIsMobileSearchOpen(false);
  };

  useEffect(() => {
    if (isMobileMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobileMode, inputRef]);

  return (
    <div className="relative flex-grow">
      <div
        className={`flex justify-between items-center ${isMobileMode ? 'w-full' : 'md:w-[300px] lg:w-[400px]'} md:h-[50px] lg:h-14 py-4 px-5 bg-black-450 rounded-full`}
      >
        <IoSearch
          className="mr-[15px] md:mr-[10px] lg:mr-5 h-6 w-6 text-gray-400 cursor-pointer"
          onClick={executeSearch}
        />
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent focus:outline-none text-white"
        />
      </div>
      {isDropdownOpen && (
        <div ref={dropdownRef}>
          <DropdownList options={suggestions} onSelect={onSelect} optionClassName="w-full" />
        </div>
      )}
    </div>
  );
};

export default GnbSearchBar;
