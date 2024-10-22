"use client";

import { Button } from '@/components/ui/button';
import { logout } from '@/services/auth.service';

export const NavbarFooter = async () => {
  return (
    <Button
      variant="destructive"
      className="flex flex-row gap-2 items-center justify-center w-full px-2"
      onClick={async () => await logout()}
    >
      Log Out
    </Button>
  );
};
