import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    // Points to the directory where your primary pnpm-lock.yaml lives
    root: "./",
  },
};

export default nextConfig;
