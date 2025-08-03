"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { getFileUrl, getInitials } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { BellIcon, Building2Icon, LogOutIcon, UserCircle } from "lucide-react";
import { UserRole } from "@/apis/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useListenNotifications } from "@/hooks/use-listen-notifications";
import humanFormat from "human-format";

export function UserProfile() {
  const { user, logout } = useAuth();

  const onLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout Successfully",
        variant: "success",
      });
    } catch (e) {
      toast({
        title: e instanceof Error ? e.message : "Could not logout",
        variant: "destructive",
      });
    }
  };

  const router = useRouter();

  const { unreadCount } = useListenNotifications();

  useEffect(() => {
    if (user && user.role !== UserRole.USER) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-11 w-11">
            <AvatarImage
              src={getFileUrl(user.UserProfile?.image as string)}
              alt={user.UserProfile?.name}
            />
            <AvatarFallback>
              {getInitials(user.UserProfile?.name || "")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2" align="end" forceMount>
        <DropdownMenuItem className="flex flex-col items-start hover:bg-none">
          <div className="text-sm font-medium">{user.UserProfile?.name}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="hover:cursor-pointer">
            {" "}
            <UserCircle /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/notifications" className="hover:cursor-pointer">
            <BellIcon /> Notifications{" "}
            {unreadCount > 0 && (
              <div className="rounded-full p-1">
                <div className="flex max-h-4 min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 p-2.5 text-white">
                  <p className="text-basf-red whitespace-nowrap text-sm">
                    {humanFormat(unreadCount)}
                  </p>
                </div>
              </div>
            )}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer hover:text-destructive"
          onClick={onLogout}
        >
          <LogOutIcon /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      <Button
        asChild
        variant={"outline"}
        className="border-brand-gold hover:text-brand-gold"
      >
        <Link href="/auth/register/vendor">
          <Building2Icon /> Register as Vendor
        </Link>
      </Button>
      <div className="-order-1 flex items-center gap-2 md:order-1">
        <Button
          asChild
          variant={"outline"}
          className="border-brand-primary hover:text-brand-primary"
        >
          <Link href="/auth/register">
            <UserCircle /> Register
          </Link>
        </Button>
        <Button asChild>
          <Link href="/auth">Login</Link>
        </Button>
      </div>
    </div>
  );
}
