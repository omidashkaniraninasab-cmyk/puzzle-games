import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/auth/jwt';

export function authMiddleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // مسیرهای عمومی که نیاز به احراز هویت ندارند
  const publicPaths = [
    '/',
    '/auth/login',
    '/auth/register',
    '/api/auth/login',
    '/api/auth/register'
  ];

  // اگر کاربر در مسیر عمومی است، اجازه دسترسی بده
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // اگر توکن وجود ندارد و مسیر خصوصی است، به لاگین هدایت کن
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // بررسی اعتبار توکن
    const decoded = verifyToken(token);
    
    // اضافه کردن اطلاعات کاربر به header (برای استفاده در API routes)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-email', decoded.email);
    requestHeaders.set('x-user-role', decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // اگر توکن نامعتبر است، کوکی را پاک کن و به لاگین هدایت کن
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}