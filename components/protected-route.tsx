import { getUser } from '@/services/auth.service';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export const ProtectedRoute = async ({
  children,
  role,
  redirectTo = '/',
}: {
  children: React.ReactNode;
  role: 'no-logged-in' | 'logged-in' | 'admin';
  redirectTo?: string;
}) => {
  const user = await getUser();
  switch (role) {
    case 'no-logged-in':
      if (!user) return <>{children}</>;
      redirect(redirectTo);
    case 'logged-in':
      if (user) return <>{children}</>;
      redirect(redirectTo);
    case 'admin':
      if (user && user.labels.includes('admin')) return <>{children}</>;
      redirect(redirectTo);
    default:
      redirect(redirectTo);
  }
};
