import { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon, TriangleAlertIcon } from "lucide-react";

export const DefaultErrorPage: FC<FallbackProps> = ({ error }) => {
  return (
    <div className="flex size-full h-[calc(100vh-8rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <TriangleAlertIcon className="size-10 min-w-10" strokeWidth={3} />
            <h1 className="text-5xl font-semibold"> Error</h1>
          </div>
          <p className="mt-4 text-center font-medium text-gray-600">
            An error occurred while loading the page. Please try again.
            {error && (
              <pre className="text-destructive">
                {JSON.stringify(error.message, null, 2)}
              </pre>
            )}
          </p>
        </div>
        <Button
          onClick={() => window.location.reload()}
          size={"sm"}
          className="mt-4"
        >
          <RefreshCwIcon /> Refresh
        </Button>
      </div>
    </div>
  );
};
