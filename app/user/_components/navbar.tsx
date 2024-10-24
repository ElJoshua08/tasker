"use client";

import { Button } from "@/components/ui/button";
import { NavItem } from "@/interfaces";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Models } from "node-appwrite";
import { logout } from "@/services/auth.service";
import { ChevronRightIcon, LoaderCircleIcon, LogOutIcon } from "lucide-react";

const WIDTHS = {
  open: 250, // Open width (full when viewport is narrower than this)
  closed: 60, // Closed, only icons visible.
};

export const Navbar = ({
  navItems,
  user,
}: {
  navItems: NavItem[];
  user: Models.User<Models.Preferences> | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const pathname = usePathname();

  if (!user) return null;

  return (
    <motion.nav
      className={cn(
        "bg-background/50 backdrop-blur-xl flex flex-col items-stretch justify-start h-screen border-r border-border p-2 grow-0 shrink-0 relative",
        isOpen ? "w-full relative  sm:w-60" : "w-20"
      )}
      initial={{ width: WIDTHS.open }}
      animate={{ width: isOpen ? WIDTHS.open : WIDTHS.closed }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <header className="flex flex-row gap-2 w-full justify-start items-center">
        <Avatar className="bg-primary/50 text-2xl text-foreground flex items-center justify-center font-semibold">
          {user.name.charAt(0)}
        </Avatar>
        <motion.h1
          initial={{ scaleX: 1, display: "block" }}
          animate={{
            scaleX: isOpen ? 1 : 0,
            transformOrigin: "left",
            display: isOpen ? "initial" : "none",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {user.name}
        </motion.h1>
      </header>

      <Separator className="my-2" />

      <ul className="flex flex-col gap-2 items-center justify-start w-full grow">
        <li className="w-full flex items-center justify-center">
          <Button
            className={cn(
              "transition-all duration-200",
              isOpen ? "w-full" : "size-10"
            )}
            size="icon"
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronRightIcon
              className={cn(
                "transition-transform duration-200",
                isOpen ? "rotate-180" : "rotate-0"
              )}
            />
          </Button>
        </li>
        {navItems.map((item) => (
          <li key={item.title} className="w-full flex justify-center items-center">
            <Link
              href={item.href}
              className={cn("flex justify-start items-center", isOpen ? "w-full" : "w-10")}
            >
              <Button
                className={cn(
                  "flex flex-row w-full h-10 justify-start gap-2 items-center p-2 transition-transform duration-200",
                  { "size-10": !isOpen }
                )}
                variant={pathname === item.href ? "secondary" : "outline"}
              >
                <span
                  className={cn("shrink-0", {
                    "h-full w-full items-center justify-center flex": !isOpen,
                  })}
                >
                  {item.icon}
                </span>
                <p className={cn(isOpen ? "inline-block" : "hidden")}>
                  {item.title}
                </p>
              </Button>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="w-full items-center  justify-center">
        <Button
          variant="destructive"
          className={cn(
            "flex flex-row gap-4 items-center justify-center px-2",
            isOpen ? "w-full h-11" : "size-11"
          )}
          onClick={async () => {
            setLogoutLoading(true);
            await logout();
          }}
        >
          {isOpen && "Log Out"}
          {logoutLoading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <LogOutIcon />
          )}
        </Button>
      </footer>
    </motion.nav>
  );
};
