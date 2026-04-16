import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["www.allyonoogames.com", "allyonoogames.com"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
