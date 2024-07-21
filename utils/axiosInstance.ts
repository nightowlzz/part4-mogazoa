/**
 * Axios 인스턴스 설정 및 인터셉터
 * 
 * @description
 * 이 파일은 애플리케이션 전체에서 사용될 Axios 인스턴스를 설정합니다.
 * 기본 URL, 헤더 설정, 그리고 요청 인터셉터를 포함합니다.
 * NextAuth 세션의 액세스 토큰을 자동으로 요청 헤더에 추가합니다.
 * 
 * @usage
 * 이 axiosInstance를 import하여 API 요청을 보낼 때 사용합니다.
 * 
 */

import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const teamId = process.env.NEXT_PUBLIC_TEAM_NICKNAME;

/**
 * Axios 인스턴스 생성
 * 
 * @description
 * 기본 URL과 공통 헤더를 설정한 Axios 인스턴스를 생성합니다.
 * 
 * @type {import('axios').AxiosInstance}
 */
export const axiosInstance = axios.create({
  baseURL: `${apiBaseUrl}/${teamId}`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * 요청 인터셉터
 * 
 * @description
 * 모든 요청에 대해 NextAuth 세션의 액세스 토큰을 Authorization 헤더에 추가합니다.
 * 이 인터셉터는 클라이언트 사이드에서만 작동합니다.
 * 
 */
axiosInstance.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const session = await getSession();
    if (session?.user?.accessToken) {
      config.headers['Authorization'] = `Bearer ${session.user.accessToken}`;
    }
  }
  return config;
});

export default axiosInstance;