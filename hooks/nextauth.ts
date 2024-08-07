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

export const useAuth = () => {
  const { data: session, status } = useSession();

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
  };

  return {
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
