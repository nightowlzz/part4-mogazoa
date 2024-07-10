import { AxiosError } from 'axios';
import { useDataMutation } from '../services/common';
import { FollowRequest, FollowResponse } from '../types/data';
import { UseMutationOptions } from '@tanstack/react-query';

export const useFollowUser = (
  options?: Omit<UseMutationOptions<FollowResponse, AxiosError, FollowRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = '/follow';
  const mutation = useDataMutation<FollowRequest, FollowResponse>(url, method, options);
  return (data: FollowRequest) => mutation.mutate(data);
};

export const useUnFollowUser = (
  options?: Omit<UseMutationOptions<FollowResponse, AxiosError, FollowRequest>, 'mutationFn'>,
) => {
  const method = 'delete';
  const url = '/follow';
  const mutation = useDataMutation<FollowRequest, FollowResponse>(url, method, options);
  return (data: FollowRequest) => mutation.mutate(data);
};
