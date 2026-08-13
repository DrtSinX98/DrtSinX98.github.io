import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { signToken, cookieOptions } from '@/lib/auth';

export const runtime = 'nodejs';

// Small in-memory throttle. Enough to stop casual brute-forcing of a single
// shared password; it resets when the serverless instance recycles.
const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function rateLimited(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    attempts.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';

  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  try {
    const { password } = await req.json();
    if (!password) return NextResponse.json({ error: 'Password is required' }, { status: 400 });

    const db = await getDb();
    const record = await db.collection(COLLECTIONS.settings).findOne({ key: 'admin' });

    const valid = record?.passwordHash
      ? bcrypt.compareSync(password, record.passwordHash)
      : Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD;

    if (!valid) return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });

    attempts.delete(ip);

    const token = await signToken({ sub: 'admin' });
    const res = NextResponse.json({ ok: true });
    res.cookies.set({ ...cookieOptions, value: token });
    return res;
  } catch (err) {
    console.error('[login]', err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
