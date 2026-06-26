'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/lib/fetch';
import { Team, Part } from '@/types/auth';
import { Eye, EyeOff } from 'lucide-react';
import { signup } from '@/lib/api/auth';

const TEAM_LABELS: Record<Team, string> = {
  CONX: 'ConX',
  DITDA: 'Ditda',
  GROUPEAT: 'Groupeat',
  IPX: 'IPX',
  JOBDRI: 'Jobdri',
};

export default function SignupForm() {
  const router = useRouter();
  const [part, setPart] = useState<Part>('FRONTEND');
  const [team, setTeam] = useState<Team>('CONX');
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const loginId = formData.get('loginId') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const inviteCode = formData.get('inviteCode') as string;

    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      await signup({ name, loginId, password, team, part, inviteCode });
      router.push('/login');
    } catch (err) {
      const error = err as ApiError;
      if (error.status === 500) {
        setError('초대 코드가 올바르지 않습니다.');
      } else setError(error.message ?? '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-dvh bg-[#FFFFFF] px-4 py-10 font-pretendard">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="hidden md:flex flex-col justify-between w-5/12 bg-blue-50/50 p-12">
          <div>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight leading-tight">
              함께 만들어가는
              <br />
              새로운 투표 문화,
            </h2>
            <p className="mt-4 text-primary/70 font-medium">
              Groupeat에서 시작해보세요.
            </p>
          </div>

          <div className="relative w-full h-48 opacity-80">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute top-10 right-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-14 lg:p-16 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 md:hidden">
            회원가입
          </h1>

          <div className="relative flex w-full p-1.5 bg-gray-100 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setPart('FRONTEND')}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${
                part === 'FRONTEND'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              프론트엔드
            </button>
            <button
              type="button"
              onClick={() => setPart('BACKEND')}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${
                part === 'BACKEND'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              백엔드
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="space-y-4">
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value as Team)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {(['CONX', 'DITDA', 'GROUPEAT', 'IPX', 'JOBDRI'] as Team[]).map(
                  (t) => (
                    <option key={t} value={t}>
                      {TEAM_LABELS[t]}
                    </option>
                  )
                )}
              </select>
              <input
                name="name"
                type="text"
                placeholder="이름"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
              <input
                name="loginId"
                type="text"
                placeholder="아이디"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호"
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="비밀번호 확인"
                  required
                  onBlur={(e) => {
                    const password = (
                      e.currentTarget.form?.elements.namedItem(
                        'password'
                      ) as HTMLInputElement
                    )?.value;
                    if (password !== e.target.value) {
                      setPasswordError('비밀번호가 일치하지 않습니다.');
                    } else {
                      setPasswordError(null);
                    }
                  }}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              <input
                name="inviteCode"
                type="text"
                placeholder="초대코드 입력"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-4 mt-6 bg-primary text-white text-lg font-bold rounded-xl hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:transform-none disabled:shadow-none cursor-pointer"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
