import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth/jwt';

// مدل User را مستقیماً import نکنیم - بعداً درست می‌کنیم
async function registerUser(userData) {
  // فعلاً یک mock function
  return {
    id: 'temp-id',
    username: userData.username,
    email: userData.email,
    displayName: userData.displayName,
    role: 'user'
  };
}

export async function POST(request) {
  try {
    const { username, email, password, displayName } = await request.json();
    
    // اعتبارسنجی ساده
    if (!username || !email || !password || !displayName) {
      return NextResponse.json(
        { success: false, message: 'تمام فیلدها الزامی هستند' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' },
        { status: 400 }
      );
    }

    // ایجاد کاربر (فعلاً mock)
    const user = await registerUser({
      username,
      email,
      password,
      displayName
    });

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
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در ثبت‌نام' },
      { status: 500 }
    );
  }
}