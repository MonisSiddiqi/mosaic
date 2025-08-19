import { useListenNotifications } from "@/hooks/use-listen-notifications";
import humanFormat from "human-format";
import { BellIcon } from "lucide-react";
import Link from "next/link";

export const NotificationsNav = () => {
  const { unreadCount } = useListenNotifications();

  return (
    <Link
      href="/notifications"
      className="flex items-center gap-2 px-2 py-1.5 hover:cursor-pointer hover:bg-muted"
    >
      <BellIcon className="size-4 min-w-4" />{" "}
      <p className="text-sm">Notifications</p>
      {unreadCount > 0 && (
        <div className="rounded-full p-1">
          <div className="flex max-h-4 min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 p-2.5 text-white">
            <p className="text-basf-red whitespace-nowrap text-sm">
              {humanFormat(unreadCount)}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
};
