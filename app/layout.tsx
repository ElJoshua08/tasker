import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Rethink_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';

const rethink_sans = Rethink_Sans({ weight: 'variable', subsets: ['latin'] });

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
        className={rethink_sans.className}
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
