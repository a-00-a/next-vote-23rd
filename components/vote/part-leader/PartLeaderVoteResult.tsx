'use client';

import { PartLeaderResultResult } from '@/types/partLeader';

interface PartLeaderVoteResultProps {
  initialData: PartLeaderResultResult | null;
}

export default function PartLeaderVoteResult({
  initialData,
}: PartLeaderVoteResultProps) {
  if (!initialData) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-2xl p-12 bg-white border border-gray-100 shadow-sm rounded-3xl min-h-[400px]">
        <div className="flex items-center justify-center w-20 h-20 mb-6 bg-gray-100 rounded-full">
          <span className="text-4xl">🔒</span>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-gray-800">
          결과가 아직 공개되지 않았습니다
        </h3>
        <p className="text-center text-gray-500">
          모든 투표가 완료되어야 결과를 확인할 수 있습니다.
          <br />
          투표 종료를 조금만 기다려 주세요!
        </p>
      </div>
    );
  }

  const ranking = initialData.candidates ?? [];
  const sortedRanking = [...ranking].sort((a, b) => b.voteCount - a.voteCount);

  const top3 = sortedRanking.slice(0, 3);
  const others = sortedRanking.slice(3);

  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl gap-10 mt-4 animate-in fade-in duration-500">
      <div className="flex items-end justify-center w-full gap-2 md:gap-8 h-[340px] md:h-[400px]">
        {podiumOrder.map((person) => {
          const rank =
            person.candidateId === top3[0]?.candidateId
              ? 1
              : person.candidateId === top3[1]?.candidateId
                ? 2
                : 3;

          return (
            <div
              key={person.candidateId}
              className="relative flex flex-col items-center justify-end w-28 md:w-44 group"
            >
              {/* 1등 전용 왕관 */}
              {rank === 1 && (
                <span className="absolute text-5xl -top-16 animate-bounce z-20">
                  👑
                </span>
              )}

              {/* 아바타 & 정보 */}
              <div className="z-10 flex flex-col items-center mb-4">
                <div
                  className={`overflow-hidden bg-white flex items-center justify-center rounded-full mb-3 shadow-md border-4 ${rank === 1 ? 'w-24 h-24 border-primary' : 'w-16 h-16 border-gray-100'}`}
                >
                  {person.imageUrl ? (
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span
                      className={`font-bold text-gray-400 ${rank === 1 ? 'text-3xl' : 'text-xl'}`}
                    >
                      {person.name.charAt(0)}
                    </span>
                  )}
                </div>
                <span
                  className={`font-bold text-center ${rank === 1 ? 'text-2xl text-primary' : 'text-lg text-gray-700'}`}
                >
                  {person.name}
                </span>
                <span className="text-sm font-semibold text-gray-500">
                  {person.voteCount}표
                </span>
              </div>

              {/* 시상대 단상 */}
              <div
                className={`w-full rounded-t-3xl shadow-lg transition-all duration-700 ease-out flex items-start justify-center pt-6
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
                  className={`text-5xl md:text-6xl font-black opacity-30 ${rank === 1 ? 'text-white' : ''}`}
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
          {others.map((person, index) => {
            const currentRank = index + 4;

            return (
              <div
                key={person.candidateId}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 shadow-sm md:p-5 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 md:gap-5">
                  <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-gray-400 bg-gray-100 rounded-full">
                    {currentRank}
                  </span>

                  {/* 미니 아바타 */}
                  <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                    {person.imageUrl ? (
                      <img
                        src={person.imageUrl}
                        alt={person.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="font-bold text-gray-400">
                        {person.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-base font-bold text-gray-700 md:text-lg">
                      {person.name}
                    </span>
                    <span className="text-xs font-medium text-gray-400 md:text-sm">
                      {person.affiliation}
                    </span>
                  </div>
                </div>

                <span className="text-lg font-bold text-gray-600">
                  {person.voteCount}표
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
