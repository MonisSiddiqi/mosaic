"use client";

import { Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { routes } from "./sidebar";
import Link from "next/link";
import useMediaQuery from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useListenNotifications } from "@/hooks/use-listen-notifications";
import humanFormat from "human-format";

type Props = {
  hideSidebar: boolean;
  setHideSidebar: Dispatch<SetStateAction<boolean>>;
};

export function Header({ setHideSidebar }: Props) {
  const pathname = usePathname();

  const { unreadCount } = useListenNotifications();

  const title =
    pathname === "/dashboard"
      ? "Dashboard"
      : routes.slice(1).find((route) => pathname.includes(route.href))?.text;
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <header className="bg-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {isSmallScreen ? (
            <Button onClick={() => setHideSidebar(false)} variant={"outline"}>
              Menu
            </Button>
          ) : (
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          )}
        </div>
        <div className="flex items-center space-x-7">
          <Link
            href={"/dashboard/notifications"}
            className="relative rounded-full bg-gray-100 p-2 transition duration-150 ease-in-out hover:bg-gray-200"
          >
            <Bell className="h-5 w-5 text-gray-600" />{" "}
            {unreadCount ? (
              <div className="absolute -top-4 left-5 rounded-full p-1">
                <div className="flex max-h-4 min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 p-2.5 text-white">
                  <p className="text-basf-red whitespace-nowrap text-xs">
                    {humanFormat(unreadCount)}
                  </p>
                </div>
              </div>
            ) : null}
          </Link>

          <Link
            href={"/dashboard/profile"}
            className="rounded-full bg-gray-100 p-2 transition duration-150 ease-in-out hover:bg-gray-200"
          >
            <User className="h-5 w-5 text-gray-600" />
          </Link>
        </div>
      </div>
    </header>
  );
}
