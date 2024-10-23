'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/user');
    }, 1000);
  }, []);

  return <div>Please wait you will be redirected shortly</div>;
}
