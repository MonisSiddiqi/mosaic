"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import Logo from "@/app/assets/logo.svg";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { UserProfile } from "./user-profile";
import Image from "next/image";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "My Projects", href: "/my-projects" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },

  // { name: "Contact", href: "/contact" },
];

export const Header = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={cn("container mx-auto", className)}>
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Image
            className="rounded-md fill-white"
            src={Logo.src}
            alt="Logo"
            width={150}
            height={40}
          />
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "border-b-2 border-transparent px-2 py-2 font-medium transition-colors hover:text-primary",
                  isActive
                    ? "border-brand-gold text-primary"
                    : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
          <SheetTrigger className="mr-4 lg:hidden">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="sr-only">Nav Items</SheetTitle>
              <SheetDescription className="sr-only">
                This is the list of nav items
              </SheetDescription>
              <div className="flex justify-center border-b border-gray-300 py-5">
                <UserProfile />
              </div>
            </SheetHeader>

            <nav className="flex flex-col items-center gap-6 py-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "border-b-2 border-transparent px-2 py-2 font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "border-brand-gold text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex">
          <UserProfile />
        </div>
      </div>
    </header>
  );
};
