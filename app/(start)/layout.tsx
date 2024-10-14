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
    <main className="p-4 flex flex-col min-h-screen w-full justify-start gap-2">
      <Navbar items={navItems} />
      <Separator className="mt-2" /> 
      {children}
    </main>
  );
}
