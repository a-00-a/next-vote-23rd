import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `accessToken=${token}`,
    },
  });

  const response = NextResponse.json({ isSuccess: true });

  response.cookies.set('accessToken', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}
