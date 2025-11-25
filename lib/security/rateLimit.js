const rateLimitMap = new Map();

export function rateLimit(ip, windowMs = 900000, maxRequests = 100) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip).filter(time => time > windowStart);
  rateLimitMap.set(ip, requests);

  if (requests.length >= maxRequests) {
    return false;
  }

  requests.push(now);
  return true;
}

export function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, requests] of rateLimitMap.entries()) {
    const validRequests = requests.filter(time => time > now - 900000);
    if (validRequests.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, validRequests);
    }
  }
}

// Run cleanup every 15 minutes
setInterval(cleanupRateLimit, 900000);