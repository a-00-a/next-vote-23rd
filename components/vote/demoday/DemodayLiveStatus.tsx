'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DemodayLiveStatusResult } from '@/types/demoday';

interface LiveStatusProps {
  statusData: DemodayLiveStatusResult;
}

export default function DemodayLiveStatus({ statusData }: LiveStatusProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  const sortedTeams = [...statusData.teams].sort(
    (a, b) => b.voteCount - a.voteCount
  );
  const maxVoteCount = sortedTeams.length > 0 ? sortedTeams[0].voteCount : 1;

  return (
    <div className="w-full p-6 bg-white border border-gray-100 shadow-sm rounded-3xl md:p-8">
      <div className="flex items-end justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-gray-800">실시간 투표 현황</h3>
        </div>
        <p className="text-sm font-medium text-gray-500">
          총 {statusData.votedCount}명 참여
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {sortedTeams.map((team) => {
          const targetPercent =
            maxVoteCount === 0 ? 0 : (team.voteCount / maxVoteCount) * 100;

          return (
            <div key={team.team} className="w-full">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="font-semibold text-gray-700">
                  {team.teamName}
                </span>
                <span className="font-bold text-primary">
                  {team.voteCount}표
                </span>
              </div>
              <div className="w-full h-3 overflow-hidden bg-gray-100 rounded-full">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                  style={{ width: isMounted ? `${targetPercent}%` : '0%' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
