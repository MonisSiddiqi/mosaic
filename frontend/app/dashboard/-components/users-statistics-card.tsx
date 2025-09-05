import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  title: string;
  description: string;
  value?: number;
  icon?: React.ElementType;
  className?: string;
  headerClassName?: string;
  isLoading?: boolean;
};

export const StatisticsCard: FC<Props> = ({
  title,
  description,
  className,
  headerClassName,
  icon,
  value,
  isLoading,
}) => {
  const Icon = icon;

  return (
    <Card className={cn(`h-full overflow-hidden text-gray-800`, className)}>
      <CardHeader
        className={cn(
          `bg-gradient-to-r from-emerald-500 to-teal-600 text-white`,
          headerClassName,
        )}
      >
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {Icon && <Icon className="h-6 w-6" />}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-bold">
              {isLoading ? (
                <LoaderIcon className="size-10 animate-spin" />
              ) : (
                value
              )}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
