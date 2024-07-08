import { AxiosError } from 'axios';
import { useDataQuery } from '../services/common';
import { CategoryResponse, Config } from '../types/data';
import { UseQueryOptions, QueryKey } from '@tanstack/react-query';

export const useGetCategories = (
  config: Config = {},
  options?: Omit<
    UseQueryOptions<CategoryResponse[], AxiosError, CategoryResponse[], QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { url = '/categories' } = config;
  return useDataQuery<undefined, CategoryResponse[]>(['categories'], url, undefined, options);
};
