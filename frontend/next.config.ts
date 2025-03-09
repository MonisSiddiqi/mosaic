import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "s3.us-east-2.amazonaws.com" }],
  },
};

export default nextConfig;
