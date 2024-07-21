/**
 * NextAuth 설정 옵션
 * 
 * @description
 * 이 파일은 NextAuth의 설정 옵션을 정의합니다.
 * CredentialsProvider를 사용한 인증, JWT 및 세션 콜백, 
 * 그리고 커스텀 페이지 설정을 포함합니다.
 * 
 * @requires next-auth
 * @requires next-auth/providers/credentials
 * @requires @/types/data
 * @requires @/utils/axiosInstance
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthResponse } from '@/types/data';
import { axiosInstance } from '@/utils/axiosInstance';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const { email, password } = credentials;
          const { data } = await axiosInstance.post<AuthResponse>(
            '/auth/signIn',
            { email, password }
          );

          return {
            id: data.user.id.toString(),
            email: data.user.email,
            name: data.user.nickname,
            image: data.user.image || null,
            description: data.user.description || null,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};