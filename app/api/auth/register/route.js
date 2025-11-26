import { NextResponse } from 'next/server';
// import { generateToken } from '@/lib/auth/jwt'; // این خط مشکل دارد

export async function POST(request) {
  try {
    const { username, email, password, displayName } = await request.json();
    
    console.log('📝 Register attempt:', { username, email });
    
    // پاسخ موقت بدون JWT
    return NextResponse.json({
      success: true,
      message: 'سیستم ثبت‌نام فعال است',
      user: {
        id: 'temp-id-' + Date.now(),
        username,
        email, 
        displayName,
        role: 'user'
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در ثبت‌نام' },
      { status: 500 }
    );
  }
}