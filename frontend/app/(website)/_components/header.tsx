"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import LogoImage from "@/app/assets/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "My Projects", href: "/my-projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="container mx-auto py-1">
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

        <nav className="hidden items-center gap-4 lg:flex">
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

        <div className="flex items-center">
          <Button asChild variant={"secondary"}>
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Login/Signup
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
