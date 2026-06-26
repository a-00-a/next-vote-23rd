import { cookies } from 'next/headers';
import { getDemodayResult } from '@/lib/api/demoday';
import { DemodayResultResult } from '@/types/demoday';

export default async function DemodayResult() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const serverHeaders: Record<string, string> = token
    ? { Cookie: `accessToken=${token}` }
    : {};

  let result: DemodayResultResult | null = null;

  try {
    const resultRes = await getDemodayResult(serverHeaders);
    result = resultRes.isSuccess ? resultRes.result : null;
  } catch (err) {
    console.error('결과 조회 에러:', err);
  }

  // result가 null이면 아직 투표 중
  if (!result) {
    return (
      <div className="flex flex-col w-full min-h-screen justify-center items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-600">
          아직 투표가 진행 중입니다.
        </h1>
        <p className="text-gray-400">
          모든 투표가 완료된 후 결과를 확인할 수 있어요.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen justify-center p-4 gap-10 bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-primary text-[48px] font-semibold tracking-tight">
          🎉 축하합니다! 🎉
        </h1>
        <h2 className="text-gray-600 text-xl font-medium">
          데모데이 투표 결과
        </h2>
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-3xl overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50/50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold text-center">순위</th>
                <th className="px-6 py-4 font-semibold text-center">팀명</th>
                <th className="px-6 py-4 font-semibold text-center">투표 수</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {result?.teams.map((team, index) => (
                <tr
                  key={team.team}
                  className="transition-colors hover:bg-gray-50/80"
                >
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                        index === 0
                          ? 'bg-yellow-100 text-yellow-600'
                          : index === 1
                            ? 'bg-gray-200 text-gray-600'
                            : index === 2
                              ? 'bg-orange-100 text-orange-600'
                              : 'text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center font-medium text-gray-800">
                    {team.teamName}
                  </td>
                  <td className="px-6 py-5 text-center font-semibold text-primary">
                    {team.voteCount} 표
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
