'use client';

import LoginForm from '@/components/login/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full min-h-dvh px-4 bg-white">
      <main className="flex flex-col items-center justify-center w-full max-w-sm gap-6">

        <h1 className="text-2xl font-bold text-gray-800">로그인</h1>

        <LoginForm />

        <Link
          href="/signup"
          className="text-sm text-gray-500 hover:text-gray-800 underline underline-offset-2 transition-colors"
        >
          회원가입
        </Link>
      </main>
    </div>
  );
}