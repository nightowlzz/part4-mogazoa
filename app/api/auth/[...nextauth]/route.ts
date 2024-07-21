/**
 * NextAuth API Route Handler
 * 
 * @description
 * 이 파일은 NextAuth의 API 라우트 핸들러를 정의합니다.
 * GET 및 POST 요청을 처리하며, NextAuth의 핵심 기능을 제공합니다.
 * 
 * @requires next-auth
 * @requires ./auth-options
 */

import NextAuth from 'next-auth';
import { authOptions } from './auth-options';

/**
 * NextAuth 핸들러
 * @type {import('next-auth').NextAuthHandler}
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };