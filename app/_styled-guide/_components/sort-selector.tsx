'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import DropdownList from './DropdownList';
import { ReviewSortOrder } from '@/types/data';
import { PRODUCT_SORT_OPTIONS, REVIEW_SORT_OPTIONS } from '@/constants/sortOrder';

interface CategorySelectorProps {
  sort: string;
  sortSelectOption: typeof REVIEW_SORT_OPTIONS | typeof PRODUCT_SORT_OPTIONS;
  setSortOrder: Dispatch<SetStateAction<ReviewSortOrder>>;
}

// sort 기능을 위한 드롭다운 메뉴 컴포넌트입니다.
const SortSelector = ({ sort, setSortOrder, sortSelectOption }: CategorySelectorProps) => {
  const options = sortSelectOption.map((opt) => opt.label);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOrderSelect = (option: string) => {
    const result = sortSelectOption.find((value) => value.label === option)?.id as ReviewSortOrder;
    setSortOrder(result);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between align-middle w-[108px] md:w-[140px] lg:w-40 border-none bg-none text-sm lg:text-base text-gray-600 hover:text-white"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {sortSelectOption.find((value) => value.id === sort)?.label}
          <IoMdArrowDropdown
            className={`ml-2 h-5 md:h-[22px] lg:h-6 mr-[-4px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isOpen && (
          <DropdownList<string>
            options={options}
            onSelect={handleOrderSelect}
            className="absolute mt-2 w-[108px] md:w-[140px] lg:w-40 lg:text-base text-gray-600 rounded-lg"
            optionClassName="px-1 md:px-3 lg:px-5 text-sm md:text-base"
          />
        )}
      </div>
    </div>
  );
};

export default SortSelector;
