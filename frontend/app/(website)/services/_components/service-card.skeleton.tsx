import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProjectCardSkeleton = () => {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex">
          <Skeleton className="size-16 rounded" />
        </div>
      </CardHeader>

      <CardContent>
        <Skeleton className="mb-2 h-8 w-3/4 rounded" />
        <Skeleton className="mb-1 h-4 w-full rounded" />
        <Skeleton className="mb-1 h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </CardContent>
    </Card>
  );
};
