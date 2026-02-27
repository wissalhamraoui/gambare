import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    'preview-chat-72d2561b-7b83-4e60-ad3b-a269bcddf996.space.z.ai',
    '.space.z.ai',
    'localhost:3000',
  ],
  // Disable CSP completely for API routes - allows AI SDK to work
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: '',
          },
          {
            key: 'X-Content-Security-Policy',
            value: '',
          },
          {
            key: 'X-WebKit-CSP',
            value: '',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' * data: blob: filesystem: about: ws: wss: http: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' * blob: data:; style-src 'self' 'unsafe-inline' * data:; img-src 'self' * data: blob: filesystem: http: https:; font-src 'self' * data: blob:; connect-src 'self' * http: https: ws: wss: blob: data:; worker-src 'self' * blob: data:;",
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
