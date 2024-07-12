import { AxiosError } from 'axios';
import { useDataQuery, useDataMutation } from '../services/common';
import {
  UserResponse,
  UpdateUserRequest,
  RankedUserResponse,
  FollowersResponse,
  ProductsListResponse,
} from '../types/data';
import { UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';

export const useGetMyInfo = (
  options?: Omit<
    UseQueryOptions<UserResponse, AxiosError, UserResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const url = '/users/me';
  return useDataQuery<void, UserResponse>(['myInfo'], url, undefined, options);
};

export const useUpdateMyInfo = (
  options?: Omit<UseMutationOptions<UserResponse, AxiosError, UpdateUserRequest>, 'mutationFn'>,
) => {
  const method = 'patch';
  const url = '/users/me';
  return useDataMutation<UpdateUserRequest, UserResponse>(url, method, options);
};

export const useGetUserRanking = (
  options?: Omit<
    UseQueryOptions<RankedUserResponse[], AxiosError, RankedUserResponse[], QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const url = '/users/ranking';
  return useDataQuery<void, RankedUserResponse[]>(['userRanking'], url, undefined, options);
};

export const useGetUserInfo = (
  userId: number,
  options?: Omit<
    UseQueryOptions<UserResponse, AxiosError, UserResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<void, UserResponse>(
    ['userInfo', userId],
    `/users/${userId}`,
    undefined,
    options,
  );
};

export const useGetUserCreatedProducts = (
  userId: number,
  params?: { cursor: number | undefined },
  options?: Omit<
    UseQueryOptions<ProductsListResponse, AxiosError, ProductsListResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<void, ProductsListResponse>(
    ['userCreatedProducts', userId],
    `/users/${userId}/created-products`,
    undefined,
    options,
    params,
  );
};

export const useGetUserReviewedProducts = (
  userId: number,
  params?: { cursor: number | undefined },
  options?: Omit<
    UseQueryOptions<ProductsListResponse, AxiosError, ProductsListResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<void, ProductsListResponse>(
    ['userReviewedProducts', userId],
    `/users/${userId}/reviewed-products`,
    undefined,
    options,
    params,
  );
};

export const useGetUserFavoriteProducts = (
  userId: number,
  params?: { cursor: number | undefined },
  options?: Omit<
    UseQueryOptions<ProductsListResponse, AxiosError, ProductsListResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<void, ProductsListResponse>(
    ['userFavoriteProducts', userId],
    `/users/${userId}/favorite-products`,
    undefined,
    options,
    params,
  );
};

export const useGetUserFollowees = (
  userId: number,
  cursor?: number | undefined,
  options?: Omit<
    UseQueryOptions<FollowersResponse, AxiosError, FollowersResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<{ cursor?: number }, FollowersResponse>(
    ['userFollowees', userId, cursor],
    `/users/${userId}/followees`,
    { cursor },
    options,
  );
};

export const useGetUserFollowers = (
  userId: number,
  cursor?: number | undefined,
  options?: Omit<
    UseQueryOptions<FollowersResponse, AxiosError, FollowersResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<{ cursor?: number }, FollowersResponse>(
    ['userFollowers', userId, cursor],
    `/users/${userId}/followers`,
    { cursor },
    options,
  );
};
