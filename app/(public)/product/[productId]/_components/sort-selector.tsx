'use client';

import DropdownList from '@/components/dropdown/dropdown-list';
import { PRODUCT_SORT_OPTIONS, REVIEW_SORT_OPTIONS } from '@/constants/sort-order';
import useSortOrderStore from '@/store/sort-order-store';
import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

interface CategorySelectorProps {
  sortSelectOption: typeof REVIEW_SORT_OPTIONS | typeof PRODUCT_SORT_OPTIONS;
}

// sort 기능을 위한 드롭다운 메뉴 컴포넌트입니다.
const SortSelector = ({ sortSelectOption }: CategorySelectorProps) => {
  const options = sortSelectOption.map((opt) => opt.label);
  const { sortOrder, setSortOrder } = useSortOrderStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOrderSelect = (option: string) => {
    const result = sortSelectOption.find((value) => value.label === option) || {
      id: 'recent',
      label: '최신순',
    };
    console.log('result', result);
    setSortOrder(result.id);
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
          {sortSelectOption.find((value) => value.id === sortOrder)?.label}
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
