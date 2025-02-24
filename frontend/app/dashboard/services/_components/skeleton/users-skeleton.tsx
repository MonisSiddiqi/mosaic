import { Skeleton } from "@/components/ui/skeleton";

export const UsersSkeleton = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 bg-white">
      <div className="w-full flex gap-4 justify-between">
        <Skeleton className="w-28 rounded-none h-9" />
        <Skeleton className="w-28 rounded-none h-9" />
      </div>
      <div>
        <Skeleton className="w-96 h-11 rounded-none" />
      </div>
      <div className="w-full flex flex-col gap-1 bg-gray-100 p-4">
        <Skeleton className="w-full rounded-none h-10" />
        <Skeleton className="w-full rounded-none h-12" />
        <Skeleton className="w-full rounded-none h-12" />
        <Skeleton className="w-full rounded-none h-12" />
        <Skeleton className="w-full rounded-none h-12" />
        <Skeleton className="w-full rounded-none h-12" />
        <Skeleton className="w-full rounded-none h-12" />
      </div>

      <div className="w-full flex gap-4 justify-between items-end">
        <Skeleton className="w-28 rounded-none h-9" />
        <Skeleton className="w-40 rounded-none h-9" />
      </div>
    </div>
  );
};
