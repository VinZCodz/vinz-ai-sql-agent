import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', // Allow local development
        'ominous-fishstick-9x6ppqpjrr6h7q6v-3000.app.github.dev',
        // Add any other domains where your application might be deployed
      ],
    },
  },
};

export default nextConfig;
