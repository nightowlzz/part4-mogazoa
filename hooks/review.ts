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
  config: Config = {},
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, PostReviewRequest>, 'mutationFn'>,
) => {
  const { method = 'post', url = '/reviews' } = config;
  const mutation = useDataMutation<PostReviewRequest, ReviewResponse>(url, method, options);
  return (data: PostReviewRequest) => mutation.mutate(data);
};

export const useUpdateReview = (
  reviewId: number,
  config: Config = {},
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, UpdateReviewRequest>, 'mutationFn'>,
) => {
  const { method = 'patch', url = '/reviews' } = config;
  const mutation = useDataMutation<UpdateReviewRequest, ReviewResponse>(
    `${url}/${reviewId}`,
    method,
    options,
  );
  return (data: UpdateReviewRequest) => mutation.mutate(data);
};

export const useDeleteReview = (
  reviewId: number,
  config: Config = {},
  options?: Omit<UseMutationOptions<DeleteReviewResponse, AxiosError, void>, 'mutationFn'>,
): (() => void) => {
  const { method = 'delete', url = '/reviews' } = config;
  const mutation = useDataMutation<void, DeleteReviewResponse>(
    `${url}/${reviewId}`,
    method,
    options,
  );
  return () => mutation.mutate();
};

export const useLikeReview = (
  reviewId: number,
  config: Config = {},
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, void>, 'mutationFn'>,
): (() => void) => {
  const { method = 'post', url = '/reviews' } = config;
  const mutation = useDataMutation<void, ReviewResponse>(
    `${url}/${reviewId}/like`,
    method,
    options,
  );
  return () => mutation.mutate();
};

export const useUnlikeReview = (
  reviewId: number,
  config: Config = {},
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, void>, 'mutationFn'>,
): (() => void) => {
  const { method = 'delete', url = '/reviews' } = config;
  const mutation = useDataMutation<void, ReviewResponse>(
    `${url}/${reviewId}/like`,
    method,
    options,
  );
  return () => mutation.mutate();
};
