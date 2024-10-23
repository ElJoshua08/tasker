import { NavItem } from '@/interfaces';
import { Navbar } from './_components/navbar';
import { HomeIcon, SettingsIcon, SquareCheckIcon } from 'lucide-react';
import { ProtectedRoute } from '@/components/protected-route';
import { getUser } from '@/services/auth.service';

export default async function TasksAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  const navItems = [
    {
      title: 'Home',
      href: '/user',
      icon: (
        <HomeIcon
          size={22}
          className="text-foreground/80"
        />
      ),
    },
    {
      title: 'Tasks',
      href: '/user/tasks',
      icon: (
        <SquareCheckIcon
          size={22}
          className="text-foreground/80"
        />
      ),
    },
    {
      title: 'Settings',
      href: '/user/settings',
      icon: (
        <SettingsIcon
          size={22}
          className="text-foreground/80"
        />
      ),
    },
  ] as NavItem[];

  return (
    <ProtectedRoute
      role="logged-in"
      redirectTo="/login"
    >
      <main className="flex flex-row justify-start items-start h-screen w-full ">
        <Navbar
          user={user}
          navItems={navItems}
        />
        {children}
      </main>
    </ProtectedRoute>
  );
}
