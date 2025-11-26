import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth/jwt';

// تابع mock برای login - بعداً با دیتابیس جایگزین می‌شود
async function authenticateUser(email, password) {
  // فعلاً یک کاربر mock
  if (email === 'test@test.com' && password === 'password123') {
    return {
      id: 'user-123',
      username: 'testuser',
      email: 'test@test.com',
      displayName: 'کاربر تست',
      role: 'user'
    };
  }
  return null;
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // اعتبارسنجی
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'ایمیل و رمز عبور الزامی هستند' },
        { status: 400 }
      );
    }

    // احراز هویت کاربر
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'ایمیل یا رمز عبور اشتباه است' },
        { status: 401 }
      );
    }

    // ایجاد توکن
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        role: user.role
      }
    });

    // ست کردن cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 روز
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در ورود' },
      { status: 500 }
    );
  }
}