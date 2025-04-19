import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ServiceCardSkeleton = () => {
  return (
    <Card className="animate-pulse overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          {/* Icon Skeleton */}
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-gray-200">
            <Skeleton className="h-full w-full" />
          </div>
          {/* Title Skeleton */}
          <div className="w-2/3">
            <Skeleton className="h-6 w-40 rounded-md" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/20 pt-4">
        {/* Status Skeleton */}
        <div className="flex items-center">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="ml-2 h-4 w-24 rounded-md" />
        </div>
        {/* Toggle Switch Skeleton */}
        <Skeleton className="h-6 w-12 rounded-full" />
      </CardFooter>
    </Card>
  );
};
