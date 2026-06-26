'use client';

import { DemodayLiveStatusResult } from '@/types/demoday';

interface LiveStatusProps {
  statusData: DemodayLiveStatusResult;
}

export default function DemodayLiveStatus({ statusData }: LiveStatusProps) {
  const sortedTeams = [...statusData.teams].sort((a, b) => b.voteCount - a.voteCount);

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      <div className="flex items-end justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">실시간 투표 현황</h3>
        <p className="text-sm text-gray-500 font-medium">
          총 {statusData.votedCount}명 참여
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {sortedTeams.map((team) => {
          const percent = statusData.totalVoterCount === 0 
            ? 0 
            : (team.voteCount / statusData.totalVoterCount) * 100;

          return (
            <div key={team.team} className="w-full">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="font-semibold text-gray-700">{team.teamName}</span>
                <span className="font-bold text-primary">{team.voteCount}표</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}