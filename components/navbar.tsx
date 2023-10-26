"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {MobileSidebar} from "./mobile-sidebar";
import { useProModal } from "@/hooks/use-pro-modal";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

interface NavbarProps {
  isPro : boolean;
}
export function Navbar({isPro} : NavbarProps) {
  const proModal = useProModal();
  return (
    <div className="fixed w-full z-50 flex justify-between h-16 items-center py-2 px-4 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
     <MobileSidebar isPro={isPro}/>
        <Link href={"/"}>
          <h1
            className={cn(
              "hidden text-xl md:text-3xl font-bold text-primary md:block",
              font.className
            )}
          >
            Companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <ThemeToggle />
        {!isPro && <Button variant={"premium"} size={"sm"} onClick={proModal.onOpen} >Upgrade
            <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
        </Button>}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
