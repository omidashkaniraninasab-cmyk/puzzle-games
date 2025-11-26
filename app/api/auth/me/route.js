import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ user: null });
    }

    // بررسی توکن
    const decoded = verifyToken(token);
    
    // فعلاً کاربر mock برمی‌گردانیم
    const user = {
      id: decoded.userId,
      username: 'testuser',
      displayName: 'کاربر تست', 
      email: decoded.email,
      role: decoded.role
    };

    return NextResponse.json({ user });

  } catch (error) {
    // اگر توکن نامعتبر است، cookie را پاک کن
    const response = NextResponse.json({ user: null });
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 0
    });
    
    return response;
  }
}