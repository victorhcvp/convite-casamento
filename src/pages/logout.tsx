import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/auth';

export function Logout() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push('/');
  }, [logout, router]);

  return (
    <div>
    </div>
  );
}

export default Logout;