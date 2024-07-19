'use client';

import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import DropdownList from './DropdownList';

interface SortSelectorProps {
  options?: string[];
  placeHolder?: string;
}

// sort 기능을 위한 드롭다운 메뉴 컴포넌트입니다.
const SortSelector = (props: SortSelectorProps) => {
  const defaultOptions = ['최신순', '별점 높은순', '별점 낮은순', '좋아요순'];
  const { options = defaultOptions, placeHolder = '최신순' } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeHolder);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (option: string) => {
    setSelectedItem(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div>
        <button
          type="button"
          className="inline-flex justify-between align-middle w-[108px] md:w-[140px] lg:w-40 border-none bg-none text-sm lg:text-base text-gray-600 hover:text-white"
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
          <DropdownList<string>
            options={options}
            onSelect={onSelect}
            className="absolute mt-2 w-[108px] md:w-[140px] lg:w-40 lg:text-base text-gray-600 rounded-lg"
            optionClassName="px-1 md:px-3 lg:px-5 text-sm md:text-base"
          />
        )}
      </div>
    </div>
  );
};

export default SortSelector;
