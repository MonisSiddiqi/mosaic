"use client";

import { useState } from "react";
import { Check, Copy as CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyProps {
  textToCopy: string;
  label: string;
  className?: string;
}

export function Copy({ textToCopy, label, className }: CopyProps) {
  const [copyStatus, setCopyStatus] = useState<"copy" | "check">("copy");

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyStatus("check");
      setTimeout(() => setCopyStatus("copy"), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className={cn(
        `flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-500`,
        className,
      )}
    >
      {copyStatus === "copy" ? (
        <CopyIcon className="h-4 w-4" />
      ) : (
        <Check className="h-4 w-4" />
      )}
    </button>
  );
}
