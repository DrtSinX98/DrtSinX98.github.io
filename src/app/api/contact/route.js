import { NextResponse } from 'next/server';
import { getDb, COLLECTIONS } from '@/lib/mongodb';

export const runtime = 'nodejs';

const MAX = { name: 200, email: 200, message: 5000 };

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
    }

    // Captured server-side; the old form asked ipify for this from the browser.
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'Unknown';

    const db = await getDb();
    await db.collection(COLLECTIONS.messages).insertOne({
      name,
      email,
      message,
      ip,
      userAgent: req.headers.get('user-agent') || '',
      read: false,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ error: 'Could not send message' }, { status: 500 });
  }
}
