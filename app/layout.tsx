import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const rubik = Rubik({ weight: 'variable', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tasker',
  description: 'Manage your tasks with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={rubik.className}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
          <Toaster
            closeButton
            richColors
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
