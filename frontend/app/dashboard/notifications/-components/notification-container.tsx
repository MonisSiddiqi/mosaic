"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollBar } from "@/components/ui/scroll-area";
import { NotificationItem } from "./notification-item";
import Link from "next/link";
import { markAsReadApi } from "@/apis/notifications/notification.api";
import { useNotificationsSuspenseQuery } from "@/queries/notifications.queries";
import { EmptyUI } from "@/components/empty-ui";

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => index + start);
};

const getPaginationItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= 5) {
    return range(1, totalPages);
  }

  const pages = [];
  const left = Math.max(2, currentPage - 2);
  const right = Math.min(totalPages - 1, currentPage + 2);

  if (left > 2) {
    pages.push(1, "...");
  } else {
    pages.push(1);
  }

  pages.push(...range(left, right));

  if (right < totalPages - 1) {
    pages.push("...", totalPages);
  } else {
    pages.push(totalPages);
  }

  return pages;
};

export const NotificationsContainer = () => {
  const queryClient = useQueryClient();

  const page =
    Number(new URLSearchParams(window.location.search).get("page")) || 1;

  const { mutate } = useMutation({
    mutationKey: ["notifications-mark-as-read"],
    mutationFn: markAsReadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });

  const { data } = useNotificationsSuspenseQuery(page);

  const totalPages = Math.ceil(data.totalCount / 10);

  useEffect(() => {
    mutate();
  }, [mutate]);

  const paginationItems = getPaginationItems(page, totalPages);

  return (
    <main className="w-full max-w-[calc(100vw)] p-4">
      <div className="flex flex-col gap-4">
        {data.notifications.length > 0 ? (
          data.notifications.map((notification) => {
            return <NotificationItem key={notification.id} {...notification} />;
          })
        ) : (
          <EmptyUI className="h-[calc(100vh-10rem)]" text="No Notifications" />
        )}
      </div>

      <ScrollArea className="mt-4 w-[calc(100wv-1rem)] overflow-x-auto md:w-full">
        <Pagination className="w-full">
          <PaginationContent>
            {page > 1 && (
              <Link href={`/notifications?page=${page - 1}`}>
                <PaginationItem>
                  <PaginationPrevious className="cursor-pointer" />
                </PaginationItem>
              </Link>
            )}
            {paginationItems.map((item, index) => {
              if (typeof item === "string")
                return <PaginationEllipsis key={index} />;
              return (
                <Link key={item} href={`/notifications?page=${item}`}>
                  <PaginationItem>
                    <PaginationLink isActive={item === page}>
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                </Link>
              );
            })}
            {page < totalPages && (
              <Link href={`/notifications?page=${page + 1}`}>
                <PaginationItem>
                  <PaginationNext className="cursor-pointer" />
                </PaginationItem>
              </Link>
            )}
          </PaginationContent>
        </Pagination>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </main>
  );
};
