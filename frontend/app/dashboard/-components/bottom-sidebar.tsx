"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const BottomSidebar = () => {
  const { user, logout } = useAuth();

  const router = useRouter();

  const onLogout = async () => {
    console.log("trying logout...");
    try {
      await logout();
      toast({
        variant: "success",
        title: "Logout successfully",
      });
      router.push("/auth");
    } catch (err) {
      toast({
        variant: "destructive",
        title: err instanceof Error ? err.message : "Could not logout",
      });
    }
  };

  return (
    <div className="relative flex h-32 w-full items-end rounded bg-gray-700 p-3 shadow">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard/profile">
              <Avatar className="absolute -top-7 left-5 size-14 cursor-pointer rounded text-lg text-gray-800">
                <AvatarImage
                  src={user?.UserProfile.image as string}
                  alt={`@${user?.UserProfile?.name}`}
                  className="rounded-full object-cover"
                />
                <AvatarFallback className="font-semibold">
                  {getInitials(user?.UserProfile?.name || "")}
                </AvatarFallback>
              </Avatar>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go to Profile</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            asChild
            className="absolute right-3 top-3 cursor-pointer"
          >
            <Button
              size={"icon"}
              variant={"secondary"}
              onClick={onLogout}
              className="size-10 bg-white hover:bg-red-100 hover:text-red-800"
            >
              <LogOutIcon className="size-5 min-h-5 min-w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="w-full overflow-hidden">
        <p className="text-sm">Welcome</p>{" "}
        <p className="whitespace-nowrap text-xl font-semibold">
          {user?.UserProfile.name}
        </p>
      </div>
    </div>
  );
};
