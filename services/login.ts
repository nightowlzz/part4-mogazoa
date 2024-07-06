import { useDataMutation } from './common';
import { SignUpRequest, AuthResponse, HttpMethod } from '../types/data';

interface SignUpConfig {
  method?: HttpMethod;
  Url?: string;
}

export const useSignUp = (config: SignUpConfig = {}) => {
  const {
    method = 'POST',
    Url = '/auth/signUp'
  } = config;

  const mutation = useDataMutation<SignUpRequest, AuthResponse>();

  return (body: SignUpRequest, urlParam?: string | number) => {
    const url = urlParam ? `${Url}/${urlParam}` : Url;
    return mutation.mutate({ url, method, data: body });
  };
};