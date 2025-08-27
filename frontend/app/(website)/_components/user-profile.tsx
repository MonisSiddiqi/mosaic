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
import { Building2Icon, LogOutIcon, UserCircle } from "lucide-react";
import { UserRole } from "@/apis/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { NotificationsNav } from "../../-components/notifications-nav";

export function UserProfile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const queryClient = useQueryClient();

  const onLogout = async () => {
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

  useEffect(() => {
    if (user && user.role !== UserRole.USER) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-11 w-11 rounded-full">
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
      <DropdownMenuContent className="min-w-56 p-2" align="end" forceMount>
        <DropdownMenuItem className="flex flex-col items-start hover:bg-none">
          <div className="text-sm font-medium">{user.UserProfile?.name}</div>
          <div className="text-muted-foreground">{user.email}</div>
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
          <NotificationsNav />
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
