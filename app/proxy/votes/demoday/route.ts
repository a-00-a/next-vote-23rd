import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  console.log('token:', token);
  console.log('body:', body);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/votes/demoday`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  console.log('res.status:', res.status);
  const data = await res.json();
  console.log('data:', data);

  return NextResponse.json(data, { status: res.status });
}
