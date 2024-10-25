'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/services/auth.service';

export default function UserSettingsPage() {
  return (
    <div>
      <Button onClick={async () => await logout()}>Logout</Button>
    </div>
  );
}
