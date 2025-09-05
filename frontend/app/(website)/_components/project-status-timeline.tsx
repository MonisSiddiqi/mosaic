import { ProjectStatusEnum, statusOptions } from "@/apis/projects";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

export const ProjectStatusTimeline = ({
  status,
  className,
}: {
  status: ProjectStatusEnum;
  className?: string;
}) => {
  return (
    <div className={cn("rounded border border-gray-200 p-4 md:p-6", className)}>
      <p className="text-sm text-gray-500">Project Current Status</p>
      <div className="mt-4 flex flex-col gap-2 md:flex-row">
        {statusOptions.map((item, i) => (
          <div className="flex items-center gap-2" key={item.value}>
            {i === 0 ? (
              <ArrowRightIcon className="size-4 md:hidden" />
            ) : (
              <ArrowRightIcon className="size-4" />
            )}
            <Badge variant={item.value === status ? "default" : "outline"}>
              {item.label}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
