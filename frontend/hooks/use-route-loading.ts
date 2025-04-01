"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useRouteLoading = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return isLoading;
};
