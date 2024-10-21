import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { NavItem } from "@/interfaces";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Get Started",
      href: "/login",
      variant: "default",
    },
  ] as NavItem[];

  return (
    <main className="overflow-hidden p-4 flex flex-col min-h-screen w-full justify-start gap-2">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-background overflow-hidden">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[350px] w-[350px] -translate-x-[80%] translate-y-[60%] rounded-full dark:bg-[rgba(211,198,226,0.5)] bg-[rgba(37,37,37,0.82)] opacity-50 blur-[120px]" />
      </div>
      <Navbar items={navItems} />
      <Separator className="mt-2 bg-foreground/50" />
      {children}
    </main>
  );
}
