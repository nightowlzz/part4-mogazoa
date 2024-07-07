import { useDataMutation } from '../services/common';
import { UploadImageResponse, Config } from '../types/data';
import { AxiosError } from 'axios';
import { UseMutationOptions } from '@tanstack/react-query';

export const useUploadImage = (
  config: Config = {},
  options?: Omit<UseMutationOptions<UploadImageResponse, AxiosError, FormData>, 'mutationFn'>,
) => {
  const { method = 'POST', url = '/images/upload' } = config;
  const mutation = useDataMutation<FormData, UploadImageResponse>(url, method, options);
  return (data: FormData) => mutation.mutate(data);
};
