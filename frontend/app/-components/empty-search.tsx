import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  className?: string;
};

export const EmptySearch: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(`flex h-96 w-full items-center justify-center`, className)}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <SearchIcon className="-ml-4 size-24 text-gray-400" />
        <h2 className="mt-4 text-2xl font-bold text-gray-400">
          No results found
        </h2>
        <p className="text-gray-400">Try searching for something else</p>
      </div>
    </div>
  );
};
