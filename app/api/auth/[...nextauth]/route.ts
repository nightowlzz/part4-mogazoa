import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SignInRequest, AuthResponse } from '@/types/data';
import axiosInstance from '@/utils/axiosInstance';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('123')
        if (!credentials) return null;

        try {
          const { data } = await axiosInstance.post<AuthResponse>('/auth/signIn', credentials as SignInRequest);
          console.log(data)
          return {
            id: data.user.id.toString(),
            email: data.user.email,
            name: data.user.nickname,
            image: data.user.image,
            accessToken: data.accessToken,
          };
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(user)
      console.log(token)
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      console.log(session)
      console.log(token)
      session.user.accessToken = token.accessToken;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/signin',
  }
};

export const handler = NextAuth(authOptions);
