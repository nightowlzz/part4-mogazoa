/**
 * useInfinityScroll 커스텀 훅
 *
 * @description
 * 이 훅은 무한 스크롤 기능을 구현하여, 사용자가 스크롤할 때
 * 추가 데이터를 자동으로 불러오는 기능을 제공합니다.
 * React Query를 사용하여 서버에서 데이터를 페이징 처리하여
 * 가져오며, Intersection Observer를 활용해 스크롤 위치를 감지합니다.
 *
 * @param {Object} props - 훅에 전달할 프로퍼티
 * @param {'review' | 'products' | 'followers' | 'followees'} props.queryKey - 데이터 요청의 종류
 * @param {string} [props.order] - 정렬 기준
 * @param {string | string[]} [props.productId] - 제품 ID (리뷰 요청 시)
 * @param {0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1} [props.threshold] - Intersection Observer 값
 * @param {string} [props.keyword] - 검색 키워드
 * @param {number} [props.category] - 카테고리 ID
 * @param {number} [props.userId] - 사용자 ID (팔로워/팔로잉 요청 시)
 *
 * @returns {Object} - 훅의 반환 값
 * @returns {React.Ref} ref - Intersection Observer의 ref
 * @returns {Array<queryResponse>} data - 요청한 데이터
 * @returns {boolean} isError - 에러 여부
 * @returns {boolean} isPending - 요청 중 여부
 * @returns {Function} fetchNextPage - 다음 페이지 요청 함수
 * @returns {boolean} hasNextPage - 다음 페이지 존재 여부
 *
 * @example
 * const { ref, data, isError, isPending, fetchNextPage, hasNextPage } = useInfinityScroll({
 *   queryKey: 'products', - 쿼리 키 값으로 API 호출 시 buildApiUrl 함수에서 사용됨
 *   order: 'asc', - 리뷰, 상품검색 정렬 type 범용
 *   category: 1, - 사이드바 메뉴에서 선택된 카테고리 ID 값
 * });
 *
 *
 * @requires @tanstack/react-query
 * @requires react-intersection-observer
 * @requires sonner
 * @requires @/utils/axiosInstance
 * @requires @/types/data
 */

import {
  FolloweesList,
  FolloweesResponse,
  FollowersList,
  FollowersResponse,
  ProductResponse,
  ProductsListResponse,
  ReviewListResponse,
  ReviewResponse,
} from '@/types/data';
import instance from '@/utils/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';

type ZeroToOne = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

type queryResponse = ReviewResponse & ProductResponse & FolloweesList & FollowersList;

type queryListResponse = ReviewListResponse &
  ProductsListResponse &
  FollowersResponse &
  FolloweesResponse;

interface useInfinityScrollProps {
  queryKey: 'review' | 'products' | 'followers' | 'followees';
  order?: string;
  productId?: string | string[];
  threshold?: ZeroToOne;
  keyword?: string;
  category?: number;
  userId?: number;
}

interface QueryParams {
  order?: string;
  userId?: number;
  category?: number;
  keyword?: string;
  cursor?: unknown;
}

export const useInfinityScroll = ({
  queryKey,
  productId,
  threshold = 0.3,
  order,
  keyword,
  category,
  userId,
}: useInfinityScrollProps) => {
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
    }
  };

  const buildQueryString = ({ order, keyword, category, cursor }: QueryParams) => {
    const queryParams: QueryParams = {};

    if (order) {
      queryParams.order = order;
    }

    if (keyword) {
      queryParams.keyword = keyword;
    }

    if (category) {
      queryParams.category = category;
    }

    if (cursor) {
      queryParams.cursor = cursor;
    }

    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return queryString ? `?${queryString}` : '';
  };

  const {
    data: getData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<queryListResponse>({
    queryKey: [queryKey, { productId, order, keyword, category, userId }],
    queryFn: async ({ pageParam: cursor = 0 }) => {
      try {
        const res = await instance.get(
          `${buildApiUrl(queryKey)}${buildQueryString({ order, keyword, category, cursor })}`,
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
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
  });

  const data = getData?.pages.flatMap((value) => value.list.map((list) => list as queryResponse));

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
