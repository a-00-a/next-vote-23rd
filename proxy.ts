import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { COOKIE_NAME } from '@/lib/constants';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET이 설정되지 않았습니다.');
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const PUBLIC_PATHS = ['/', '/login', '/signup'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN)?.value;

  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  if (isPublic) {
    if (pathname === '/login' || pathname === '/signup') {
      if (token) {
        try {
          await jwtVerify(token, secret);
          return NextResponse.redirect(new URL('/demoday', request.url));
        } catch {
          return NextResponse.next();
        }
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|proxy|_next|static|favicon.ico|logo-ceos.svg|assets).*)'],
};
