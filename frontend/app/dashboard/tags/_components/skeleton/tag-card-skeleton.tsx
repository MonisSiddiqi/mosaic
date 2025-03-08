import { Skeleton } from "@/components/ui/skeleton";

export default function TagCardSkeleton() {
  return (
    <div className="flex cursor-pointer rounded-md border bg-muted/50 p-3 transition-colors">
      <Skeleton className="mr-3 h-5 w-5 rounded" />
      <Skeleton className="h-4 flex-1" />
    </div>
  );
}
