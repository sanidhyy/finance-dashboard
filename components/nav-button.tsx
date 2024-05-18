import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavButtonProps = {
  href: string;
  label: string;
  isActive: boolean;
};

export const NavButton = ({ href, label, isActive }: NavButtonProps) => {
  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(
        "w-full justify-between border-none font-normal text-white outline-offset-0 transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:w-auto",
        isActive ? "bg-white/10 text-white" : "bg-transparent"
      )}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
