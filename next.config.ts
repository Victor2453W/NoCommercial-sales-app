import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn1.ozone.ru',
      },
    ],
  },
};

export default nextConfig;
