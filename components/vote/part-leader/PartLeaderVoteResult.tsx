'use client';

import { useState } from 'react';
import { PartLeaderResultResult } from '@/types/partLeader';

interface PartLeaderVoteResultProps {
  initialResult: PartLeaderResultResult | null;
}

export default function PartLeaderVoteResult({
  initialResult,
}: PartLeaderVoteResultProps) {
  const ranking = initialResult?.candidates ?? [];

  const [revealedMembers, setRevealedMembers] = useState<string[]>([]);

  const [shuffledRanking] = useState(() =>
    [...ranking].sort(() => Math.random() - 0.5)
  );

  const maxVotes = Math.max(...ranking.map((rank) => rank.voteCount));

  const winnerCount = ranking.filter(
    (rank) => rank.voteCount === maxVotes
  ).length;

  const foundWinnerCount = ranking.filter(
    (rank) => rank.voteCount === maxVotes && revealedMembers.includes(rank.name)
  ).length;

  const remainingWinnerCount = winnerCount - foundWinnerCount;

  const handleCardClick = (name: string) => {
    setRevealedMembers((prev) =>
      prev.includes(name) ? prev : [...prev, name]
    );
  };

  if (!initialResult) {
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
            투표가 모두 종료될 때까지 조금만 기다려 주세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-xl font-semibold text-primary">
        👑 {remainingWinnerCount}개의 왕관을 찾아보세요!
      </div>
      <div className="grid grid-cols-6 gap-y-4 gap-x-8">
        {shuffledRanking.map((rank, index) => {
          const isWinner = rank.voteCount === maxVotes;
          const isRevealed = revealedMembers?.includes(rank.name);

          return (
            <div
              key={rank.candidateId}
              className={`flex flex-col items-center justify-center col-span-2 ${
                index % 2 === 0 ? 'col-start-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => handleCardClick(rank.name)}
                className={`flex justify-center items-center w-74 h-18 px-21 py-5 rounded-lg m-4 cursor-pointer ${isRevealed ? 'bg-primary text-white border-none' : 'bg-white text-black border border-primary border-px'}`}
              >
                {isRevealed ? (
                  <div className="flex items-center gap-2">
                    <span>{rank.name}</span>
                    {isWinner && <span>👑</span>}
                  </div>
                ) : (
                  '누구게'
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
