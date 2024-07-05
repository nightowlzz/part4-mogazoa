import { useQuery, useMutation } from 'react-query';
import axiosInstance from "../utils/axiosInstance";
import { handleErrorResponse } from "../utils/errorHandler";

interface RequestConfig<TData> {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  data?: TData;
}

async function fetchData<TData = any, TResponse = any>({
  url,
  method,
  data
}: RequestConfig<TData>): Promise<TResponse> {
  const response = await axiosInstance({ url, method, data });
  return response.data;
}

export function useDataQuery<TParams = void, TResponse = any>(
  queryKey: readonly unknown[],
  url: string,
  params?: TParams
) {
  return useQuery({
    queryKey,
    queryFn: () => fetchData<TParams, TResponse>({
      url,
      method: 'GET',
      data: params
    }),
    onError: (error) => {
      const errorMessage = handleErrorResponse(error);
      alert(errorMessage);
    },
  });
}

export function useDataMutation<TData = any, TResponse = any>() {
  return useMutation({
    mutationFn: (config: RequestConfig<TData>) =>
      fetchData<TData, TResponse>(config),
    onError: (error) => {
      const errorMessage = handleErrorResponse(error);
      alert(errorMessage);
    },
  });
}
