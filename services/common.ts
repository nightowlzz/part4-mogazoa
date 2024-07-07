import { handleErrorResponse } from '@/utils/errorHandler';
import {
  UseMutationOptions,
  useQuery,
  useMutation,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import { HttpMethod } from '@/types/data';

export function useDataQuery<TData, TResponse>(
  queryKey: QueryKey,
  url: string,
  data?: TData,
  options?: Omit<
    UseQueryOptions<TResponse, AxiosError, TResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery<TResponse, AxiosError, TResponse, QueryKey>({
    queryKey,
    queryFn: () => fetchData<TData, TResponse>({ url, method: 'GET', data }),
    ...options,
  });
}

export function useDataMutation<TData, TResponse>(
  url: string,
  method: HttpMethod,
  options?: Omit<UseMutationOptions<TResponse, AxiosError, TData>, 'mutationFn'>,
) {
  return useMutation<TResponse, AxiosError, TData>({
    mutationFn: (data: TData | null) => fetchData<TData, TResponse>({ url, method, data }),
    onError: (error) => {
      const errorMessage = handleErrorResponse(error);
      alert(errorMessage);
    },
    ...options,
  });
}

async function fetchData<TData, TResponse>({
  url,
  method,
  data,
}: {
  url: string;
  method: HttpMethod;
  data?: TData | null;
}): Promise<TResponse> {
  const response = await axiosInstance.request({ url, method, data });
  return response.data;
}
