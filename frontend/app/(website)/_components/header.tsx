"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, trimText } from "@/lib/utils";

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
import { useAuth } from "@/hooks/use-auth";
import { NotificationsNav } from "@/app/-components/notifications-nav";
import { Logout } from "@/app/-components/logout";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "My Projects", href: "/my-projects" },
  { name: "About", href: "/about" },
  { name: "My Profile", href: "/profile" },
  // { name: "Blogs", href: "/blogs" },

  // { name: "Contact", href: "/contact" },
];

export const Header = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const { isAuthenticated } = useAuth();

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "container relative z-50 mx-auto flex h-16 items-center justify-center",
        className,
      )}
    >
      <Link href="/" className="absolute left-4 top-1/2 -translate-y-1/2">
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

      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-6 lg:hidden">
        {isAuthenticated ? (
          <NotificationsNav isCompact badgeClassName="-top-3" />
        ) : null}

        <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="sr-only">Nav Items</SheetTitle>
              <SheetDescription className="sr-only">
                This is the list of nav items
              </SheetDescription>
              <div className="flex justify-center gap-2 border-b border-gray-300 py-5">
                <UserProfile />

                {user ? (
                  <div className="mt-1 flex flex-col items-start hover:bg-none">
                    <div className="text-sm font-medium">
                      {trimText(user.UserProfile?.name || "User")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {trimText(user.email)}
                    </div>
                  </div>
                ) : null}
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
              {isAuthenticated ? (
                <Logout hideIcon className="text-gray-500" />
              ) : null}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 gap-4 lg:flex">
        {isAuthenticated ? (
          <NotificationsNav
            isCompact
            className="h-11 w-11"
            badgeClassName="-top-2 "
          />
        ) : null}

        <UserProfile />
      </div>
    </header>
  );
};
