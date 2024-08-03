import { AxiosError } from 'axios';
import { useDataMutation } from '../services/common';
import {
  SignUpRequest,
  SignInRequest,
  OauthSignUpRequest,
  OauthSignInRequest,
  AuthResponse,
} from '../types/data';
import { UseMutationOptions } from '@tanstack/react-query';

export const useSignUp = (
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, SignUpRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = '/auth/signUp';
  return useDataMutation<SignUpRequest, AuthResponse>(url, method, options);
};

export const useSignIn = (
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, SignInRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = '/auth/signIn';
  return useDataMutation<SignInRequest, AuthResponse>(url, method, options);
};

export const useOauthSignUp = (
  provider: 'google' | 'kakao',
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, OauthSignUpRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = `/auth/SignUp/${provider}`;
  return useDataMutation<OauthSignUpRequest, AuthResponse>(url, method, options);
};

export const useOauthSignIn = (
  provider: 'google' | 'kakao',
  options?: Omit<UseMutationOptions<AuthResponse, AxiosError, OauthSignInRequest>, 'mutationFn'>,
) => {
  const method = 'post';
  const url = `/auth/SignIn/${provider}`;
  return useDataMutation<OauthSignInRequest, AuthResponse>(url, method, options);
};
