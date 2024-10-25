import { Navbar } from './_components/navbar';
import { ProtectedRoute } from '@/components/protected-route';
import { getUser } from '@/services/auth.service';

export default async function TasksAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <ProtectedRoute
      role="logged-in"
      redirectTo="/login"
    >
      <main className="flex flex-row justify-start items-start h-screen w-full overflow-hidden">
        <Navbar
          user={user}
        />
        <section className="flex fle-col items-start justify-start p-2">
          {children}
        </section>
      </main>
    </ProtectedRoute>
  );
}
