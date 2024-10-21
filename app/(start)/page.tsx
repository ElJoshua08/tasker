import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex grow w-full flex-col items-center justify-center px-8">
      <h1 className="text-8xl font-bold">Tasker</h1>
      <p className="text-center text-xl text-foreground/75">
        the website where you can control all of your tasks
        with ease.
      </p>

      <Link href="tasks">
        <Button className="group transition-all shadow-gray-500/30 hover:shadow-black dark:shadow-white/60 dark:hover:shadow-white duration-300 shadow-card text-3xl h-auto font-semibold mt-20 hover:bg-black dark:hover:bg-white flex items-center gap-2">
          Get Started
          <ChevronRight size={32} strokeWidth={4} className="size-32 transition-all duration-300 ml-0 group-hover:ml-5" />
        </Button>
      </Link>
    </div>
  );
}
