import { Loader2Icon } from "lucide-react";
import { FC } from "react";

type Props = {
  text?: string;
  showText?: boolean;
  className?: string;
};

export const LoaderComponent: FC<Props> = ({
  text = "Loading",
  showText = true,
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex gap-2 text-gray-800">
        <Loader2Icon className="animate-spin" /> {showText && text}
      </div>
    </div>
  );
};
