"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// import LogoImage from "@/app/assets/logo.png";
// import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, PackageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { UserProfile } from "./user-profile";

const navigationItems = [
  { name: "Home", href: "/" },
  // { name: "Services", href: "/services" },
  // { name: "My Projects", href: "/my-projects" },
  { name: "About", href: "/about" },
  // { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="container mx-auto py-1">
      <div className="flex items-center justify-between px-4">
        <Link href={"/"} className="flex items-center space-x-2 px-4 py-4">
          <PackageIcon className="h-8 w-8" />
          <span className="text-2xl font-semibold">Crafty</span>{" "}
          <span className="text-sm">Future</span>
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

        {/* <div className="hidden lg:flex">
          <UserProfile />
        </div> */}
        <div className="w-44"></div>
      </div>
    </header>
  );
};
