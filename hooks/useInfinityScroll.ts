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
  pageParam?: unknown;
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

  const buildQueryString = ({ order, keyword, category, pageParam }: QueryParams) => {
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

    if (pageParam) {
      queryParams.pageParam = pageParam;
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
    queryFn: async ({ pageParam = null }) => {
      try {
        const res = await instance.get(
          `${buildApiUrl(queryKey)}${buildQueryString({ order, keyword, category, pageParam })}`,
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
