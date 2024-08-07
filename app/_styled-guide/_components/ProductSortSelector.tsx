'use client';

import { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import DropdownList from './dropdown-list';

interface CategorySelectorProps {
  category: string[];
  placeHolder?: string;
  onChange?: (category: string) => void;
}

const ProductSortSelector = (props: CategorySelectorProps) => {
  const { category, placeHolder = '최신순', onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeHolder);

  // placeHolder가 변경될 때 selectedItem도 업데이트
  useEffect(() => {
    setSelectedItem(placeHolder);
  }, [placeHolder]);

  // 버튼 이벤트
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    if (onChange) {
      onChange(item);
    }
    toggleDropdown();
  };

  return (
    <div className="relative text-left w-full">
      <div>
        <button
          type="button"
          className="inline-flex justify-between align-middle w-[160px] lg:w-40 border-none bg-none text-lg text-white"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedItem}
          <IoMdArrowDropdown
            className={`ml-2 h-5 md:h-[22px] lg:h-6 mr-[-4px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isOpen && (
          <DropdownList
            options={category}
            onSelect={handleSelectItem}
            className="absolute mt-2 w-[141px] md:w-[139px] lg:w-40 lg:text-base text-gray-600 rounded-lg"
            optionClassName="px-1 md:px-3 lg:px-5 text-sm md:text-base"
          />
        )}
      </div>
    </div>
  );
};

export default ProductSortSelector;
