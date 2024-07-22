/**
 * useAuth 커스텀 훅
 * 
 * @description
 * 이 훅은 NextAuth와 Zustand를 결합하여 인증 상태를 관리합니다.
 * NextAuth의 세션 정보를 Zustand 스토어와 동기화하고,
 * 로그인 및 로그아웃 기능을 제공합니다.
 * 
 * @usage
 * 이 훅을 사용하여 컴포넌트에서 인증 상태를 확인하고 관리할 수 있습니다.
 * 
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 * if (isAuthenticated) {
 *   console.log('Logged in as', user.name);
 * }
 * 
 * @requires next-auth/react
 * @requires @/store/authStore
 */

import { useSession, signIn, signOut } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const { setUser, setAccessToken, clearAuth } = useAuthStore();

  /**
   * NextAuth 세션과 Zustand 스토어 동기화
   * 
   * @description
   * 세션 정보가 변경될 때마다 Zustand 스토어를 업데이트합니다.
   * 세션이 없으면 스토어를 초기화합니다.
   */
  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image || null,
        description: session.user.description || null,
      });
      setAccessToken(session.user.accessToken);
    } else {
      clearAuth();
    }
  }, [session, setUser, setAccessToken, clearAuth]);

  /**
   * 로그인 함수
   * 
   * @description NextAuth의 signIn 함수를 사용하여 로그인을 수행합니다.
   * 
   * @param {string} email - 사용자 이메일
   * @param {string} password - 사용자 비밀번호
   * @returns {Promise<SignInResponse | undefined>} 로그인 결과
   */
  const login = async (email: string, password: string) => {
    return signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  };

  /**
   * 로그아웃 함수
   * 
   * @description
   * NextAuth의 signOut 함수를 호출하고, Zustand 스토어를 초기화합니다.
   * 
   * @returns {Promise<void>}
   */
  const logout = async () => {
    await signOut({ redirect: false });
    clearAuth();
  };

  return {
    /**
     * 현재 인증된 사용자 정보
     * @type {User | null}
     */
    user: useAuthStore((state) => state.user),

    /**
     * 현재 액세스 토큰
     * @type {string | null}
     */
    accessToken: useAuthStore((state) => state.accessToken),

    /**
     * 인증 상태
     * @type {boolean}
     */
    isAuthenticated: status === 'authenticated',

    /**
     * 로딩 상태
     * @type {boolean}
     */
    isLoading: status === 'loading',

    /**
     * 로그인 함수
     * @type {(email: string, password: string) => Promise<SignInResponse | undefined>}
     */
    login,

    /**
     * 로그아웃 함수
     * @type {() => Promise<void>}
     */
    logout,
  };
};