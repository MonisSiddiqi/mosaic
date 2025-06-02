import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "s3.us-east-2.amazonaws.com" },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],
  },
  // next.config.js

  async rewrites() {
    return [
      {
        source: "/api/:path*", // Next.js route
        destination: "http://localhost:5000/api/:path*", // Your NestJS backend
      },
    ];
  },
};

export default nextConfig;
