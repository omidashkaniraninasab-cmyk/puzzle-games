import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'puzzle-games',
    audience: 'puzzle-games-users'
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'puzzle-games',
      audience: 'puzzle-games-users'
    });
  } catch (error) {
    throw new Error('توکن نامعتبر است');
  }
}

export function decodeToken(token) {
  return jwt.decode(token);
}