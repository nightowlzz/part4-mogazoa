'use client';

import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import DropdownList from './DropdownList';
import { string } from 'zod';

interface CategorySelectorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  category?: string[];
  placeHolder?: string;
}

// 카테고리 선택 기능을 위한 드롭다운 메뉴 컴포넌트입니다.
// 기본값으로 10개의 카테고리를 선택할 수 있습니다.
const CategorySelector = (props: CategorySelectorProps) => {
  const options = [
    '음악',
    '영화/드라마',
    '강의/책',
    '호텔',
    '가구/인테리어',
    '식당',
    '전자기기',
    '화장품',
    '의류/악세서리',
    '앱',
  ];
  const { initialValue, onChange, category = options, placeHolder = '카테고리 선택' } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialValue || placeHolder);

  // 버튼 이벤트
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 카테고리 선택 시 호출되는 함수
  const handleSelect = (selectedItem: string) => {
    setSelectedItem(selectedItem);
    if (onChange) {
      onChange(selectedItem);
    }
    toggleDropdown();
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div>
        <button
          type="button"
          className="inline-flex justify-between align-middle w-full rounded-lg border-gray-700 hover:border-blue bg-black-450 px-5 py-[1.063rem] lg:py-[1.438rem] text-sm font-medium text-gray-600 hover:text-white"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedItem}
          <IoMdArrowDropdown
            className={`ml-2 h-5 mr-[-4px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {category.map((option, index) => (
              <div
                key={index}
                className="cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                <span className="block truncate">{option}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
