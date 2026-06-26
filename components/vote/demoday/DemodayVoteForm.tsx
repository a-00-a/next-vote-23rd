'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DemodayTeam, DemodayVoteRequest } from '@/types/demoday';
import { voteForDemoday } from '@/lib/api/demoday';

interface DemodayVoteFormProps {
  initialTeams: DemodayTeam[];
}

export default function DemodayVoteForm({
  initialTeams,
}: DemodayVoteFormProps) {
  const router = useRouter();

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId);
  };

  const handleVoteSubmit = async () => {
    if (!selectedTeam) return;

    setIsSubmitting(true);
    try {
      const payload: DemodayVoteRequest = { 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        team: selectedTeam as any
      };

      const response = await voteForDemoday(payload);

      if (response.isSuccess) {
        alert('투표가 성공적으로 완료되었습니다!');
        
        // 💡 투표 성공 시, 서버 컴포넌트들의 데이터를 다시 패칭하여 실시간 현황 업데이트
        router.refresh(); 
      } else {
        alert(response.message || '투표 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('[Vote Error]:', error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false); // 로딩 상태 해제
    }
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {initialTeams.map((teamData) => {
          const isSelected = selectedTeam === teamData.team;

          return (
            <button
              key={teamData.team}
              onClick={() => handleTeamSelect(teamData.team)}
              disabled={isSubmitting} // 💡 제출 중일 때 폼 조작 방지
              className={`cursor-pointer relative flex items-center justify-center p-6 md:p-8 rounded-2xl text-lg font-bold transition-all duration-300 ease-out outline-none
                ${
                  isSelected
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105 border border-primary'
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/40 hover:-translate-y-1'
                }
              `}
            >
              {teamData.teamName}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleVoteSubmit}
        disabled={!selectedTeam || isSubmitting}
        className="cursor-pointer w-full md:w-64 mx-auto py-4 rounded-xl bg-primary text-white text-lg font-bold transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-primary/90 hover:shadow-lg active:scale-95"
      >
        {isSubmitting ? '처리 중...' : '투표 완료'}
      </button>
    </div>
  );
}
