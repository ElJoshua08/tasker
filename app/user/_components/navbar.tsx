'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/interfaces';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';
import { Models } from 'node-appwrite';
import {
  ChevronsRightIcon,
  HomeIcon,
  SettingsIcon,
  SquareCheckIcon,
} from 'lucide-react';

const MotionButton = motion(Button);

const WIDTHS = {
  open: 250,
  closed: 60,
};

interface NavbarProps {
  user: Models.User<Models.Preferences> | null;
}

export const Navbar: FC<NavbarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (!user) return null;

  const navItems = [
    {
      title: 'Home',
      href: '/user',
      Icon: HomeIcon,
    },
    {
      title: 'Tasks',
      href: '/user/tasks',
      Icon: SquareCheckIcon,
    },
    {
      title: 'Settings',
      href: '/user/settings',
      Icon: SettingsIcon,
    },
  ] as NavItem[];

  return (
    <motion.nav
      layout
      className={cn(
        'bg-background/50 backdrop-blur-xl flex flex-col items-stretch justify-start h-screen border-r border-border p-2 grow-0 shrink-0 relative'
      )}
      style={{
        width: isOpen ? '250px' : '60px',
      }}
    >
      <motion.header
        layout
        id="header"
        className={cn('flex flex-row gap-2 w-full items-center justify-start')}
      >
        <motion.div layout>
          <Avatar className="bg-primary/50 text-2xl text-foreground flex items-center justify-center font-semibold">
            {user.name.charAt(0)}
          </Avatar>
        </motion.div>
        {isOpen && (
          <motion.h1
            layout
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.125 }}
          >
            {user.name}
          </motion.h1>
        )}
      </motion.header>

      <Separator className="my-2" />

      <ul className="flex flex-col gap-2 items-center justify-start w-full grow">
        {navItems.map((item, index) => (
          <li
            key={item.title}
            className="w-full"
          >
            <Link
              href={item.href}
              className="w-full"
            >
              <MotionButton
                layout
                transition={{ delay: 0.005 * (index + 1) }}
                className="w-full h-10 items-center justify-start px-1"
                variant={pathname === item.href ? 'default' : 'outline'}
              >
                <motion.div
                  layout
                  className="h-full w-10 text-2xl flex items-center justify-center "
                >
                  <item.Icon />
                </motion.div>
                {isOpen && (
                  <motion.p
                    layout
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.125 * (index + 1) }}
                    className={cn(isOpen ? 'inline-block' : 'hidden')}
                  >
                    {item.title}
                  </motion.p>
                )}
              </MotionButton>
            </Link>
          </li>
        ))}
      </ul>

      <motion.footer
        className="w-full items-center  justify-start"
        layout
      >
        <MotionButton
          layout
          className={cn(
            'flex items-center justify-start gap-2 px-2  w-full h-10'
          )}
          size="icon"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div layout>
            <ChevronsRightIcon
              className="transition-all duration-200"
              style={{
                rotate: isOpen ? '180deg' : '0deg',
              }}
            />
          </motion.div>
          {isOpen && (
            <motion.p
              layout
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              {isOpen && 'Hide'}
            </motion.p>
          )}
        </MotionButton>
      </motion.footer>
    </motion.nav>
  );
};
