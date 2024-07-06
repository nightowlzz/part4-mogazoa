'use client';

import React from 'react';
import { useSignUp } from '@/services/login';
import { SignUpRequest } from '@/types/data';

const MyPageComponent = () => {
  const signUp = useSignUp();

  const signUpData: SignUpRequest = {
    email: 'test1231232@naver.com',
    nickname: '저는새로운유저입니다.',
    password: '1248128421',
    passwordConfirmation: '1248128421',
  };

  const handleButtonClick = () => {
    signUp(signUpData);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>회원가입</button>
    </div>
  );
};

export default MyPageComponent;
