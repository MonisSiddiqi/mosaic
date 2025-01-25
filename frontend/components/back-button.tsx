import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type Props = {
  href: string;
  className?: string;
};

export const BackButton: FC<Props> = ({ href, className }) => {
  return (
    <Button
      variant={"outline"}
      asChild
      className={cn(`items-center gap-2`, className)}
    >
      <Link href={href}>
        <ArrowLeft /> Back
      </Link>
    </Button>
  );
};
