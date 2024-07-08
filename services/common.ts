import { handleErrorResponse } from '@/utils/errorHandler';
import {
  UseMutationOptions,
  useQuery,
  useMutation,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import { HttpMethod, Params } from '@/types/data';

export function useDataQuery<TData, TResponse>(
  queryKey: QueryKey,
  url: string,
  data?: TData,
  options?: Omit<
    UseQueryOptions<TResponse, AxiosError, TResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
  params?: Params,
) {
  return useQuery<TResponse, AxiosError, TResponse, QueryKey>({
    queryKey,
    queryFn: () => fetchData<TData, TResponse>({ url, method: 'get', data, params }),
    ...options,
  });
}

export function useDataMutation<TData, TResponse>(
  url: string,
  method: HttpMethod,
  options?: Omit<UseMutationOptions<TResponse, AxiosError, TData>, 'mutationFn'> & {
    headers?: Record<string, string>;
  },
) {
  return useMutation<TResponse, AxiosError, TData>({
    mutationFn: (data: TData | null) =>
      fetchData<TData, TResponse>({ url, method, data, headers: options?.headers }),
    onError: (error) => {
      const errorMessage = handleErrorResponse(error);
      alert(errorMessage);
    },
    ...options,
  });
}

async function fetchData<TData, TResponse>({
  url,
  data,
  method,
  params,
  headers,
}: {
  url: string;
  method: HttpMethod;
  data?: TData | null;
  params?: Params;
  headers?: Record<string, string>;
}): Promise<TResponse> {
  const config: AxiosRequestConfig = {
    method,
    url,
    params,
    headers,
  };

  if (method !== 'get') {
    if (headers?.['Content-Type'] === 'multipart/form-data') {
      config.data = data;
    } else {
      config.data = data;
    }
  }

  const response = await axiosInstance(config);
  return response.data;
}
