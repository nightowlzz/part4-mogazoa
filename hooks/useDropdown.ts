import { useState, useRef } from 'react';

// input 요소에 드롭다운형 목록을 보여줄 때 사용하는 커스텀 훅입니다.
// inputRef는 포커스를 관리하기 위해서 사용합니다.
const useDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색창 input 활성화시, dropdownList 열림
  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  // input 요소가 focus를 잃어도 설정한 시간 동안 Dropdown을 유지합니다.
  const handleBlur = () => {
    setTimeout(() => {
      if (!inputRef.current?.contains(document.activeElement)) {
        setIsDropdownOpen(false);
      }
    }, 100);
  };

  return {
    inputRef,
    isDropdownOpen,
    setIsDropdownOpen,
    handleFocus,
    handleBlur,
  };
};

export default useDropdown;
