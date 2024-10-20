import { getUser } from '@/services/auth.service';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  console.log(user);

  if (user) {
    redirect('/tasks');
  }

  return (
    <main className="flex h-screen w-full items-center justify-center flex-col">
      {children}
    </main>
  );
}
