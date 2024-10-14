import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex grow w-full flex-col items-center justify-center">
      <div className="absolute top-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[60%] rounded-full bg-[rgba(211,198,226,0.5)] dark:bg-[rgba(37,37,37,0.82)] opacity-50 dark:blur-[60px] blur-[120px]" />
      </div>

      <h1>This is the about page</h1>
    </div>
  );
}
