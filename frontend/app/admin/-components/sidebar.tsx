import Link from "next/link";
import {
  Home,
  Users,
  Building,
  Gavel,
  BarChart2,
  Bell,
  Package,
  Truck,
  Grid,
  Layers,
  MessageSquare,
  FileText,
  LogOutIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { SidebarLink } from "@/app/admin/-components/sidebar-link";
import { usePathname } from "next/navigation";

import Logo from "@/app/assets/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const routes = [
  {
    href: "/admin",
    icon: <Home className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Dashboard",
  },
  {
    href: "/admin/services",
    icon: <Layers className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Services",
  },
  {
    href: "/admin/projects",
    icon: <Grid className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Projects",
  },
  {
    href: "/admin/users",
    icon: <Users className="h-5 min-h-5 w-5 min-w-5" />,
    text: "User Management",
  },
  {
    href: "/admin/bids",
    icon: <Gavel className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Bidding Management",
  },
  {
    href: "/admin/reports",
    icon: <BarChart2 className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Reporting & Analytics",
  },

  {
    href: "/admin/subscriptions",
    icon: <Package className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Subscription Management",
  },
  {
    href: "/admin/vendors",
    icon: <Truck className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Vendor Management",
  },

  {
    href: "/admin/notifications",
    icon: <Bell className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Notifications",
  },
];

const user = {
  name: "John Doe",
};

export function Sidebar() {
  return (
    <div className="absolute inset-y-0 left-0 flex w-64 -translate-x-full transform flex-col justify-between space-y-2 bg-gray-800 px-2 py-2 text-white transition duration-200 ease-in-out md:relative md:translate-x-0">
      <div>
        {" "}
        <Link
          href="/admin"
          className="flex items-center space-x-2 border-b border-gray-500 px-4 py-4"
        >
          <Package className="h-8 w-8" />
          <span className="text-2xl font-semibold">MOSAIC</span>{" "}
          <span className="text-sm">Georgia</span>
        </Link>
        <nav className="mt-2 flex flex-col gap-1">
          {routes.map(({ href, icon, text }) => (
            <SidebarLink key={href} href={href} icon={icon} text={text} />
          ))}
        </nav>
      </div>
      <div className="w-full">
        <div className="relative flex h-32 w-full items-end rounded bg-gray-700 p-3 shadow">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="absolute -top-7 left-5 size-14 cursor-pointer rounded text-lg text-gray-800">
                  <AvatarImage
                    src="https://avatar.iran.liara.run/public"
                    alt={`@${user?.name}`}
                  />
                  <AvatarFallback className="font-semibold">JD</AvatarFallback>
                </Avatar>
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
              {user?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
