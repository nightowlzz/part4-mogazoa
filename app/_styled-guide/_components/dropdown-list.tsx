'use client';

import { NO_KEYWORD, NO_RESULT } from '@/constants/messages';
import { CategoryOption } from './CategorySelector';

interface DropdownListProps<T> {
  options: T[];
  onSelect: (option: T) => void;
  className?: string;
  optionClassName?: string;
}

// 드롭다운의 내용 부분입니다. 같은 디자인을 여러곳에서 재사용하기 좋게 분리하였습니다.
// 버튼 부분은 CategorySelector, SortSelector 컴포넌트를 사용해주세요.
const DropdownList = <T extends CategoryOption | string>({
  options,
  onSelect,
  className,
  optionClassName,
}: DropdownListProps<T>) => {
  // options이나 placeholder가 없을 경우 컴포넌트가 나타나지 않습니다.
  if (options.length === 0) return null;

  // 검색 결과가 없을 경우 버튼 비활성화
  const isDisabled = options.some((option) =>
    typeof option === 'object'
      ? 'name' in option && (option.name === NO_RESULT || option.name === NO_KEYWORD)
      : option === NO_RESULT || option === NO_KEYWORD,
  );

  return (
    <ul
      className={`flex flex-col z-10 gap-[5px] overflow-auto max-h-[220px] p-2.5 rounded-lg absolute mt-2 w-full border-gray-700 bg-black-450 text-gray-600 shadow-lg ${className}`}
    >
      {options.map((option) => (
        <li key={typeof option === 'string' ? option : (option as CategoryOption).id}>
          <button
            onClick={() => {
              onSelect(option);
            }}
            className={`md:w-full lg:w-full px-5 py-[6px] text-left truncate rounded-md hover:bg-gray-700 focus:bg-gray-700 hover:text-white focus:text-white ${optionClassName}`}
            disabled={isDisabled}
          >
            {typeof option === 'string' ? option : option.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DropdownList;
