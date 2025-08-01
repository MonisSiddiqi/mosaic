"use client";

import { useListenNotifications } from "@/hooks/use-listen-notifications";
import Link from "next/link";
import { usePathname } from "next/navigation";
import humanFormat from "human-format";

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

  const { unreadCount } = useListenNotifications();

  const isActive =
    href === "/dashboard" ? pathname === href : pathname.includes(href);

  return (
    <Link
      href={href}
      className={`flex items-center justify-between space-x-2 rounded-lg px-4 py-2 transition duration-150 ease-in-out hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="whitespace-nowrap">{text}</span>
      </div>

      {text === "Notifications" && unreadCount > 0 && (
        <div className="rounded-full bg-red-200 p-1">
          <div className="flex max-h-4 min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 p-2.5 text-white">
            <p className="text-basf-red whitespace-nowrap text-sm">
              {humanFormat(unreadCount)}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
}
