'use client';

import LoginForm from '@/components/login/LoginForm';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full min-h-dvh pl-46.5">
      <main className="flex flex-col items-center justify-center w-full px-45 py-60 gap-4">
        <LoginForm />
        <Link
          href="/signup"
          className="ml-4 text-lg text-gray-500 hover:text-gray-700"
        >
          회원가입
        </Link>
      </main>
    </div>
  );
}
