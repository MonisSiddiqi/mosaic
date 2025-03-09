"use client";

import Link from "next/link";
import {
  Home,
  Users,
  Gavel,
  BarChart2,
  Package,
  Grid,
  Layers,
  UserIcon,
  TagIcon,
} from "lucide-react";

import { SidebarLink } from "@/app/dashboard/-components/sidebar-link";
import { BottomSidebar } from "./bottom-sidebar";
import { text } from "stream/consumers";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";

export const routes = [
  {
    href: "/dashboard",
    icon: <Home className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Dashboard",
  },
  {
    href: "/dashboard/services",
    icon: <Layers className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Services",
  },
  {
    href: "/dashboard/tags",
    icon: <TagIcon className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Tags",
  },
  {
    href: "/dashboard/projects",
    icon: <Grid className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Projects",
  },
  // {
  //   href: "/dashboard/users",
  //   icon: <Users className="h-5 min-h-5 w-5 min-w-5" />,
  //   text: "Users",
  // },
  // {
  //   href: "/dashboard/bids",
  //   icon: <Gavel className="h-5 min-h-5 w-5 min-w-5" />,
  //   text: "Bids",
  // },
  // {
  //   href: "/dashboard/reports",
  //   icon: <BarChart2 className="h-5 min-h-5 w-5 min-w-5" />,
  //   text: "Reporting & Analytics",
  // },

  // {
  //   href: "/dashboard/subscriptions",
  //   icon: <Package className="h-5 min-h-5 w-5 min-w-5" />,
  //   text: "Subscription Management",
  // },

  {
    href: "/dashboard/profile",
    icon: <UserIcon className="h-5 min-h-5 w-5 min-w-5" />,
    text: "My Profile",
  },
];

export function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="absolute inset-y-0 left-0 flex w-64 -translate-x-full transform flex-col justify-between space-y-2 bg-gray-800 px-2 py-2 text-white transition duration-200 ease-in-out md:relative md:translate-x-0">
      <div>
        {" "}
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 border-b border-gray-500 px-4 py-4"
        >
          <Package className="h-8 w-8" />
          <span className="text-2xl font-semibold">Crafty</span>{" "}
          <span className="text-sm">Future</span>
        </Link>
        <nav className="mt-2 flex flex-col gap-1">
          {routes.map(({ href, icon, text }) => (
            <SidebarLink key={href} href={href} icon={icon} text={text} />
          ))}

        {user?.role === UserRole.VENDOR && (
            <SidebarLink
              href="/dashboard/bids"
              icon={<Gavel className="h-5 min-h-5 w-5 min-w-5" />}
              text={"Bids"}
            />
          )}

          {user?.role === UserRole.ADMIN && (
            <SidebarLink
              href="/dashboard/users"
              icon={<Grid className="h-5 min-h-5 w-5 min-w-5" />}
              text={"Users"}
            />
          )}
        </nav>
      </div>
      <div className="w-full">
        <BottomSidebar />
      </div>
    </div>
  );
}
