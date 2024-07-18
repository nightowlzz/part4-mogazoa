'use client';

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import React, { ReactNode } from 'react';

export function Provider({ children, session }: { children: ReactNode; session: Session | null }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
