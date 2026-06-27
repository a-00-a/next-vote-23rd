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
        <h3 className="mb-2 text-2xl font-bold text-gray-800 text-center">
          아직 모든 인원의 투표가 완료되지 않았습니다!
          <br />
          투표 결과를 기대해주세요 🥳
        </h3>

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