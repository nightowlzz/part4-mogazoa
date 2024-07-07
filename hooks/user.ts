import { AxiosError } from 'axios';
import { useDataQuery, useDataMutation } from '../services/common';
import {
  UserResponse,
  UpdateUserRequest,
  RankedUserResponse,
  FollowersResponse,
  Config,
} from '../types/data';
import { UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';

export const useGetMyInfo = (
  config: Config = {},
  options?: Omit<
    UseQueryOptions<UserResponse, AxiosError, UserResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { url = '/users/me' } = config;
  return useDataQuery<void, UserResponse>(['myInfo'], url, undefined, options);
};

export const useUpdateMyInfo = (
  config: Config = {},
  options?: Omit<UseMutationOptions<UserResponse, AxiosError, UpdateUserRequest>, 'mutationFn'>,
) => {
  const { method = 'PATCH', url = '/users/me' } = config;
  return useDataMutation<UpdateUserRequest, UserResponse>(url, method, options);
};

export const useGetUserRanking = (
  config: Config = {},
  options?: Omit<
    UseQueryOptions<RankedUserResponse[], AxiosError, RankedUserResponse[], QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { url = '/users/ranking' } = config;
  return useDataQuery<void, RankedUserResponse[]>(['userRanking'], url, undefined, options);
};

export const useGetUserInfo = (
  userId: number,
  config: Config = {},
  options?: Omit<
    UseQueryOptions<UserResponse, AxiosError, UserResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { url = '/users' } = config;
  return useDataQuery<void, UserResponse>(
    ['userInfo', userId],
    `${url}/${userId}`,
    undefined,
    options,
  );
};

export const useGetUserFollowees = (
  userId: number,
  cursor: number | undefined,
  config: Config = {},
  options?: Omit<
    UseQueryOptions<FollowersResponse, AxiosError, FollowersResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { url = '/users' } = config;
  return useDataQuery<{ cursor?: number }, FollowersResponse>(
    ['userFollowees', userId, cursor],
    `${url}/${userId}/followees`,
    { cursor },
    options,
  );
};

export const useGetUserFollowers = (
  userId: number,
  cursor: number | undefined,
  config: Config = {},
  options?: Omit<
    UseQueryOptions<FollowersResponse, AxiosError, FollowersResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { url = '/users' } = config;
  return useDataQuery<{ cursor?: number }, FollowersResponse>(
    ['userFollowers', userId, cursor],
    `${url}/${userId}/followers`,
    { cursor },
    options,
  );
};
