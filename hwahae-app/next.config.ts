import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.hwahae.co.kr",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
