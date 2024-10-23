'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export const NavbarFooter = () => {
  const router = useRouter();

  const handleClick = async () => {
    const success = await logout();
    if (success) {
      router.push('/login');
    }
  };

  return (
    <Button
      variant="destructive"
      className="flex flex-row gap-2 items-center justify-center w-full px-2"
      onClick={handleClick}
    >
      Log Out
    </Button>
  );
};
