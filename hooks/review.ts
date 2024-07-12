import { useDataMutation } from '../services/common';
import {
  PostReviewRequest,
  UpdateReviewRequest,
  ReviewResponse,
  DeleteReviewResponse,
} from '../types/data';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePostReview = (
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, PostReviewRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = '/reviews';
  return useDataMutation<PostReviewRequest, ReviewResponse>(url, method, options);
};

export const useUpdateReview = (
  reviewId: number,
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, UpdateReviewRequest>, 'mutationFn'>,
) => {
  const method = 'patch';
  return useDataMutation<UpdateReviewRequest, ReviewResponse>(
    `/reviews/${reviewId}`,
    method,
    options,
  );
};

export const useDeleteReview = (
  reviewId: number,
  options?: Omit<UseMutationOptions<DeleteReviewResponse, AxiosError, void>, 'mutationFn'>,
) => {
  const method = 'delete';
  return useDataMutation<void, DeleteReviewResponse>(`/reviews/${reviewId}`, method, options);
};

export const useLikeReview = (
  reviewId: number,
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, void>, 'mutationFn'>,
) => {
  const method = 'post';
  return useDataMutation<void, ReviewResponse>(`/reviews/${reviewId}/like`, method, options);
};

export const useUnlikeReview = (
  reviewId: number,
  options?: Omit<UseMutationOptions<ReviewResponse, AxiosError, void>, 'mutationFn'>,
) => {
  const method = 'delete';
  return useDataMutation<void, ReviewResponse>(`/reviews/${reviewId}/like`, method, options);
};
