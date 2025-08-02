import { ProjectStatusEnum } from "@/apis/projects/projects.type";
import { API_URL } from "@/config";
import { clsx, type ClassValue } from "clsx";
import {
  CheckCircleIcon,
  ClockIcon,
  HandshakeIcon,
  TrafficConeIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFileUrl(file: string | null): string {
  if (!file) return "";
  return `${API_URL}/storage/${file}`;
}

export function getInitials(name: string) {
  if (!name) {
    return "";
  }
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i].charAt(0);
  }
  return initials.toUpperCase();
}

export const getStatusConfig = (status: ProjectStatusEnum) => {
  switch (status) {
    case ProjectStatusEnum.IN_PROGRESS:
      return {
        label: "Searching Vendor",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-0",
        variant: "pending",
        icon: ClockIcon,
      };
    case ProjectStatusEnum.VENDOR_FOUND:
      return {
        label: "Vendor Found",
        className: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-0",
        variant: "success",
        icon: TrafficConeIcon,
      };

    case ProjectStatusEnum.AWARDED:
      return {
        label: "Awarded",
        className: "bg-purple-100 text-purple-800 hover:bg-purple-100 border-0",
        variant: "success",
        icon: HandshakeIcon,
      };
    case ProjectStatusEnum.COMPLETED:
      return {
        label: "Completed",
        className: "bg-green-100 text-green-800 hover:bg-green-100 border-0",
        variant: "success",
        icon: CheckCircleIcon,
      };
  }
};

export const isImageUrl = (url: string) =>
  /\.(jpeg|jpg|png|webp|gif|svg)(\?|$)/i.test(url);

export const isVideoUrl = (url: string) =>
  /\.(mp4|webm|mov|avi)(\?|$)/i.test(url);
