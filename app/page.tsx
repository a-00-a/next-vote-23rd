'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LandingPage() {
  const [showMain, setShowMain] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    if (!dotLottie) return;

    const handleLoop = () => {
      setLoopCount((prev) => {
        const nextCount = prev + 1;
        if (nextCount >= 2) {
          setShowMain(true);
        }
        return nextCount;
      });
    };

    dotLottie.addEventListener('loop', handleLoop);

    return () => {
      dotLottie.removeEventListener('loop', handleLoop);
    };
  }, [dotLottie]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-dvh bg-white overflow-hidden font-pretendard">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
          showMain ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="w-75 h-75">
          <DotLottieReact
            src="https://lottie.host/c0b69a2f-ec4f-4ada-a4a7-7226d1ba2808/lDQzOV70hp.lottie"
            loop
            autoplay
            dotLottieRefCallback={(dotLottieInstance) => setDotLottie(dotLottieInstance)}
          />
        </div>
      </div>

      <div
        className={`flex flex-col items-center justify-center gap-10 w-full px-6 transition-all duration-1000 ease-out delay-500 ${
          showMain
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight text-center whitespace-pre-line">
          이제는 투표도 <br className="md:hidden" />
          <span className="text-primary">Groupeat</span>에서
        </h1>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
          <Link
            href="/login"
            className="flex-1 flex justify-center items-center py-4 bg-primary text-white text-lg font-bold rounded-xl hover:bg-blue-800 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="flex-1 flex justify-center items-center py-4 bg-white text-primary text-lg font-bold border-[3px] border-primary rounded-xl hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
