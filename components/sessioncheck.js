import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SessionCheck() {
  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem('email');
    if (!session) {
      router.push('/login');
    }
  });

  return null;
}
