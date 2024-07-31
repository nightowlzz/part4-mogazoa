import { AxiosError } from 'axios';
import { useDataQuery, useDataMutation } from '../services/common';
import {
  UserResponse,
  UpdateUserRequest,
  RankedUserResponse,
  FolloweesResponse,
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
  return useDataQuery<UserResponse>(['myInfo'], url, options);
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
  return useDataQuery<RankedUserResponse[]>(['userRanking'], url, options);
};

export const useGetUserInfo = (
  userId: number,
  options?: Omit<
    UseQueryOptions<UserResponse, AxiosError, UserResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<UserResponse>(['userInfo', userId], `/users/${userId}`, options);
};

export const useGetUserCreatedProducts = (
  userId: number,
  params?: { cursor: number | undefined },
  options?: Omit<
    UseQueryOptions<ProductsListResponse, AxiosError, ProductsListResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<ProductsListResponse>(
    ['userCreatedProducts', userId],
    `/users/${userId}/created-products`,
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
  return useDataQuery<ProductsListResponse>(
    ['userReviewedProducts', userId],
    `/users/${userId}/reviewed-products`,
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
  return useDataQuery<ProductsListResponse>(
    ['userFavoriteProducts', userId],
    `/users/${userId}/favorite-products`,
    options,
    params,
  );
};

export const useGetUserFollowees = (
  userId: number,
  params?: { cursor: number | undefined },
  options?: Omit<
    UseQueryOptions<FolloweesResponse, AxiosError, FolloweesResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<FolloweesResponse>(
    ['userFollowees', userId],
    `/users/${userId}/followees`,
    options,
    params,
  );
};

export const useGetUserFollowers = (
  userId: number,
  params?: { cursor: number | undefined },
  options?: Omit<
    UseQueryOptions<FollowersResponse, AxiosError, FollowersResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<FollowersResponse>(
    ['userFollowers', userId, params?.cursor],
    `/users/${userId}/followers`,
    options,
    params,
  );
};
