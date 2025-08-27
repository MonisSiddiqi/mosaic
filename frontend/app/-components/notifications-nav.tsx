import { useListenNotifications } from "@/hooks/use-listen-notifications";
import { cn } from "@/lib/utils";
import humanFormat from "human-format";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type Props = {
  isCompact?: boolean;
  href?: string;
  className?: string;
  badgeClassName?: string;
};

export const NotificationsNav: FC<Props> = ({
  isCompact,
  href = "/notifications",
  className,
  badgeClassName,
}) => {
  const { unreadCount } = useListenNotifications();

  if (isCompact) {
    return (
      <Link
        href={href}
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-full bg-gray-100 p-2 transition duration-150 ease-in-out hover:bg-gray-200",
          className,
        )}
      >
        <BellIcon className="h-5 w-5 text-gray-600" />
        {unreadCount ? (
          <div
            className={cn(
              "absolute -top-4 left-5 rounded-full p-1",
              badgeClassName,
            )}
          >
            <div className="flex max-h-4 min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 p-2.5 text-white">
              <p className="text-basf-red whitespace-nowrap text-xs">
                {humanFormat(unreadCount)}
              </p>
            </div>
          </div>
        ) : null}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 hover:cursor-pointer hover:bg-muted",
        className,
      )}
    >
      <BellIcon className="size-4 min-w-4" />{" "}
      <p className="text-sm">Notifications</p>
      {unreadCount > 0 && (
        <div className={cn("rounded-full p-1", badgeClassName)}>
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
