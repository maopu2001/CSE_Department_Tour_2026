import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname:
          "/maopu2001/CSE_Department_Tour_2026/refs/heads/main/public/**",
      },
    ],
  },
};

export default nextConfig;
