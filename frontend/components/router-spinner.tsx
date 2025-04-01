"use client";

import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { useRouteLoading } from "@/hooks/use-route-loading";

const RouterSpinner = () => {
  const ref = useRef<LoadingBarRef>(null);
  const isLoading = useRouteLoading();

  useEffect(() => {
    if (isLoading) {
      ref?.current?.continuousStart();
    } else {
      ref?.current?.complete();
    }
  }, [isLoading]);

  return <LoadingBar color="#1F509A" ref={ref} height={5} />;
};

export default RouterSpinner;
