'use client';

import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 중략
const Auth2Redirect = () => {
  const [code, setCode] = useState<string | null>(null);
  const router = useRouter();
  let isSuccessed = false;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      new URL(window.location.href).searchParams.get('code') &&
        setCode(new URL(window.location.href).searchParams.get('code'));
      // 1. 인가코드 추출
    }
  }, []);
  const kakaoLogin = async () => {
    // 3. 추출된 인가코드로 백엔드에 로그인 요청
    try {
      const res = await axiosInstance.get(`/usports/login/oauth2/code/kakao?code=${code}`);
      if (res.status === 200) {
        // 로그인 성공 시 로직 처리
        isSuccessed = true;
      }
    } catch (error) {
      console.log(error);
    }
    if (isSuccessed) {
      router.replace('/');
    }
  };
  useEffect(() => {
    code !== null && kakaoLogin();
    // 2. 인가코드 추출되면 kakaoLogin 로직 실행
  }, [code]);

  return null;
};

export default Auth2Redirect;
