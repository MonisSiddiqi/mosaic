import { useAuth } from "@/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { LogOutIcon, LucideIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  hideIcon?: boolean;
  icon?: LucideIcon;
};

export const Logout: FC<Props> = ({
  className,
  hideIcon,
  icon = LogOutIcon,
}) => {
  const { logout } = useAuth();

  const queryClient = useQueryClient();

  const router = useRouter();

  const onClick = async () => {
    try {
      queryClient.clear();
      await logout();
      toast({
        title: "Logout Successfully",
        variant: "success",
      });
      router.push("/");
    } catch (e) {
      toast({
        title: e instanceof Error ? e.message : "Could not logout",
        variant: "destructive",
      });
    }
  };

  const Icon = icon;

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-2 hover:text-destructive",
        className,
      )}
      onClick={onClick}
    >
      {hideIcon ? null : <Icon />} Log out
    </div>
  );
};
