import { NextResponse } from 'next/server';

export async function GET(request) {
  // برای تست، کاربر null برمی‌گردانیم
  return NextResponse.json({ user: null });
}