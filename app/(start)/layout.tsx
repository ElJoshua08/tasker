import { Navbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-4 flex flex-col min-h-screen w-full">
      <Navbar />
      {children}
    </main>
  );
}
