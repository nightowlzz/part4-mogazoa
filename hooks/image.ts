import { useDataMutation } from '../services/common';
import { UploadImageResponse, Config } from '../types/data';
import { AxiosError } from 'axios';
import { UseMutationOptions } from '@tanstack/react-query';

type UploadImageFunction = (data: FormData) => Promise<UploadImageResponse>;

export const useUploadImage = (
  config: Config = {},
  options?: Omit<UseMutationOptions<UploadImageResponse, AxiosError, FormData>, 'mutationFn'>,
): UploadImageFunction => {
  const { method = 'post', url = '/images/upload' } = config;
  const mutation = useDataMutation<FormData, UploadImageResponse>(url, method, {
    ...options,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return (data: FormData) => mutation.mutateAsync(data);
};
