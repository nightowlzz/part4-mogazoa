'use client';

import { useEffect, useState } from 'react';
import CompareTag from '@/components/ui/tags/CompareTag';
import { SET_PRODUCT } from '@/constants/messages';
import useCompareStore from '@/store/compareStore';
import { IoMdArrowDropdown } from 'react-icons/io';
import useSearchSuggestions from '@/hooks/useSearchSuggestions';
import useDropdown from '@/hooks/useDropdown';
import DropdownList from '@/app/_styled-guide/_components/dropdown-list';
import { ProductOption, usePreviousCompareStore } from '@/store/globalStore';

interface ComparePageInputProps {
  index: number;
}

function ComparePageInput({ index }: ComparePageInputProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const { previousComparedValues, addPreviousComparedValue } = usePreviousCompareStore();
  const { suggestions } = useSearchSuggestions({
    keyword,
    previousSearches: previousComparedValues,
  });
  const { inputRef, dropdownRef, isDropdownOpen, setIsDropdownOpen, handleFocus } = useDropdown();

  const { compareItem, updateCompareItem, deleteCompareItem } = useCompareStore((state) => ({
    compareItem: state.compareItems[index],
    updateCompareItem: state.updateCompareItem,
    deleteCompareItem: state.deleteCompareItem,
  }));

  useEffect(() => {
    if (compareItem === undefined) {
      setTag('');
    } else setTag(compareItem?.name);
  }, [compareItem, index]);

  const onSelect = (option: ProductOption) => {
    setIsDropdownOpen(false);
    setKeyword('');
    setTag(option.name);
    updateCompareItem(index, { id: option.id, name: option.name });
    addPreviousComparedValue(option);
  };

  const onTagDelete = () => {
    setTag('');
    deleteCompareItem(index);
  };

  // 검색창에서 엔터 입력 시 동작. 검색어는 한 글자 이상 입력해야 함
  /*
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && keyword.trim() && onEnter) {
        onEnter(keyword);
      }
    };
    */

  return (
    <div className="relative flex items-center w-full lg:w-[350px] h-[55px] lg:h-[70px] bg-black-400 rounded-lg">
      {tag && (
        <div className="flex-shrink-0 px-5">
          <CompareTag productName={tag} onDelete={onTagDelete} index={index} />
        </div>
      )}

      <div className="relative flex-1">
        <div className={`flex justify-between items-center px-5 `}>
          <input
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={handleFocus}
            placeholder={tag ? '' : SET_PRODUCT}
            className={`w-full focus:outline-none bg-transparent text-white`}
            disabled={!!tag}
          />
          <button onClick={() => inputRef.current?.focus()}>
            {!isDropdownOpen && !tag && <IoMdArrowDropdown />}
          </button>
        </div>
        {isDropdownOpen && (
          <div ref={dropdownRef}>
            <DropdownList options={suggestions} onSelect={onSelect} className="mt-7" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ComparePageInput;
