'use client';

import React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import useSearchSuggestions from '@/hooks/useSearchSuggestions';
import DropdownList from './DropdownList';
import useDropdown from '@/hooks/useDropdown';

export interface ProductOption {
  id: number;
  name: string;
}

export interface SuggestiveSearchInputProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onSelect: (option: ProductOption) => void;
  onEnter?: (keyword: string) => void;
  placeholder?: string;
  boxClassName?: string;
  inputClassName?: string;
  onDisabled?: boolean;
}

/**
 * 검색어를 포함하는 상품명들을 드롭다운으로 보여주는 인풋창입니다. 입력값이 유효한 상품명인지 알 수 없기 때문에 onSubmit과 onSelect를 분리했습니다.
 *
 * @param {Object} props - SearchInputProps
 * @param {string} props.keyword - 인풋의 값 (상위 컴포넌트의 state).
 * @param {function} props.setKeyword - 인풋 변경 함수 (상위 컴포넌트의 setState).
 * @param {function} props.onSelect - Dropdown에서 선택지를 골랐을 때의 동작.
 * @param {function} [props.onEnter] - 인풋 창에서 내용을 입력한 뒤 엔터키를 눌렀을 때 동작.
 * @param {string} [props.placeholder='상품 이름을 검색해 보세요'] - 인풋창이 비어있을 때 보여질 내용.
 * @param {string} [props.boxClassName] - 인풋 박스의 Tailwind CSS 클래스 이름.
 * @param {string} [props.inputClassName] - 인풋 내용의 Tailwind CSS 클래스 이름.
 * @param {boolean} props.isTagPresent - 태그가 있을 때 인풋을 비활성화하기 위한 prop.
 */
const SuggestiveSearchInput = ({
  keyword = '',
  setKeyword,
  onSelect,
  onEnter,
  placeholder = '상품 이름을 검색해 보세요',
  boxClassName,
  inputClassName,
  onDisabled,
}: SuggestiveSearchInputProps) => {
  const { suggestions, isLoading, isError } = useSearchSuggestions(keyword);
  const { inputRef, isDropdownOpen, handleFocus, handleBlur } = useDropdown();

  // 검색창에서 엔터 입력 시 동작. 검색어는 한 글자 이상 입력해야 함
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim() && onEnter) {
      onEnter(keyword);
    }
  };

  return (
    <div className="relative flex-1">
      <div className={`flex justify-between items-center px-5 ${boxClassName}`}>
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full focus:outline-none ${inputClassName}`}
          disabled={onDisabled}
        />
        <button onClick={() => inputRef.current?.focus()}>
          {!isDropdownOpen && !onDisabled && <IoMdArrowDropdown />}
        </button>
      </div>
      {isDropdownOpen && (
        <DropdownList options={suggestions} onSelect={onSelect} className="mt-7" />
      )}
    </div>
  );
};

export default SuggestiveSearchInput;
