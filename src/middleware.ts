import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Remove restrictive CSP and set permissive one for AI SDK
  response.headers.delete('Content-Security-Policy');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-eval' 'unsafe-inline' * data: blob: filesystem: about: ws: wss: http: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' 'unsafe-hashes' * blob: data:; script-src-elem 'self' 'unsafe-inline' * blob:; script-src-attr 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' * data:; img-src 'self' * data: blob: filesystem: http: https:; font-src 'self' * data: blob:; connect-src 'self' * http: https: ws: wss: blob: data:; worker-src 'self' * blob: data:; frame-src 'self' * data: blob:; frame-ancestors 'self' *; form-action 'self' *; base-uri 'self' *; object-src 'self' * blob: data:;"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
