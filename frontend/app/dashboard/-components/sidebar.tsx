"use client";

import Link from "next/link";
import {
  Home,
  Gavel,
  BarChart2,
  Package,
  Grid,
  Layers,
  UserIcon,
  TagIcon,
  ActivityIcon,
  UsersIcon,
  BellIcon,
} from "lucide-react";

import { SidebarLink } from "@/app/dashboard/-components/sidebar-link";
import { BottomSidebar } from "./bottom-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";
import Image from "next/image";

import Logo from "@/app/assets/logo-white.svg";

export const routes = [
  {
    href: "/dashboard",
    icon: <Home className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Dashboard",
    roles: [],
  },

  {
    href: "/dashboard/bids",
    icon: <Gavel className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Bids Management",
    roles: [UserRole.VENDOR],
  },

  {
    href: "/dashboard/services",
    icon: <Layers className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Services Management",
    roles: [],
  },
  {
    href: "/dashboard/tags",
    icon: <TagIcon className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Tags Management",
    roles: [],
  },
  {
    href: "/dashboard/projects",
    icon: <Grid className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Projects Management",
    roles: [UserRole.ADMIN],
  },

  {
    href: "/dashboard/users",
    icon: <UsersIcon className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Users Management",
    roles: [UserRole.ADMIN],
  },

  {
    href: "/dashboard/reports",
    icon: <BarChart2 className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Reporting & Analytics",
    roles: [UserRole.ADMIN],
  },

  {
    href: "/dashboard/subscriptions",
    icon: <Package className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Subscription Management",
    roles: [UserRole.ADMIN],
  },

  {
    href: "/dashboard/membership",
    icon: <Package className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Membership",
    roles: [UserRole.VENDOR],
  },

  {
    href: "/dashboard/login-history",
    icon: <ActivityIcon className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Login Activity",
    roles: [UserRole.ADMIN],
  },

  {
    href: "/dashboard/profile",
    icon: <UserIcon className="h-5 min-h-5 w-5 min-w-5" />,
    text: "My Profile",
    roles: [],
  },

  {
    href: "/dashboard/notifications",
    icon: <BellIcon className="h-5 min-h-5 w-5 min-w-5" />,
    text: "Notifications",
    roles: [],
  },
];

export function Sidebar() {
  const { user } = useAuth();

  const filteredRoutes = routes.filter((route) => {
    if (route.roles && route.roles.length === 0) {
      return true;
    }

    if (route.roles.length > 0) {
      return route.roles.includes(user?.role || UserRole.USER);
    }
  });

  return (
    <div className="absolute inset-y-0 left-0 flex w-64 -translate-x-full transform flex-col justify-between space-y-2 bg-gray-800 px-2 py-2 text-white transition duration-200 ease-in-out md:relative md:translate-x-0">
      <div>
        {" "}
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 border-b border-gray-500 px-4 py-4"
        >
          <Image
            className="rounded-md fill-white"
            src={Logo.src}
            alt="Logo"
            width={150}
            height={40}
          />
        </Link>
        <nav className="mt-2 flex flex-col gap-1">
          {filteredRoutes.map(({ href, icon, text }) => (
            <SidebarLink key={href} href={href} icon={icon} text={text} />
          ))}
        </nav>
      </div>
      <div className="w-full">
        <BottomSidebar />
      </div>
    </div>
  );
}
