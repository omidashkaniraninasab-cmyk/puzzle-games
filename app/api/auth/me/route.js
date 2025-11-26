import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('✅ درخواست وضعیت کاربر دریافت شد');
    
    // همیشه null برگردان - وضعیت واقعی بعداً
    return NextResponse.json({ 
      user: null,
      message: 'سیستم آماده است'
    });

  } catch (error) {
    console.error('❌ خطای وضعیت کاربر:', error);
    return NextResponse.json(
      { user: null, error: error.message },
      { status: 500 }
    );
  }
}