import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 bg-white p-4">
      <div className="flex w-full justify-between gap-4">
        <Skeleton className="h-9 w-28 rounded-none" />
        <Skeleton className="h-9 w-28 rounded-none" />
      </div>
      <div>
        <Skeleton className="h-11 w-96 rounded-none" />
      </div>
      <div className="flex w-full flex-col gap-1 bg-gray-100 p-4">
        <Skeleton className="h-10 w-full rounded-none" />
        <Skeleton className="h-12 w-full rounded-none" />
        <Skeleton className="h-12 w-full rounded-none" />
        <Skeleton className="h-12 w-full rounded-none" />
        <Skeleton className="h-12 w-full rounded-none" />
        <Skeleton className="h-12 w-full rounded-none" />
        <Skeleton className="h-12 w-full rounded-none" />
      </div>

      <div className="flex w-full items-end justify-between gap-4">
        <Skeleton className="h-9 w-28 rounded-none" />
        <Skeleton className="h-9 w-40 rounded-none" />
      </div>
    </div>
  );
};
