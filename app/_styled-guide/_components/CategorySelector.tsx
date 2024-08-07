'use client';

import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import DropdownList from './dropdown-list';

export interface CategoryOption {
  id: number;
  name: string;
}

interface CategorySelectorProps {
  initialValue?: CategoryOption;
  options?: CategoryOption[];

  placeHolder?: string;
  onChange?: (value: CategoryOption) => void;
  onSelectOption?: () => void;
}

// 카테고리 선택 기능을 위한 드롭다운 메뉴 컴포넌트입니다.
// 기본값으로 10개의 카테고리를 선택할 수 있습니다.
const CategorySelector = ({
  initialValue,
  options = [
    { id: 1, name: '음악' },
    { id: 2, name: '영화/드라마' },
    { id: 3, name: '강의/책' },
    { id: 4, name: '호텔' },
    { id: 5, name: '가구/인테리어' },
    { id: 6, name: '식당' },
    { id: 7, name: '전자기기' },
    { id: 8, name: '화장품' },
    { id: 9, name: '의류/악세서리' },
    { id: 10, name: '앱' },
  ],
  placeHolder = '카테고리 선택',
  onChange,
  onSelectOption,
}: CategorySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CategoryOption | undefined>(initialValue);

  // 버튼 이벤트
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (option: CategoryOption) => {
    setSelectedItem(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
    if (onSelectOption) onSelectOption();
  };

  return (
    <div className="relative inline-block text-left w-full ">
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center align-middle w-full rounded-lg border-gray-650 border hover:border-blue bg-black-450 px-5 h-[53px] md:h-[68px] text-sm md:text-base font-medium text-gray-600 hover:text-white"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedItem ? selectedItem.name : placeHolder}
          <IoMdArrowDropdown
            className={`ml-2 h-5 mr-[-4px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isOpen && <DropdownList<CategoryOption> options={options} onSelect={onSelect} />}
    </div>
  );
};

export default CategorySelector;
