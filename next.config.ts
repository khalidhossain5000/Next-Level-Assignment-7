/** biome-ignore-all lint/suspicious/noConfusingLabels: <explanation> */
/** biome-ignore-all lint/complexity/noUselessLoneBlockStatements: <explanation> */
/** biome-ignore-all lint/correctness/noUnusedLabels: <explanation> */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
    ],
    unoptimized: true 
  },
  output: "export",
  
};

export default nextConfig;