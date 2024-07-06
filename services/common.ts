import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import axiosInstance from "../utils/axiosInstance";
import { handleErrorResponse } from "../utils/errorHandler";
import { HttpMethod } from '@/types/data';

interface RequestConfig<TData> {
  url: string;
  method: HttpMethod;
  data?: TData;
}

async function fetchData<TData = any, TResponse = any>(config: RequestConfig<TData>): Promise<TResponse> {
  const response = await axiosInstance(config);
  return response.data;
}

export function useDataQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(
  queryKey: readonly unknown[],
  url: string,
  params?: any,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: () => fetchData({ url, method: 'GET', data: params }),
    ...options,
  });
}

export function useDataMutation<TData = unknown, TError = unknown, TVariables extends RequestConfig<TData> = RequestConfig<TData>>(
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: fetchData,
    onError: (error) => {
      const errorMessage = handleErrorResponse(error);
      alert(errorMessage);
    },
    ...options,
  });
}
