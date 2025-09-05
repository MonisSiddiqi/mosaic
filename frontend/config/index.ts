import pkg from "@/package.json";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
export const VERSION = pkg.version;
