'use client';

import { NO_KEYWORD, NO_RESULT } from '@/constants/messages';

export interface Option {
  label: string;
  id: number;
}

interface DropdownListProps {
  options: Option[];
  onSelect: (option: Option) => void;
  className?: string;
  optionClassName?: string;
}

// 드롭다운의 내용 부분입니다. 같은 디자인을 여러곳에서 재사용하기 좋게 분리하였습니다.
// 버튼 부분은 CategorySelector, SortSelector 컴포넌트를 사용해주세요.
const DropdownList: React.FC<DropdownListProps> = ({
  options,
  onSelect,
  className,
  optionClassName,
}) => {
  // options이나 placeholder가 없을 경우 컴포넌트가 나타나지 않습니다.
  if (options.length === 0) return;

  // 검색 결과가 없거나 입력값이 없을 경우 버튼 비활성화
  const isDisabled = options[0].label === NO_RESULT || options[0].label === NO_KEYWORD;

  return (
    <ul
      className={`flex flex-col z-10 gap-[5px] p-2.5 rounded-lg absolute mt-2 w-full border-gray-700 bg-black-450 text-gray-600 shadow-lg ${className} `}
    >
      {options.map((option) => (
        <li key={option.id}>
          <button
            onClick={() => {
              onSelect(option);
            }}
            className={`md:w-full lg:w-full md:max-w-[164px] lg:max-w-[200px] px-5 py-[6px] text-left truncate rounded-md hover:bg-gray-700 focus:bg-gray-700 hover:text-white focus:text-white ${optionClassName}`}
            disabled={isDisabled}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DropdownList;
