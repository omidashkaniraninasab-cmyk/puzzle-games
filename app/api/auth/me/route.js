import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

async function getUserModel() {
  const { User } = await import('@/models/index.js');
  return User;
}

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ user: null });
    }

    // بررسی توکن
    const decoded = verifyToken(token);
    
    const User = await getUserModel();
    
    // پیدا کردن کاربر از دیتابیس
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['password'] } // رمز عبور را برنگردان
    });

    if (!user) {
      // اگر کاربر پیدا نشد، cookie را پاک کن
      const response = NextResponse.json({ user: null });
      response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0
      });
      return response;
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        totalScore: user.totalScore,
        rank: user.rank
      }
    });

  } catch (error) {
    console.error('❌ خطای Me:', error);
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