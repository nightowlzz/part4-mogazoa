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
    <div className="relative flex items-center w-full lg:w-[350px] h-[55px] lg:h-[70px] bg-black-400 rounded-lg">
      {tag && (
        <div className="flex-shrink-0 px-5">
          <CompareTag productName={tag} onDelete={onTagDelete} />
        </div>
      )}
      <SuggestiveSearchInput
        onSelect={onSelect}
        keyword={keyword}
        setKeyword={setKeyword}
        placeholder={tag ? '' : SET_PRODUCT}
        inputClassName="w-full bg-transparent text-white"
        onDisabled={!!tag}
      />
    </div>
  );
}

export default ComparePageInput;
