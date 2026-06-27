import { cookies } from 'next/headers';
import PartLeaderVoteResult from '@/components/vote/part-leader/PartLeaderVoteResult';
import { getPartLeaderResult } from '@/lib/api/partLeader';

export default async function PartLeaderResult() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const serverHeaders: Record<string, string> = token
    ? { Cookie: `accessToken=${token}` }
    : {};

  const res = await getPartLeaderResult('FRONTEND', serverHeaders).catch(
    () => null
  );
  const resultData = res?.isSuccess ? res.result : null;

  return (
    <div className="flex flex-col items-center w-full min-h-screen px-4 py-16 bg-gray-50 gap-10">
      <div className="flex flex-col items-center justify-center gap-3 mt-10">
        <h1 className="text-primary text-[40px] md:text-[48px] font-bold tracking-tight text-center">
          🎉 파트장 투표 결과 🎉
        </h1>
        <h2 className="text-lg font-medium text-gray-500 md:text-xl text-center">
          {resultData
            ? `${resultData.partName} 파트를 이끌어갈 든든한 파트장은?`
            : '우리를 이끌어갈 든든한 파트장은 누구일까요?'}
        </h2>
      </div>

      <PartLeaderVoteResult initialData={resultData} />
    </div>
  );
}
