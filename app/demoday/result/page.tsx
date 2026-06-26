import { getDemodayResult } from '@/lib/api/demoday';

export default async function DemodayResult() {
  const response = await getDemodayResult();

  if (!response.isSuccess && response.code === 'VOTE4031') {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-50">
        <div className="flex flex-col items-center justify-center w-full max-w-2xl p-12 bg-white border border-gray-100 shadow-sm rounded-3xl min-h-[400px]">
          <div className="flex items-center justify-center w-20 h-20 mb-6 bg-gray-100 rounded-full">
            <span className="text-4xl">🔒</span>
          </div>
          <h3 className="mb-2 text-2xl font-bold text-gray-800">
            결과가 아직 공개되지 않았습니다
          </h3>
          <p className="text-center text-gray-500">
            아직 모든 투표가 완료되지 않아 결과를 조회할 수 없습니다.
            <br />
            투표가 모두 종료될 때까지 조금만 기다려 주세요!
          </p>
        </div>
      </div>
    );
  }

  const teams = response.result?.teams || [];
  const sortedTeams = [...teams].sort((a, b) => b.voteCount - a.voteCount);

  const top3 = sortedTeams.slice(0, 3);
  const others = sortedTeams.slice(3);

  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 pb-20 bg-gray-50 gap-14">
      <div className="flex flex-col items-center justify-center mt-12 gap-3">
        <h1 className="text-primary text-[48px] font-semibold tracking-tight">
          🎉 축하합니다! 🎉
        </h1>
        <h2 className="text-xl font-medium text-gray-600">
          데모데이 투표 결과
        </h2>
      </div>

      <div className="flex flex-col items-center w-full max-w-3xl gap-12">
        <div className="flex items-end justify-center w-full gap-2 md:gap-6 h-72 md:h-80 mt-10">
          {podiumOrder.map((team, idx) => {
            const rank =
              team.team === top3[0].team
                ? 1
                : team.team === top3[1].team
                  ? 2
                  : 3;

            return (
              <div
                key={team.team}
                className="flex flex-col items-center justify-end w-28 md:w-40 relative group"
              >
                {rank === 1 && (
                  <span className="absolute text-5xl -top-12 animate-bounce">
                    👑
                  </span>
                )}

                <div className="flex flex-col items-center mb-4 z-10">
                  <span
                    className={`font-bold text-center ${rank === 1 ? 'text-2xl text-primary' : 'text-lg text-gray-700'}`}
                  >
                    {team.teamName}
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    {team.voteCount}표
                  </span>
                </div>

                <div
                  className={`w-full rounded-t-2xl shadow-lg transition-all duration-700 ease-out flex items-start justify-center pt-4
                    ${
                      rank === 1
                        ? 'h-48 md:h-56 bg-primary text-white border-t-4 border-primary/20'
                        : rank === 2
                          ? 'h-36 md:h-44 bg-gray-200 text-gray-500'
                          : 'h-28 md:h-36 bg-orange-100 text-orange-600'
                    }
                  `}
                >
                  <span
                    className={`text-4xl md:text-5xl font-black opacity-30 ${rank === 1 ? 'text-white' : ''}`}
                  >
                    {rank}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {others.length > 0 && (
          <div className="flex flex-col w-full gap-3 mt-4">
            {others.map((team, index) => {
              const currentRank = index + 4;

              return (
                <div
                  key={team.team}
                  className="flex items-center justify-between p-5 bg-white border border-gray-100 shadow-sm rounded-2xl hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-gray-400 bg-gray-100 rounded-full">
                      {currentRank}
                    </span>
                    <span className="text-lg font-medium text-gray-700">
                      {team.teamName}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-600">
                    {team.voteCount}표
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
