import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

const teamNickname = process.env.NEXT_PUBLIC_TEAM_NICKNAME;

const instance: AxiosInstance = axios.create({
  baseURL: `/api/${teamNickname}`,
});

export default instance;