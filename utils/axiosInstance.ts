import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

const teamNickname = process.env.NEXT_PUBLIC_TEAM_NICKNAME;

const instance: AxiosInstance = axios.create({
  baseURL: `/api/${teamNickname}`,
});

instance.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.user?.accessToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;