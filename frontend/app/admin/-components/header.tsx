"use client";

import { Bell, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { routes } from "./sidebar";

export function Header() {
  const pathname = usePathname();

  const title = routes.find((route) => route.href === pathname)?.text;

  return (
    <header className="bg-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="rounded-full bg-gray-100 p-2 transition duration-150 ease-in-out hover:bg-gray-200">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <button className="rounded-full bg-gray-100 p-2 transition duration-150 ease-in-out hover:bg-gray-200">
            <User className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
