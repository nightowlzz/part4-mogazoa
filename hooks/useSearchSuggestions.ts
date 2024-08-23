import { MAX_SUGGESTION } from '@/constants/limit';
import { NO_KEYWORD, NO_RESULT } from '@/constants/messages';
import { ProductOption } from '@/store/global-store';
import { useEffect, useState } from 'react';
import { useGetProducts } from './product';
import useDebounce from './useDebounce';

interface UseSearchSuggestionsOptions {
  keyword: string;
  previousSearches?: ProductOption[];
}

const useSearchSuggestions = ({ keyword, previousSearches }: UseSearchSuggestionsOptions) => {
  const debouncedKeyword = useDebounce(keyword, 300);
  const [suggestions, setSuggestions] = useState<ProductOption[]>([]);

  const {
    data,
    isLoading: queryLoading,
    isError: queryError,
  } = useGetProducts(
    {
      keyword: debouncedKeyword,
    },
    {
      staleTime: 60 * 1000,
    },
  );

  useEffect(() => {
    if (debouncedKeyword) {
      if (!queryLoading && data) {
        // 상품 목록 데이터에서 이름과 id 추출
        const options = data.list.map((product) => ({
          id: product.id,
          name: product.name,
        }));
        // 항목 최대 수
        const limitedOptions = options.slice(0, MAX_SUGGESTION);

        // 검색결과가 없으면 NO_RESULT를 보여줍니다.
        setSuggestions(limitedOptions.length > 0 ? limitedOptions : [{ id: -1, name: NO_RESULT }]);
        return;
      } else if (queryError) {
        setSuggestions([{ id: -1, name: '서버와의 통신이 불안정합니다' }]);
        return;
      }
    } else {
      // 키워드가 비어이있을 경우 이전에 검색한 결과를 보여줍니다.
      // 이전 검색 결과도 비어있을 경우 NO_KEYWORD를 보여줍니다.
      if (previousSearches) {
        setSuggestions(
          previousSearches.length > 0 ? previousSearches : [{ id: -1, name: NO_KEYWORD }],
        );
      }
      return;
    }
  }, [debouncedKeyword, data, queryLoading, queryError, previousSearches]);

  return {
    suggestions,
  };
};

export default useSearchSuggestions;
