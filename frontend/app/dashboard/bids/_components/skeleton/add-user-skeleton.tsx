import { Skeleton } from "@/components/ui/skeleton";

export const AddUserSkeleton = () => {
  return (
    <div className="mt-5 flex h-full w-full justify-center">
      <div className="flex w-full flex-col gap-4 p-4">
        <div className="flex w-72 flex-col gap-2">
          <Skeleton className="h-4 w-36 rounded-none" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-10 rounded-none" />
            <Skeleton className="h-12 w-full rounded-none" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-9 rounded-none" />
            <Skeleton className="h-12 w-full rounded-none" />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-20 rounded-none" />
            <Skeleton className="h-12 w-full rounded-none" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-24 rounded-none" />
            <Skeleton className="h-12 w-full rounded-none" />
          </div>{" "}
        </div>
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-16 rounded-none" />
            <Skeleton className="h-12 w-full rounded-none" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-28 rounded-none" />
            <Skeleton className="h-12 w-full rounded-none" />
          </div>{" "}
        </div>

        <Skeleton className="ml-auto h-10 w-28 rounded-none" />
      </div>
    </div>
  );
};
