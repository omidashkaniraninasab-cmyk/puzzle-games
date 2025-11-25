import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const credentials = await request.json();
    
    // برای تست - بعداً با دیتابیس جایگزین می‌شود
    if (credentials.email === 'test@test.com' && credentials.password === 'password') {
      const response = NextResponse.json({
        success: true,
        user: {
          id: '1',
          email: 'test@test.com',
          firstName: 'کاربر',
          lastName: 'تست'
        }
      });
      
      response.cookies.set('token', 'test-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60
      });
      
      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'ایمیل یا رمز عبور اشتباه است' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'خطای سرور' },
      { status: 500 }
    );
  }
}