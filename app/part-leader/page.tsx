import { cookies } from 'next/headers';
import Link from 'next/link';
import PartLeaderVoteForm from '@/components/vote/part-leader/PartLeaderVoteForm';
import { getCandidates } from '@/lib/api/partLeader';

export default async function PartLeaderVote() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const serverHeaders: Record<string, string> = token
    ? { Cookie: `accessToken=${token}` }
    : {};

  const response = await getCandidates('FRONTEND', serverHeaders);
  const candidates = response.isSuccess ? (response.result ?? []) : [];

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-16 bg-gray-50 px-4 gap-12">
      <div className="flex flex-col items-center justify-center gap-3 mt-10">
        <h1 className="text-[40px] md:text-[48px] font-bold text-gray-800 tracking-tight text-center">
          프론트 파트장 투표
        </h1>
        <p className="text-gray-500 text-lg">
          우리를 이끌어갈 프론트엔드 파트장에게 소중한 한 표를 행사해 주세요!
        </p>
      </div>

      <PartLeaderVoteForm initialCandidates={candidates} />

      <div className="mt-8">
        <Link
          href="/part-leader/result"
          className="text-gray-400 hover:text-gray-600 font-medium underline underline-offset-4 transition-colors"
        >
          투표 결과 조회하기
        </Link>
      </div>
    </div>
  );
}
