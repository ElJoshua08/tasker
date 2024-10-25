'use client';

import { Button } from '@/components/ui/button';
import { NavItem } from '@/interfaces';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';
import { Models } from 'node-appwrite';
import { ChevronsRightIcon } from 'lucide-react';

const WIDTHS = {
  open: 250,
  closed: 60,
};

export const Navbar = ({
  navItems,
  user,
}: {
  navItems: NavItem[];
  user: Models.User<Models.Preferences> | null;
}) => {
  const [scope, animate] = useAnimate();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (!user) return null;

  return (
    <motion.nav
      ref={scope}
      className={cn(
        'bg-background/50 backdrop-blur-xl flex flex-col items-stretch justify-start h-screen border-r border-border p-2 grow-0 shrink-0 relative'
      )}
    >
      <header
        className={cn('flex flex-row gap-2 w-full items-center justify-start')}
      >
        <Avatar className="bg-primary/50 text-2xl text-foreground flex items-center justify-center font-semibold">
          {user.name.charAt(0)}
        </Avatar>
        <motion.h1
          initial={{ scaleX: 1, display: 'block' }}
          animate={{
            scaleX: isOpen ? 1 : 0,
            transformOrigin: 'left',
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
            className="w-full flex justify-center items-center"
          >
            <Link
              href={item.href}
              className={cn(
                'flex justify-start items-center',
                isOpen ? 'w-full' : 'w-10'
              )}
            >
              <Button
                className={cn(
                  'flex flex-row w-full h-10 justify-start gap-2 items-center p-2 transition-transform duration-200',
                  { 'size-10': !isOpen }
                )}
                variant={pathname === item.href ? 'secondary' : 'outline'}
              >
                <span
                  className={cn('shrink-0', {
                    'h-full w-full items-center justify-center flex': !isOpen,
                  })}
                >
                  {item.icon}
                </span>
                <p className={cn(isOpen ? 'inline-block' : 'hidden')}>
                  {item.title}
                </p>
              </Button>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="w-full items-center  justify-center">
        <Button
          className={cn(
            'transition-all duration-200',
            isOpen ? 'w-full' : 'size-10'
          )}
          size="icon"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronsRightIcon
            className={cn(
              'transition-transform duration-200',
              isOpen ? 'rotate-180' : 'rotate-0'
            )}
          />
        </Button>
      </footer>
    </motion.nav>
  );
};
