"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarLink({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition duration-150 ease-in-out hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
    >
      {icon}
      <span className="whitespace-nowrap">{text}</span>
    </Link>
  );
}
