import { ProtectedRoute } from '@/components/protected-route';
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute
      role="no-logged-in"
      redirectTo="/user"
    >
      <main className="flex h-screen w-full items-center justify-center flex-col">
        {children}
      </main>
    </ProtectedRoute>
  );
}
