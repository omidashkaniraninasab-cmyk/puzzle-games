import { NextResponse } from 'next/server';
import { authMiddleware } from './middleware/auth';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { securityMiddleware } from './middleware/security';

export function middleware(request) {
  // اعمال middleware امنیتی
  const securityResponse = securityMiddleware(request);
  if (securityResponse.status !== 200) {
    return securityResponse;
  }

  // اعمال rate limiting برای API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const rateLimitResponse = rateLimitMiddleware(request);
    if (rateLimitResponse.status !== 200) {
      return rateLimitResponse;
    }
  }

  // اعمال احراز هویت
  const authResponse = authMiddleware(request);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  return NextResponse.next();
}

// تنظیم مسیرهایی که middleware روی آنها اجرا می‌شود
export const config = {
  matcher: [
    /*
     * match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};