"use client";

import { LoaderComponent } from "@/components/loader-component";
import { Skeleton } from "@/components/ui/skeleton";
import { isImageUrl, isVideoUrl } from "@/lib/utils";
import { useState } from "react";

export const ShowFile = ({ url }: { url: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const isImage = isImageUrl(url);
  const isVideo = isVideoUrl(url);

  return (
    <div className="h-56 w-full">
      {!isLoaded && (
        <Skeleton className="flex size-full items-center justify-center">
          <LoaderComponent showText={false} />
        </Skeleton>
      )}

      {isError && (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          No file
        </div>
      )}

      {isImage && (
        <img
          src={url}
          alt={"Proect Image"}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsError(true);
          }}
        />
      )}

      {isVideo && (
        <video
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={url}
          preload="metadata"
          muted
          controls
          playsInline
          onError={() => {
            setIsError(true);
          }}
          onLoadedData={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};
