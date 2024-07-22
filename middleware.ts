import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * NextAuth 미들웨어
 * 
 * @description
 * - 보호된 라우트에 대한 인증 검사
 * - 인증된 사용자의 인증 페이지 접근 제한
 * 
 */

//TODO : 하드코딩되어있는 주소값들을 상수로 바꾸기.
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/user', '/compare'];
  const authRoutes = ['/signin', '/signup'];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }

  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};