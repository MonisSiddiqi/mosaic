import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { FC } from "react";

type Props = {
  text?: string;
  showText?: boolean;
  className?: string;
  loaderClassName?: string;
};

export const LoaderComponent: FC<Props> = ({
  text = "Loading",
  showText = true,
  className,
  loaderClassName,
}) => {
  return (
    <div className={className}>
      <div className="flex gap-2 text-gray-800">
        <Loader2Icon className={cn(`size-5 animate-spin`, loaderClassName)} />{" "}
        {showText && text}
      </div>
    </div>
  );
};
