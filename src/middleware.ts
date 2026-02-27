import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // For API routes, remove any restrictive CSP
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Clear all CSP headers
    response.headers.delete('Content-Security-Policy');
    response.headers.delete('X-Content-Security-Policy');
    response.headers.delete('X-WebKit-CSP');
  }
  
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
