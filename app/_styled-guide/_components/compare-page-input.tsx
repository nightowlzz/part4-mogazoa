'use client';
import { useState } from 'react';
import SuggestiveSearchInput from './suggestive-search-input';

import CompareTag from '@/components/ui/tags/CompareTag';
import { SET_PRODUCT } from '@/constants/messages';

function ComparePageInput() {
  const [keyword, setKeyword] = useState<string>('');
  const [tag, setTag] = useState<string>('');

  const onSelect = (option: string) => {
    setKeyword('');
    setTag(option);
  };
  const onTagDelete = () => {
    setTag('');
  };

  return (
    <div className="w-[300px] relative">
      <div className="flex items-center bg-black-400 py-2 px-3 rounded">
        {tag && <CompareTag productName={tag} onDelete={onTagDelete} />}
        <div className="flex-1">
          <SuggestiveSearchInput
            onSelect={onSelect}
            keyword={keyword}
            setKeyword={setKeyword}
            placeholder={tag ? '' : SET_PRODUCT}
            boxClassName="bg-transparent"
            inputClassName="w-full"
            onDisabled={!!tag} // 태그가 있을 때 입력을 비활성화하기 위한 prop 추가
          />
        </div>
      </div>
    </div>
  );
}

export default ComparePageInput;
