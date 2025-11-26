import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth/jwt';

async function getUserModel() {
  const { User } = await import('@/models/index.js');
  return User;
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    console.log('🔐 ورود درخواست:', { email });

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'ایمیل و رمز عبور الزامی هستند' },
        { status: 400 }
      );
    }

    const User = await getUserModel();

    // پیدا کردن کاربر
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'ایمیل یا رمز عبور اشتباه است' },
        { status: 401 }
      );
    }

    // بررسی رمز عبور
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'ایمیل یا رمز عبور اشتباه است' },
        { status: 401 }
      );
    }

    console.log('✅ ورود موفق:', user.id);

    // ایجاد توکن
    const token = generateToken({
      userId: user.id,
      email: user.email
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email
      }
    });

    // ست کردن cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;

  } catch (error) {
    console.error('❌ خطای ورود:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در ورود' },
      { status: 500 }
    );
  }
}