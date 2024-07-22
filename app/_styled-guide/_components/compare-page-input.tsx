'use client';

import { useEffect, useState } from 'react';
import SuggestiveSearchInput from './suggestive-search-input';
import CompareTag from '@/components/ui/tags/CompareTag';
import { SET_PRODUCT } from '@/constants/messages';
import useCompareStore from '@/store/compareStore';
import { Option } from './DropdownList';

interface ComparePageInputProps {
  index: number;
}

function ComparePageInput({ index }: ComparePageInputProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [tag, setTag] = useState<string>('');

  const compareItems = useCompareStore((state) => state.compareItems);
  const updateCompareItem = useCompareStore((state) => state.updateCompareItem);

  useEffect(() => {
    if (compareItems[index] === undefined) {
      setTag('');
    }
  }, [compareItems, index]);

  const onSelect = (option: Option) => {
    setKeyword('');
    setTag(option.label);
    updateCompareItem(index, option.id);
  };

  const onTagDelete = () => {
    setTag('');
    updateCompareItem(index, -1);
  };

  return (
    <div className="relative flex items-center w-full lg:w-[350px] h-[55px] lg:h-[70px] bg-black-400 rounded-lg">
      {tag && (
        <div className="flex-shrink-0 px-5">
          <CompareTag productName={tag} onDelete={onTagDelete} index={index} />
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
