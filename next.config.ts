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
  devIndicators: false,
   eslint: {
    ignoreDuringBuilds: true, // Disable during builds
  },
    serverRuntimeConfig: {
    apiTimeout: 30000,
  },

  async headers() {
    return [
      {
        source: '/api/auth/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://erp-final-fontend.vercel.app' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' }
        ]
      }
    ]
  }
};

export default nextConfig;
