import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    console.log('🔐 Login attempt:', { email });
    
    // پاسخ موقت
    return NextResponse.json({
      success: true,
      message: 'ورود موفقیت‌آمیز (موقت)',
      user: {
        id: 'user-123',
        username: 'testuser',
        displayName: 'کاربر تست',
        email: email,
        role: 'user'
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در ورود' },
      { status: 500 }
    );
  }
}