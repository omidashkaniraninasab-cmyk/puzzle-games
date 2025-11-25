import { NextResponse } from 'next/server';

// ذخیره‌سازی درخواست‌ها بر اساس IP
const requests = new Map();

export function rateLimitMiddleware(request) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 دقیقه
  const maxRequests = 100; // حداکثر 100 درخواست در 15 دقیقه

  // اگر IP جدید است، ایجاد کن
  if (!requests.has(ip)) {
    requests.set(ip, []);
  }

  const userRequests = requests.get(ip);
  
  // حذف درخواست‌های قدیمی
  const validRequests = userRequests.filter(time => now - time < windowMs);
  requests.set(ip, validRequests);

  // اگر تعداد درخواست‌ها بیش از حد مجاز است
  if (validRequests.length >= maxRequests) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً کمی صبر کنید.' 
      },
      { status: 429 }
    );
  }

  // اضافه کردن درخواست فعلی
  validRequests.push(now);
  requests.set(ip, validRequests);

  // اضافه کردن هدرهای rate limit
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', maxRequests.toString());
  response.headers.set('X-RateLimit-Remaining', (maxRequests - validRequests.length).toString());
  response.headers.set('X-RateLimit-Reset', (now + windowMs).toString());

  return response;
}

// پاک‌سازی خودکار هر ساعت
setInterval(() => {
  const now = Date.now();
  for (const [ip, userRequests] of requests.entries()) {
    const validRequests = userRequests.filter(time => now - time < 15 * 60 * 1000);
    if (validRequests.length === 0) {
      requests.delete(ip);
    } else {
      requests.set(ip, validRequests);
    }
  }
}, 60 * 60 * 1000);