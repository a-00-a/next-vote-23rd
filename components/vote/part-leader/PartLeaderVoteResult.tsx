'use client';

import { useState } from 'react';

const ranking = [
  {
    memberName: '권가은',
    votes: 1,
  },
  {
    memberName: '신유진',
    votes: 5,
  },
  {
    memberName: '김문기',
    votes: 8,
  },
  {
    memberName: '오예린',
    votes: 1,
  },
  {
    memberName: '김서연',
    votes: 2,
  },
  {
    memberName: '이예지',
    votes: 8,
  },
  {
    memberName: '노수진',
    votes: 3,
  },
  {
    memberName: '장효신',
    votes: 1,
  },
  {
    memberName: '배성준',
    votes: 4,
  },
  {
    memberName: '최민주',
    votes: 5,
  },
];

export default function PartLeaderVoteResult() {
  const [revealedMembers, setRevealedMembers] = useState<string[]>([]);

  const [shuffledRanking] = useState(
    () => [...ranking].sort(() => Math.random() - 0.5)
  );

  const maxVotes = Math.max(...ranking.map((rank) => rank.votes));

  const winnerCount = ranking.filter((rank) => rank.votes === maxVotes).length;

  const foundWinnerCount = ranking.filter(
    (rank) =>
      rank.votes === maxVotes && revealedMembers.includes(rank.memberName)
  ).length;

  const remainingWinnerCount = winnerCount - foundWinnerCount;

  const handleCardClick = (memberName: string) => {
    setRevealedMembers((prev) =>
      prev.includes(memberName) ? prev : [...prev, memberName]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 pl-">
      <div className="text-xl font-semibold text-primary">
        👑 {remainingWinnerCount}개의 왕관을 찾아보세요!
      </div>
      <div className="grid grid-cols-6 gap-y-4 gap-x-8">
        {shuffledRanking.map((rank, index) => {
          const isWinner = rank.votes === maxVotes;
          const isRevealed = revealedMembers?.includes(rank.memberName);

          return (
            <div
              key={rank.memberName}
              className={`flex flex-col items-center justify-center col-span-2 ${
                index % 2 === 0 ? 'col-start-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => handleCardClick(rank.memberName)}
                className={`flex justify-center items-center w-74 h-18 px-21 py-5 rounded-lg m-4 cursor-pointer ${isRevealed ? 'bg-primary text-white border-none' : 'bg-white text-black border border-primary border-px'}`}
              >
                {isRevealed ? (
                  <div className="flex items-center gap-2">
                    <span>{rank.memberName}</span>
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
