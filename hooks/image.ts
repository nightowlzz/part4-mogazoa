import { useDataMutation } from '../services/common';
import { UploadImageResponse } from '../types/data';
import { AxiosError } from 'axios';
import { UseMutationOptions } from '@tanstack/react-query';

export const useUploadImage = (
  options?: Omit<UseMutationOptions<UploadImageResponse, AxiosError, FormData>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = '/images/upload';
  const mutation = useDataMutation<FormData, UploadImageResponse>(url, method, {
    ...options,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return mutation;
};
