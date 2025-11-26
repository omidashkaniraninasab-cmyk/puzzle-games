import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    console.log('✅ درخواست ورود دریافت شد:', { email });

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'ایمیل و رمز عبور الزامی هستند' },
        { status: 400 }
      );
    }

    // کاربر mock - هر ایمیل/رمز عبور کار می‌کند
    const userData = {
      id: 'user-123',
      username: 'user-' + Date.now(),
      displayName: 'کاربر تست',
      email: email,
      totalScore: 100,
      rank: 1
    };

    console.log('✅ ورود موفق:', userData.id);

    const response = NextResponse.json({
      success: true,
      message: 'ورود موفقیت‌آمیز بود',
      user: userData
    });

    return response;

  } catch (error) {
    console.error('❌ خطای ورود:', error);
    return NextResponse.json(
      { success: false, message: 'خطای سرور' },
      { status: 500 }
    );
  }
}