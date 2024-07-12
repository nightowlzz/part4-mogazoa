import axios, { AxiosInstance } from 'axios';
import { getCookie } from '@/utils/cookieUtils';
import { AUTH } from '@/constants/auth';

const teamNickname = process.env.NEXT_PUBLIC_TEAM_NICKNAME;

const instance: AxiosInstance = axios.create({
  baseURL: `/api/${teamNickname}`,
});

instance.interceptors.request.use((config) => {
  const token = getCookie(AUTH.ACCESS_TOKEN);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
