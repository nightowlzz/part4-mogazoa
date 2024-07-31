'use client';

import { useSession } from 'next-auth/react';

export default function Page() {
  const user = useSession();
  return <>{JSON.stringify(user)}</>;
}
