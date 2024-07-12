import { useDataMutation } from '../services/common';
import { OauthRequest, OauthResponse } from '../types/data';
import { AxiosError } from 'axios';
import { UseMutationOptions } from '@tanstack/react-query';

export const useRegisterOAuthApp = (
  options?: Omit<UseMutationOptions<OauthResponse, AxiosError, OauthRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = '/oauthApps';
  return useDataMutation<OauthRequest, OauthResponse>(url, method, options);
};
