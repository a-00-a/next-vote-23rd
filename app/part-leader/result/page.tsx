import { cookies } from 'next/headers';
import { getPartLeaderResult } from '@/lib/api/partLeader';
import { PartLeaderResultResult } from '@/types/partLeader';
import PartLeaderVoteResult from '@/components/vote/part-leader/PartLeaderVoteResult';

export default async function PartLeaderResult() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const serverHeaders: Record<string, string> = token
    ? { Cookie: `accessToken=${token}` }
    : {};

  let result: PartLeaderResultResult | null = null;

  try {
    const res = await getPartLeaderResult('FRONTEND', serverHeaders);
    result = res.isSuccess ? res.result : null;
  } catch (err) {
    console.error('파트장 결과 조회 에러:', err);
  }

  return (
    <div className="flex flex-col w-full min-h-screen justify-center p-4 gap-10 bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-primary text-[48px] font-semibold tracking-tight">
          🎉 축하합니다! 🎉
        </h1>
        <h2 className="text-gray-600 text-xl font-medium">
          프론트 파트장 투표 결과
        </h2>
      </div>
      <PartLeaderVoteResult initialResult={result} />
    </div>
  );
}
