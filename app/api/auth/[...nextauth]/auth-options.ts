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
          const { data } = await axiosInstance.post<AuthResponse>('/auth/signIn', {
            email,
            password,
          });

          return {
            id: data.user.id.toString(),
            email: data.user.email,
            name: data.user.nickname,
            image: data.user.image || null,
            description: data.user.description || null,
            accessToken: data.accessToken,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.description = user.description;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        image: token.image as string | null,
        description: token.description as string | null,
        accessToken: token.accessToken as string,
      };
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
