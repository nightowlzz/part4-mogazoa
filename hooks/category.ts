import { AxiosError } from 'axios';
import { useDataQuery } from '../services/common';
import { CategoryResponse } from '../types/data';
import { UseQueryOptions, QueryKey } from '@tanstack/react-query';

export const useGetCategories = (
  options?: Omit<
    UseQueryOptions<CategoryResponse[], AxiosError, CategoryResponse[], QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const url = '/categories';
  return useDataQuery<CategoryResponse[]>(['categories'], url, options);
};
