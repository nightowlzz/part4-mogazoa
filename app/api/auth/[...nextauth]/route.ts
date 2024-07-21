/**
 * NextAuth 설정 파일
 * 
 * @description
 * 이 파일은 NextAuth를 사용한 인증 시스템의 핵심 설정을 포함합니다.
 * CredentialsProvider를 사용하여 이메일/비밀번호 기반의 인증을 구현합니다.
 * JWT 토큰과 세션 관리, 커스텀 로그인 페이지 설정 등을 포함합니다.
 * 
 * @usage
 * 이 설정은 '/api/auth/[...nextauth]' 경로에서 자동으로 사용됩니다.
 * 클라이언트에서는 NextAuth 훅을 통해 인증 기능을 사용할 수 있습니다.
 * 
 * @example
 * // 클라이언트에서 세션 사용 예시
 * import { useSession } from 'next-auth/react';
 * const { data: session } = useSession();
 * 
 * @requires next-auth
 * @requires next-auth/providers/credentials
 * @requires @/types/data
 * @requires @/utils/axiosInstance
 */

//TODO : oauth 추가 

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthResponse } from '@/types/data';
import { axiosInstance } from '@/utils/axiosInstance';

export const authOptions: NextAuthOptions = {
  /**
   * 인증 제공자 설정
   * @description CredentialsProvider를 사용하여 이메일/비밀번호 기반 인증을 구현합니다.
   */
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      /**
       * 사용자 인증 함수
       * @param credentials - 사용자가 입력한 인증 정보
       * @returns 인증된 사용자 객체 또는 null
       * @throws {Error} 인증 과정에서 발생한 오류
       */
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

  /**
   * 콜백 함수 설정
   * @description JWT 토큰 생성 및 세션 업데이트 로직을 정의합니다.
   */
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

  /**
   * 커스텀 페이지 설정
   * @description 인증 관련 커스텀 페이지의 경로를 지정합니다.
   */
  pages: {
    signIn: '/signin', // 커스텀 로그인 페이지 경로
  },

  /**
   * NextAuth 암호화 키
   * @description JWT 토큰 암호화에 사용되는 비밀 키입니다.
   * @requires 환경 변수 NEXTAUTH_SECRET이 설정되어 있어야 합니다.
   */
  secret: process.env.NEXTAUTH_SECRET,
};

// NextAuth 핸들러 생성
const handler = NextAuth(authOptions);

// API 라우트 핸들러 내보내기
export { handler as GET, handler as POST };
