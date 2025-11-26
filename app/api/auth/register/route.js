import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, email, password, displayName } = await request.json();
    
    console.log('✅ ثبت‌نام درخواست دریافت شد:', { username, email });
    
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

    // پاسخ موفق با mock data
    const userData = {
      id: 'user-' + Date.now(),
      username,
      displayName,
      email,
      totalScore: 0,
      rank: 0
    };

    console.log('✅ کاربر mock ایجاد شد:', userData.id);

    const response = NextResponse.json({
      success: true,
      message: 'ثبت‌نام موفقیت‌آمیز بود',
      user: userData
    });

    return response;

  } catch (error) {
    console.error('❌ خطای ثبت‌نام:', error);
    return NextResponse.json(
      { success: false, message: 'خطای سرور' },
      { status: 500 }
    );
  }
}