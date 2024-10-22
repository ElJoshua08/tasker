import { NavItem } from '@/interfaces';
import { Navbar } from './_components/navbar';
import {
  HomeIcon,
  LogOutIcon,
  SettingsIcon,
  SquareCheckIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function TasksAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <main className="flex flex-row justify-start items-start h-screen w-full ">
      <Navbar
        navItems={navItems}
        header={<NavbarHeader />}
        footer={<NavbarFooter />}
      />
      {children}
    </main>
  );
}

const NavbarHeader = () => {
  return <h1>This is the navbar header</h1>;
};

const NavbarFooter = () => {
  return (
    <Button
      variant="destructive"
      className="flex flex-row gap-2 items-center justify-center w-full px-2"
    >
      Log Out
    </Button>
  );
};
