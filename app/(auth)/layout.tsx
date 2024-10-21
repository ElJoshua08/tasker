export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-background overflow-hidden">
        <div className="absolute left-1/2 bottom-0 h-[340px] w-[340px] translate-x-[25%] -translate-y-[55%] rounded-full dark:bg-[rgba(217,209,226,0.68)] bg-[rgba(37,37,37,0.82)] opacity-50 blur-[120px]" />
      </div>
      {children}
    </main>
  );
}
