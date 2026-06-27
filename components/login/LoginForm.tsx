'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { ApiError } from '@/lib/fetch';
import { useAuthStore } from '@/store/authStore';
import { login } from '@/lib/api/auth';

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginId = formData.get('loginId') as string;
    const password = formData.get('password') as string;

    setIsLoading(true);
    setError(null);

    try {
      const data = await login({ loginId, password });
      setUser(data.result.user);
      router.push('/demoday');
    } catch (err) {
      const error = err as ApiError;
      if (error.status === 401) {
        setError('아이디 또는 비밀번호가 틀렸습니다.');
      } else if (error.status === 400) {
        setError('입력 정보를 다시 확인해주세요.');
      } else {
        setError(error.message ?? '로그인에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <input
        name="loginId"
        type="text"
        className="w-full h-12 px-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        placeholder="아이디를 입력해주세요"
      />
      <div className="relative">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          className="w-full h-12 px-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="비밀번호를 입력해주세요"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="cursor-pointer w-full h-12 mt-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:bg-gray-400 transition-all"
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
