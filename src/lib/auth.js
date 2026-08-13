import { SignJWT, jwtVerify } from 'jose';

export const COOKIE_NAME = 'vortex_admin';
const ISSUER = 'vortex';
const AUDIENCE = 'vortex-admin';
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function secretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set. Add it to .env.local');
  return new TextEncoder().encode(secret);
}

export async function signToken(payload = {}) {
  return new SignJWT({ ...payload, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

/** Returns the decoded payload, or null when the token is missing/invalid/expired. */
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    return payload;
  } catch {
    return null;
  }
}

export const cookieOptions = {
  name: COOKIE_NAME,
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: MAX_AGE_SECONDS,
};
