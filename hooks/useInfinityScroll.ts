import {
  FolloweesResponse,
  FolloweesList,
  FollowersResponse,
  ProductResponse,
  FollowersList,
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
  productId: string | string[];
  queryKey: 'review' | 'product' | 'followers' | 'followed';
  queryFnUrl: string;
  sortOrder: string;
  threshold?: ZeroToOne;
}

export const useInfinityScroll = ({
  productId,
  queryKey,
  queryFnUrl,
  sortOrder,
  threshold = 0.3,
}: useInfinityScrollProps) => {
  const { ref, inView } = useInView({
    threshold: threshold,
  });
  const {
    data: getData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<queryListResponse>({
    queryKey: [queryKey, { productId, sortOrder }],
    queryFn: async ({ pageParam = null }) => {
      try {
        const res = await instance.get(`${queryFnUrl}?order=${sortOrder}&cursor=${pageParam}`);
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
