import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex grow w-full flex-col items-center justify-center">
      <div className="absolute top-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[60%] rounded-full bg-[rgba(211,198,226,0.5)] dark:bg-[rgba(37,37,37,0.82)] opacity-50 dark:blur-[60px] blur-[120px]" />
      </div>

      <h1 className="text-7xl font-bold">Tasker</h1>
      <p>
        Welcome to tasker, the website where you can control all of your tasks
        with ease.
      </p>

      <Link href="tasks">
        <Button className="group transition-all shadow-white/20 hover:shadow-white/40 duration-300 shadow-card text-3xl h-auto font-semibold mt-20 hover:bg-black dark:hover:bg-white flex items-center gap-2">
          Start Now{" "}
          <ChevronRight size={32} strokeWidth={4} className="size-32 transition-all duration-300 ml-0 group-hover:ml-5" />
        </Button>
      </Link>
    </div>
  );
}
