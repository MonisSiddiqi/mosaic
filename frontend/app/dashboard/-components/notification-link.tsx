"use client";

import { useListenNotifications } from "@/hooks/use-listen-notifications";
import humanFormat from "human-format";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NotificationLink = () => {
  const pathname = usePathname();

  const isActive = pathname.includes("/dashboard/notifications");

  const { unreadCount } = useListenNotifications();

  return (
    <Link
      href={"/dashboard/notifications"}
      className={`flex items-center justify-between space-x-2 rounded-lg px-4 py-2 transition duration-150 ease-in-out hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
    >
      <div className="flex items-center gap-2">
        <BellIcon />
        <span className="whitespace-nowrap">Notifications</span>
      </div>

      <div className="rounded-full p-1">
        <div className="flex max-h-4 min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 p-2.5 text-white">
          <p className="text-basf-red whitespace-nowrap text-sm">
            {humanFormat(unreadCount)}
          </p>
        </div>
      </div>
    </Link>
  );
};
