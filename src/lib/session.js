import 'server-only';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifyToken } from './auth';

/** Decoded admin session for the current request, or null. */
export async function getSession() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}

/** Throws a 401-shaped error when the caller is not an authenticated admin. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }
  return session;
}
