import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //  async rewrites() {
  //       return [
  //          {
  //              source: '/api/:path*',
  //              destination: 'http://localhost:4000/api/v1/:path*'
  //         },
  //       ];
  //     },
  devIndicators: false
};

export default nextConfig;
