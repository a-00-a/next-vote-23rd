import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  const setCookieHeader = res.headers.get('set-cookie');

  const response = NextResponse.json(data, { status: res.status });

  if (setCookieHeader) {
    const tokenMatch = setCookieHeader.match(/accessToken=([^;]+)/);

    if (tokenMatch) {
      response.cookies.set('accessToken', tokenMatch[1], {
        httpOnly: true,
        path: '/',
        maxAge: 3600,
        sameSite: 'lax',
      });
    }
  }

  return response;
}
