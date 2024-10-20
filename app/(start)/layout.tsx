import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { NavItem } from "@/interfaces";
import { HomeIcon, Icon } from "lucide-react";

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
      href: "/about"
    }, 
    {
      title: "Get Started", 
      href: "/login",
      variant: "default"
    }
  ] as NavItem[]

  return (
    <main className="p-4 flex flex-col min-h-screen w-full justify-start gap-2 overflow-hidden">
      <div className="overflow-hidden absolute top-0 left-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[60%] rounded-full bg-[rgba(211,198,226,0.5)] dark:bg-[rgba(37,37,37,0.82)] opacity-50 dark:blur-[60px] blur-[120px]" />
      </div>

      <Navbar items={navItems} />
      <Separator className="mt-2" /> 
      {children}
    </main>
  );
}
