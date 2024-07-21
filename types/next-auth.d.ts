import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface SessionUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    description?: string | null;
    accessToken: string;
  }

  interface Session extends DefaultSession {
    user: SessionUser;
  }

  interface User extends DefaultUser, SessionUser { }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, SessionUser { }
}

export { }