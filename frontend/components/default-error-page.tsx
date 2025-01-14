import { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import errorIllustration from "@/assets/error-illustration.svg";
import { Link } from "lucide-react";

export const DefaultErrorPage: FC<FallbackProps> = ({ error }) => {
  return (
    <div className="my-auto flex h-[calc(100vh-4.5rem)] w-full flex-col items-center justify-center gap-5">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <p className="text-2xl font-semibold text-gray-800 xl:text-4xl">
            Something went wrong
          </p>
          <p className="text-destructive">{error.message}</p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => window.location.reload()}
              size={"sm"}
              variant={"outline"}
              className="mt-4"
            >
              Refresh
            </Button>
            <Button size={"sm"} asChild className="mt-4">
              <Link to="/">Go to home </Link>
            </Button>
          </div>
        </div>

        <div className="hidden size-full items-center p-10 md:flex">
          <img
            className="size-full"
            src={errorIllustration}
            alt="error illustration"
          />
        </div>
      </div>
    </div>
  );
};
