import { AxiosError } from 'axios';
import { useDataMutation } from '../services/common';
import { FollowRequest, FollowResponse, Config } from '../types/data';
import { UseMutationOptions } from '@tanstack/react-query';

export const useFollowUser = (
  config: Config = {},
  options?: Omit<UseMutationOptions<FollowResponse, AxiosError, FollowRequest>, 'mutationFn'>,
) => {
  const { method = 'POST', url = '/follow' } = config;
  const mutation = useDataMutation<FollowRequest, FollowResponse>(url, method, options);
  return (data: FollowRequest) => mutation.mutate(data);
};

export const useUnfollowUser = (
  config: Config = {},
  options?: Omit<UseMutationOptions<FollowResponse, AxiosError, FollowRequest>, 'mutationFn'>,
) => {
  const { method = 'DELETE', url = '/follow' } = config;
  const mutation = useDataMutation<FollowRequest, FollowResponse>(url, method, options);
  return (data: FollowRequest) => mutation.mutate(data);
};
