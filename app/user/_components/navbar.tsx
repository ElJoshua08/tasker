'use client';

import { Button } from '@/components/ui/button';
import { NavItem } from '@/interfaces';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';

const WIDTHS = {
  open: '250px', // Open width (full when viewport is narrower than this)
  closed: '60px', // Closed, only icons visible.
};

export const Navbar = ({
  navItems,
  header,
  footer,
}: {
  navItems: NavItem[];
  header?: ReactNode;
  footer?: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <motion.nav
      className={cn(
        'flex flex-col items-center justify-start h-screen border-r border-border px-4 py-6',
        { 'w-60': isOpen, 'w-20': !isOpen }
      )}
      initial={{ width: WIDTHS.open }}
      animate={{ width: isOpen ? WIDTHS.open : WIDTHS.closed }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {isOpen && header}

      <Separator className="my-4" />

      <ul className="flex flex-col gap-2 items-center justify-stretch w-full grow">
        {navItems.map((item) => (
          <li
            key={item.title}
            className="w-full"
          >
            <Link href={item.href}>
              <Button
                className="flex flex-row gap-2 items-center justify-start w-full px-2"
                variant={pathname === item.href ? 'secondary' : 'outline'}
              >
                {item.icon}
                {isOpen && item.title}
              </Button>
            </Link>
          </li>
        ))}
      </ul>

      {isOpen && footer}
    </motion.nav>
  );
};
