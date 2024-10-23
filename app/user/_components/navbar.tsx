'use client';

import { Button } from '@/components/ui/button';
import { NavItem } from '@/interfaces';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';
import { Models } from 'node-appwrite';
import { logout } from '@/services/auth.service';
import { LoaderCircleIcon, LogOutIcon } from 'lucide-react';

const WIDTHS = {
  open: '250px', // Open width (full when viewport is narrower than this)
  closed: '60px', // Closed, only icons visible.
};

export const Navbar = ({
  navItems,
  user,
}: {
  navItems: NavItem[];
  user: Models.User<Models.Preferences>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      className={cn(
        'flex flex-col items-stretch justify-start h-screen border-r border-border p-2 grow-0 shrink-0 relative',
        isOpen ? 'absolute z-50 sm:w-full sm:relative  w-60' : 'w-20'
      )}
      initial={{ width: WIDTHS.open }}
      animate={{ width: isOpen ? WIDTHS.open : WIDTHS.closed }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <header className="flex flex-row gap-2 w-full justify-center items-center">
        <Avatar className="bg-primary/50 text-2xl text-foreground flex items-center justify-center font-semibold">
          {user.name.charAt(0)}
        </Avatar>
        <motion.h1
          initial={{ scaleX: 1, display: 'block' }}
          animate={{
            scaleX: isOpen ? 1 : 0,
            display: isOpen ? 'initial' : 'none',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {user.name}
        </motion.h1>
      </header>

      <Separator className="my-2" />

      <ul className="flex flex-col gap-2 items-center justify-start w-full grow">
        {navItems.map((item) => (
          <li
            key={item.title}
            className="w-full"
          >
            <Link
              href={item.href}
              className="flex justify-center items-center w-full"
            >
              <Button
                className={cn(
                  'flex flex-row gap-2 items-center w-full h-10 px-2 p-2 transition-all duration-100 relative',
                  isOpen ? 'p-2 justify-start' : 'p-0 justify-center size-10'
                )}
                variant={pathname === item.href ? 'secondary' : 'outline'}
              >
                <div className={cn(isOpen ? 'relative' : 'absolute')}>
                  {item.icon}
                </div>
                <motion.p
                  initial={{ scaleX: 1, display: 'box' }}
                  animate={{
                    scaleX: isOpen ? 1 : 0,
                    display: isOpen ? 'inital' : 'hidden',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {item.title}
                </motion.p>
              </Button>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="w-full items-center justify-center">
        <Button
          variant="destructive"
          className="flex flex-row gap-2 items-center justify-center w-full px-2 size-10"
          onClick={async () => {
            setLogoutLoading(true);
            await logout();
          }}
        >
          {isOpen && 'Log Out'}
          {logoutLoading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <LogOutIcon />
          )}
        </Button>
      </footer>
    </motion.nav>
  );
};
