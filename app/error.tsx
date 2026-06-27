'use client'; // Error boundary는 반드시 클라이언트 컴포넌트여야 합니다.

import { useEffect } from 'react';
import Link from 'next/link';

export default function DemodayResultError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Demoday Result Page Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-50">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl p-12 bg-white border border-gray-100 shadow-sm rounded-3xl min-h-[400px]">
        {/* 🚨 에러 아이콘 */}
        <div className="flex items-center justify-center w-20 h-20 mb-6 bg-red-50 rounded-full text-red-500">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h3 className="mb-2 text-2xl font-bold text-gray-800">
          데이터를 불러오지 못했습니다
        </h3>
        <p className="mb-8 text-center text-gray-500">
          서버 오류가 발생하여 투표 결과를 가져올 수 없습니다.<br />
          잠시 후 다시 시도해 주세요.
        </p>

        <div className="flex gap-4">
          <Link
            href="/"
            className="px-6 py-3 font-medium text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
          >
            홈으로 가기
          </Link>
          <button
            onClick={() => reset()}
            className="cursor-pointer px-6 py-3 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90 shadow-sm"
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>
  );
}