import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth/jwt';

// تابع برای گرفتن مدل User
async function getUserModel() {
  const { User } = await import('@/models/index.js');
  return User;
}

export async function POST(request) {
  try {
    const { username, email, password, displayName } = await request.json();
    
    console.log('📝 ثبت‌نام درخواست:', { username, email });
    
    // اعتبارسنجی
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

    const User = await getUserModel();

    // بررسی وجود کاربر
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'این ایمیل قبلاً ثبت شده است' },
        { status: 400 }
      );
    }

    // ایجاد کاربر جدید در دیتابیس
    const user = await User.create({
      username,
      email,
      password,
      displayName
    });

    console.log('✅ کاربر ایجاد شد:', user.id);

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
    console.error('❌ خطای ثبت‌نام:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در ثبت‌نام' },
      { status: 500 }
    );
  }
}