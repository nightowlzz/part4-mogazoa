import { useDataMutation } from '../services/common';
import {
  PostReviewRequest,
  UpdateReviewRequest,
  ReviewResponse,
  DeleteReviewResponse,
  Config,
} from '../types/data';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePostReview = (
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, PostReviewRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = '/reviews';
  const mutation = useDataMutation<PostReviewRequest, ReviewResponse>(url, method, options);
  return (data: PostReviewRequest) => mutation.mutate(data);
};

export const useUpdateReview = (
  reviewId: number,
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, UpdateReviewRequest>, 'mutationFn'>,
) => {
  const method = 'patch';
  const mutation = useDataMutation<UpdateReviewRequest, ReviewResponse>(
    `/reviews/${reviewId}`,
    method,
    options,
  );
  return (data: UpdateReviewRequest) => mutation.mutate(data);
};

export const useDeleteReview = (
  reviewId: number,
  options?: Omit<UseMutationOptions<DeleteReviewResponse, AxiosError, void>, 'mutationFn'>,
): (() => void) => {
  const method = 'delete';
  const mutation = useDataMutation<void, DeleteReviewResponse>(
    `/reviews/${reviewId}`,
    method,
    options,
  );
  return () => mutation.mutate();
};

export const useLikeReview = (
  reviewId: number,
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, void>, 'mutationFn'>,
): (() => void) => {
  const method = 'post';
  const mutation = useDataMutation<void, ReviewResponse>(
    `/reviews/${reviewId}/like`,
    method,
    options,
  );
  return () => mutation.mutate();
};

export const useUnlikeReview = (
  reviewId: number,
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, void>, 'mutationFn'>,
): (() => void) => {
  const method = 'delete';
  const mutation = useDataMutation<void, ReviewResponse>(
    `/reviews/${reviewId}/like`,
    method,
    options,
  );
  return () => mutation.mutate();
};
