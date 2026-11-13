import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

const isCapacitorBuild = process.env.CAPACITOR_BUILD === "1";

const nextConfig: NextConfig = {
  // Allow local network IP for HMR and mobile testing
  allowedDevOrigins: ["localhost", "127.0.0.1", "26.213.92.234"],
  ...(isCapacitorBuild
    ? {
        output: "export",
        distDir: ".next-cap",
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withSerwist(nextConfig);
