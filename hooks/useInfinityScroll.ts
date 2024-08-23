/**
 * useInfinityScroll 커스텀 훅
 *
 * @description
 * 이 훅은 무한 스크롤 기능을 구현하여, 사용자가 스크롤할 때
 * 추가 데이터를 자동으로 불러오는 기능을 제공합니다.
 * React Query를 사용하여 서버에서 데이터를 페이징 처리하여
 * 가져오며, Intersection Observer를 활용해 스크롤 위치를 감지합니다.
 *
 * @param {'review' | 'products' | 'followers' | 'followees'} props.queryKey - 데이터 요청의 종류
 *
 * @example
 * const { ref, data, isError, isPending, fetchNextPage, hasNextPage } = useInfinityScroll({
 *   queryKey: 'products', - 쿼리 키 값으로 API 호출 시 buildApiUrl 함수에서 사용됨
 *   order: 'asc', - 리뷰, 상품검색 정렬 type 범용
 *   category: 1, - 사이드바 메뉴에서 선택된 카테고리 ID 값
 * });
 *
 * @param {string} [props.order] - 정렬 기준
 * @requires @tanstack/react-query
 * @requires react-intersection-observer
 * @requires sonner
 * @requires @/utils/axiosInstance
 * @requires @/utils/hookUtils/addQueryParams
 * @requires @/types/data
 */
import { ProductResponse } from '@/types/data';
import instance from '@/utils/axiosInstance';
import { addQueryParams } from '@/utils/hook-utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';

export interface QueryParams {
  cursor?: number;
  order?: string;
  keyword?: string;
  category?: number;
}

export interface InfiniteQueryData<T> {
  pages: T[]; // 각 페이지의 데이터 배열
  pageParams: any[]; // 각 페이지에 대한 파라미터 배열
}

export interface QueryListResponse<T> {
  list: T[]; // 실제 데이터 구조에 맞게 수정
  nextCursor?: number | null; // 다음 페이지를 위한 커서
}

type ZeroToOne = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

interface useInfinityScrollProps<T> {
  queryKey: 'review' | 'products' | 'followers' | 'followees';
  order?: string;
  productId?: string | string[];
  threshold?: ZeroToOne;
  keyword?: string;
  category?: number;
  userId?: number;
  reviewId?: number;
  initialData?: InfiniteQueryData<QueryListResponse<T>>; // 제네릭 타입 추가
}

export const useInfinityScroll = <T>({
  queryKey,
  productId,
  threshold = 0.3,
  order,
  keyword,
  category,
  userId,
  reviewId,
  initialData,
}: useInfinityScrollProps<T>) => {
  const { ref, inView } = useInView({
    threshold: threshold,
  });

  const buildApiUrl = (queryKey: string) => {
    switch (queryKey) {
      case 'review':
        return `/products/${productId}/reviews`;
      case 'products':
        return `/products`;
      case 'followers':
        return `/users/${userId}/followers`;
      case 'followees':
        return `/users/${userId}/followees`;
      default:
        return '';
    }
  };

  const buildFetchingData = async ({ order, keyword, category, cursor }: QueryParams) => {
    try {
      const res = await instance.get(
        `${buildApiUrl(queryKey)}${addQueryParams({ order, keyword, category, cursor })}`,
      );
      if (!res) return;
      return res.data;
    } catch (err: any) {
      let errorMessage = '데이터를 불러 오는데 실패 했습니다.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      toast.error(errorMessage);
      throw err;
    }
  };

  const {
    data: fetchData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey, { productId, order, keyword, category, userId, reviewId }],
    queryFn: async ({ pageParam: cursor = 0 }) => {
      return buildFetchingData({ order, keyword, category, cursor });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if ('nextCursor' in lastPage) {
        return lastPage.nextCursor; // nextCursor가 존재하면 반환
      }
      return undefined; // 다음 커서가 없으면 undefined 반환
    },
    initialData: initialData ? { pages: [initialData], pageParams: [1] } : undefined,
  });

  // [NOTE] list만 추출
  const data = fetchData?.pages.flatMap(
    (value) => value?.list?.map((list: ProductResponse) => list) || [],
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return {
    ref,
    data,
    isError,
    isPending,
    fetchNextPage,
    hasNextPage,
  };
};
