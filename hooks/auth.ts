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
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, SignUpRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = '/auth/signUp';
  const mutation = useDataMutation<SignUpRequest, AuthResponse>(url, method, options);
  return (data: SignUpRequest) => mutation.mutate(data);
};

export const useSignIn = (
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, SignInRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = '/auth/signIn';
  const mutation = useDataMutation<SignInRequest, AuthResponse>(url, method, options);
  return (data: SignInRequest) => mutation.mutate(data);
};

export const useOauthSignUp = (
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, OauthSignUpRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = `/auth/oauthSignUp`;
  const mutation = useDataMutation<OauthSignUpRequest, AuthResponse>(url, method, options);
  return (data: OauthSignUpRequest) => mutation.mutate(data);
};

export const useOauthSignIn = (
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, OauthSignInRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = `/auth/oauthSignIn`;
  const mutation = useDataMutation<OauthSignInRequest, AuthResponse>(url, method, options);
  return (data: OauthSignInRequest) => mutation.mutate(data);
};
