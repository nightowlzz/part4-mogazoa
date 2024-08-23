'use client';

import useDropdown from '@/hooks/useDropdown';
import useSearchSuggestions from '@/hooks/useSearchSuggestions';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import DropdownList from '@/components/dropdown/dropdown-list';
import { ProductOption, usePreviousSearchStore } from '@/store/global-store';

interface SearchBarProps {
  placeholder?: string;
  isMobileMode?: boolean;
  setIsMobileSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Gnb에서 사용하기 위해서 만들어진 검색창입니다.
const SearchBar = ({
  placeholder = '상품 이름을 검색해 보세요',
  isMobileMode = false,
  setIsMobileSearchOpen,
}: SearchBarProps) => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get('category');
  const categoryId = searchParams.get('categoryId');

  const [keyword, setKeyword] = useState('');
  const { previousSearches, addPreviousSearch } = usePreviousSearchStore();
  const { suggestions } = useSearchSuggestions({ keyword, previousSearches });
  const { inputRef, dropdownRef, isDropdownOpen, setIsDropdownOpen, handleFocus } = useDropdown();
  const router = useRouter();

  //검색 동작
  const executeSearch = () => {
    if (keyword.trim()) {
      if (categoryName) {
        router.push(
          `/search?category=${categoryName}&categoryId=${categoryId}${keyword ? `&keyword=${keyword}` : ''}`,
        );
      } else {
        router.push(`/search?keyword=${keyword}`);
      }

      addPreviousSearch(keyword.trim());
      if (setIsMobileSearchOpen) setIsMobileSearchOpen(false);
      setKeyword('');
      inputRef.current?.blur();
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
    setIsDropdownOpen(false);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget)) {
      return;
    }
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

export default SearchBar;
