import { useDataMutation } from '../services/common';
import { UploadImageResponse } from '../types/data';
import { AxiosError } from 'axios';
import { UseMutationOptions } from '@tanstack/react-query';

type UploadImageFunction = (data: FormData) => Promise<UploadImageResponse>;

export const useUploadImage = (
  options?: Omit<UseMutationOptions<UploadImageResponse, AxiosError, FormData>, 'mutationFn'>,
): UploadImageFunction => {
  const method = 'post';
  const url = '/images/upload';
  const mutation = useDataMutation<FormData, UploadImageResponse>(url, method, {
    ...options,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return (data: FormData) => mutation.mutateAsync(data);
};
