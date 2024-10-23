import { NavItem } from '@/interfaces';
import { Navbar } from './_components/navbar';
import { HomeIcon, SettingsIcon, SquareCheckIcon } from 'lucide-react';
import { NavbarFooter } from './_components/nav-footer';
import { ProtectedRoute } from '@/components/protected-route';
import { Models } from 'node-appwrite';
import { getUser } from '@/services/auth.service';
import { Avatar } from '@/components/ui/avatar';

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
          navItems={navItems}
          header={<NavbarHeader user={user} />}
          footer={<NavbarFooter />}
        />
        {children}
      </main>
    </ProtectedRoute>
  );
}

const NavbarHeader = ({
  user,
}: {
  user: Models.User<Models.Preferences> | null;
}) => {
  return user ? (
    <div className="flex flex-row gap-2 w-full justify-start items-center">
      <Avatar className="bg-foreground/50 text-xl text-foreground flex items-center justify-center font-extrabold">
        {user.name.charAt(0)}
      </Avatar>
      <h1 className="text-lg font-semibold">{user.name}</h1>
    </div>
  ) : null;
};
