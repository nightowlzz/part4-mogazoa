'use client';

interface DropdownListProps {
  options: string[];
  onSelect: (option: string) => void;
  onClose: () => void;
  className?: string;
  optionClassName?: string;
}

// 드롭다운의 내용 부분입니다. 같은 디자인을 여러곳에서 재사용하기 좋게 분리하였습니다.
// 버튼 부분은 CategorySelector, SortSelector 컴포넌트를 사용해주세요.
const DropdownList: React.FC<DropdownListProps> = ({
  options,
  onSelect,
  onClose,
  className,
  optionClassName,
}) => {
  return (
    <ul
      className={`flex flex-col z-10 gap-[5px] p-2.5 rounded-lg absolute mt-2 w-full border-gray-700 bg-black-450 text-gray-600 shadow-lg ${className}`}
    >
      {options.map((option) => (
        <li key={option}>
          <button
            onClick={() => {
              onSelect(option);
              onClose();
            }}
            className={`w-full px-5 py-[6px] text-left truncate rounded-md hover:bg-gray-700 focus:bg-gray-700 hover:text-white focus:text-white ${optionClassName}`}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DropdownList;
