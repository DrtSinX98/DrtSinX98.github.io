import { NextResponse } from 'next/server';
import { COOKIE_NAME, verifyToken } from '@/lib/auth';

/**
 * Gate every admin page and admin API behind a valid session cookie.
 * Runs on the Edge runtime, hence `jose` rather than `jsonwebtoken`.
 */
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const session = await verifyToken(req.cookies.get(COOKIE_NAME)?.value);

  if (pathname.startsWith('/api/admin')) {
    // The login route issues the cookie, so it must stay reachable.
    if (pathname.startsWith('/api/admin/auth')) return NextResponse.next();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.next();
  }

  if (pathname === '/admin/login') {
    if (session) return NextResponse.redirect(new URL('/admin', req.url));
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    if (!session) {
      const url = new URL('/admin/login', req.url);
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
