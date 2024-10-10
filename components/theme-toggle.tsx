'use client';

import { LucideSun, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from './ui/button';

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme: setDefaultTheme, theme: defaultTheme } = useTheme();
  const [theme, setTheme] = useState(defaultTheme)

  return (
    <Button
      variant="outline"
      className={cn('!p-0 h-8 w-8', className)}
      onClick={() => {
        console.log("clicked")
        theme === "dark" ? setDefaultTheme('light') : setDefaultTheme('dark');
        setTheme((prev) => prev === "light" ? "dark" : "light")
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
