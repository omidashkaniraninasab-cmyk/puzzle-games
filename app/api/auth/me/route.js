import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('👤 Me endpoint called');
    
    // فعلاً کاربر null برمی‌گردانیم
    return NextResponse.json({ 
      user: null,
      message: 'Endpoint is working'
    });

  } catch (error) {
    console.error('❌ Me error:', error);
    return NextResponse.json(
      { user: null, error: error.message },
      { status: 500 }
    );
  }
}