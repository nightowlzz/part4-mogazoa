'use client';

import { useEffect, useState } from 'react';
import CompareTag from '@/components/ui/tags/CompareTag';
import { SET_PRODUCT } from '@/constants/messages';
import useCompareStore from '@/store/compareStore';
import SuggestiveSearchInput, {
  ProductOption,
} from '@/app/_styled-guide/_components/suggestive-search-input';

interface ComparePageInputProps {
  index: number;
}

function ComparePageInput({ index }: ComparePageInputProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [tag, setTag] = useState<string>('');

  const { compareItem, updateCompareItem, deleteCompareItem } = useCompareStore((state) => ({
    compareItem: state.compareItems[index],
    updateCompareItem: state.updateCompareItem,
    deleteCompareItem: state.deleteCompareItem,
  }));

  useEffect(() => {
    if (compareItem === undefined) {
      setTag('');
    } else setTag(compareItem?.name);
  }, [compareItem, index]);

  const onSelect = (option: ProductOption) => {
    setKeyword('');
    setTag(option.name);
    updateCompareItem(index, { id: option.id, name: option.name });
  };

  const onTagDelete = () => {
    setTag('');
    deleteCompareItem(index);
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
