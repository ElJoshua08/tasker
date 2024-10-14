"use client";

import { NavItem } from "@/interfaces";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const Navbar = ({ items }: { items: NavItem[] }) => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-between">
      {/* The logo */}
      <h1 className="text-xl tracking-widest">TASKER</h1>

      <ul className="flex flex-row gap-4 items-center">
        {items.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.href}>
                <Button
                  key={index}
                  variant={
                    pathname === item.href
                      ? "secondary"
                      : item.variant
                      ? item.variant
                      : "ghost"
                  }
                >
                  {item.title}
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
