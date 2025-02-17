import { API_URL } from "@/config";
import { clsx, type ClassValue } from "clsx";
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
