import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { GetAllProjectApiResponseItem } from "@/apis/projects";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStatusConfig, isImageUrl, isVideoUrl } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderComponent } from "@/components/loader-component";

export const MyProjectsCard: FC<GetAllProjectApiResponseItem> = ({
  id,
  title,
  description,
  status,
  ProjectFile,
}) => {
  const statusConfig = getStatusConfig(status);
  const firstFile = ProjectFile?.[0];
  const [isLoaded, setIsLoaded] = useState(false);

  const isImage = isImageUrl(firstFile?.url);
  const isVideo = isVideoUrl(firstFile?.url);

  console.log(statusConfig);

  return (
    <Link href={`/my-projects/${id}`} className="w-full">
      <Card className="w-full overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader>
          <div className="relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded bg-gray-100 text-gray-500">
            {!isLoaded && firstFile && (
              <Skeleton className="flex size-full items-center justify-center">
                <LoaderComponent showText={false} />
              </Skeleton>
            )}

            {firstFile ? (
              <>
                {isImage && (
                  <Image
                    src={firstFile.url}
                    alt={title}
                    fill
                    sizes=""
                    className={`object-cover transition-opacity duration-300 ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setIsLoaded(true)}
                  />
                )}

                {isLoaded && isVideo && (
                  <video
                    className={`h-full w-full object-cover transition-opacity duration-300 ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    src={firstFile.url}
                    preload="metadata"
                    muted
                    playsInline
                    onLoadedData={() => setIsLoaded(true)}
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      video.currentTime = 0.1;
                      video.pause();
                    }}
                  />
                )}
              </>
            ) : (
              "No Image"
            )}

            <div className="absolute right-4 top-4 z-20">
              <Badge className={statusConfig?.className + " gap-2"}>
                <statusConfig.icon className="size-4" /> {statusConfig?.label}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
          <CardDescription className="line-clamp-3 text-gray-500">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};
