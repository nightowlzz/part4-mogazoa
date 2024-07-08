import axios from 'axios';
import { getCookie, setCookie } from '@/utils/cookieUtils';

const instance = axios.create({
  baseURL: '/api/proxy',
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = getCookie('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.accessToken) {
      setCookie('accessToken', response.data.accessToken, 7);
      console.log('AccessToken set from response');
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
