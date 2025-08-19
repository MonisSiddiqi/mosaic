import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  message: string;
  className?: string;
  speed?: number;
};

export const AnimatedMessage = ({ message, speed = 50, className }: Props) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, message, speed]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [message]);

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg bg-blue-50 p-4 text-blue-800",
        className,
      )}
    >
      <div className="flex items-center gap-1">
        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
        <div className="animation-delay-150 h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
        <div className="animation-delay-300 h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
      </div>
      <span className="font-medium">
        {displayedText}
        {currentIndex < message.length && (
          <span className="animate-pulse">|</span>
        )}
      </span>
    </div>
  );
};
