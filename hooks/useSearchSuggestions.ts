import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import { useDataQuery } from '@/services/common';
import { ProductsListResponse } from '@/types/data';
import { NO_KEYWORD, NO_RESULT } from '@/constants/messages';

interface UseSearchSuggestionsOptions {
  maxSuggestions?: number;
  previousSearch?: string[];
}

const useSearchSuggestions = (
  keyword: string,
  { maxSuggestions, previousSearch = [] }: UseSearchSuggestionsOptions = {},
) => {
  const debouncedKeyword = useDebounce(keyword, 300);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [previousSuggestions, setPreviousSuggestions] = useState<string[]>(previousSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    data,
    isLoading: queryLoading,
    isError: queryError,
  } = useDataQuery<ProductsListResponse>(
    ['products', 'searchSuggestions', debouncedKeyword],
    '/products',
    {
      enabled: !!debouncedKeyword,
      staleTime: 60 * 1000,
    },
    { keyword: debouncedKeyword },
  );

  useEffect(() => {
    if (debouncedKeyword) {
      setIsLoading(true);
      setIsError(false);
      if (!queryLoading && data) {
        // 상품 목록 데이터에서 이름만 추출
        const options = data.list.map((product) => product.name);

        // 항목 최대 수
        const limitedOptions = maxSuggestions ? options.slice(0, maxSuggestions) : options;

        // 검색결과가 없으면 NO_RESULT를 보여줍니다.
        setSuggestions(limitedOptions.length > 0 ? limitedOptions : [NO_RESULT]);
        setIsLoading(false);
      } else if (queryError) {
        setSuggestions(['서버와의 통신이 불안정합니다']);
        setIsError(true);
        setIsLoading(false);
      }
    } else {
      // 키워드가 비어이있을 경우 이전에 검색한 결과를 보여줍니다. 전역 상태로 가져올 예정입니다.
      // 이전 검색 결과도 비어있을 경우 NO_KEYWORD를 보여줍니다.
      setSuggestions(previousSuggestions.length > 0 ? previousSuggestions : [NO_KEYWORD]);
      setIsLoading(false);
      setIsError(false);
    }
  }, [debouncedKeyword, data, queryLoading, queryError, previousSuggestions, maxSuggestions]);

  return {
    suggestions: suggestions,
    isLoading,
    isError,
  };
};

export default useSearchSuggestions;
