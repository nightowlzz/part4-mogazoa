import { AxiosError } from 'axios';
import { useDataMutation } from '../services/common';
import {
  SignUpRequest,
  SignInRequest,
  OauthSignUpRequest,
  OauthSignInRequest,
  AuthResponse,
  Config,
} from '../types/data';
import { UseMutationOptions } from '@tanstack/react-query';

export const useSignUp = (
  config: Config = {},
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, SignUpRequest>, 'mutationFn'>,
) => {
  const { method = 'POST', url = '/auth/signUp' } = config;
  const mutation = useDataMutation<SignUpRequest, AuthResponse>(url, method, options);
  return (data: SignUpRequest) => mutation.mutate(data);
};

export const useSignIn = (
  config: Config = {},
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, SignInRequest>, 'mutationFn'>,
) => {
  const { method = 'POST', url = '/auth/signIn' } = config;
  const mutation = useDataMutation<SignInRequest, AuthResponse>(url, method, options);
  return (data: SignInRequest) => mutation.mutate(data);
};

export const useOauthSignUp = (
  provider: string,
  config: Config = {},
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, OauthSignUpRequest>, 'mutationFn'>,
) => {
  const { method = 'POST', url = '/auth/signUp' } = config;
  const mutation = useDataMutation<OauthSignUpRequest, AuthResponse>(
    `${url}/${provider}`,
    method,
    options,
  );
  return (data: OauthSignUpRequest) => mutation.mutate(data);
};

export const useOauthSignIn = (
  provider: string,
  config: Config = {},
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, OauthSignInRequest>, 'mutationFn'>,
) => {
  const { method = 'POST', url = '/auth/signIn' } = config;
  const mutation = useDataMutation<OauthSignInRequest, AuthResponse>(
    `${url}/${provider}`,
    method,
    options,
  );
  return (data: OauthSignInRequest) => mutation.mutate(data);
};
