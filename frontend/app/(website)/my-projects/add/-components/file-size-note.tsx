import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const FileSizeNote = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-md border border-gray-200 bg-gray-50 p-3 text-gray-600",
        className,
      )}
    >
      <p className="mb-1 text-sm font-medium">Note: File Size Limits</p>
      <ul className="list-disc space-y-0.5 pl-5 text-sm">
        <li>
          Images: max <span className="font-semibold">50MB</span>
        </li>
        <li>
          Videos: max <span className="font-semibold">500MB</span>
        </li>
        {children && children}
      </ul>
    </div>
  );
};
