import { useDataMutation } from '../services/common';
import { OauthRequest, OauthResponse, Config } from '../types/data';
import { AxiosError } from 'axios';
import { UseMutationOptions } from '@tanstack/react-query';

export const useRegisterOAuthApp = (
  options?: Omit<UseMutationOptions<OauthResponse, AxiosError, OauthRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = '/oauthApps';
  const mutation = useDataMutation<OauthRequest, OauthResponse>(url, method, options);

  return (data: OauthRequest) => mutation.mutate(data);
};
