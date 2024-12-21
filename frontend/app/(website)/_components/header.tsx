"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import LogoImage from "@/app/assets/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "My Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="container py-1 mx-auto">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image
            src={LogoImage.src}
            height={30}
            width={150}
            alt="Brand Logo"
            className="min-h-11 min-w-36"
          />
        </div>

        <nav className="items-center gap-4 hidden lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "font-medium transition-colors hover:text-primary border-b-2 border-transparent px-2 py-2 ",
                pathname === item.href
                  ? "text-primary border-brand-gold"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center">
          <Button asChild variant={"secondary"}>
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary"
            >
              Login/Signup
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
