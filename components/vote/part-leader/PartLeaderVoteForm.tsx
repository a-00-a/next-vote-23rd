'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Candidate, PartLeaderVoteRequest } from '@/types/partLeader'; 
import { voteForPartLeader } from '@/lib/api/partLeader';

interface PartLeaderVoteFormProps {
  initialCandidates: Candidate[];
}

export default function PartLeaderVoteForm({
  initialCandidates,
}: PartLeaderVoteFormProps) {
  const router = useRouter();
  
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMemberSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleVoteSubmit = async () => {
    if (!selectedId) return;

    setIsSubmitting(true);
    try {
      const payload = {
        candidateId: selectedId,
      } as PartLeaderVoteRequest;

      const response = await voteForPartLeader(payload);

      if (response.isSuccess) {
        alert('투표가 성공적으로 완료되었습니다!');
        router.refresh();
      } else {
        alert(response.message || '투표 처리에 실패했습니다.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('[Vote Error]:', error);
      alert(error.message || '네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl gap-10">
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full">
        {initialCandidates.map((candidate) => {
          const isSelected = selectedId === candidate.candidateId;

          return (
            <div
              key={candidate.candidateId}
              onClick={() => !isSubmitting && handleMemberSelect(candidate.candidateId)}
              className={`relative flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 ease-out border-2 bg-white
                ${
                  isSelected
                    ? 'border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'border-transparent shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/30'
                }
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <button
                type="button"
                className="absolute top-3 right-3 p-1 text-gray-300 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  
                  {/* TODO: 동료 작업 영역 - getCandidateDetail(candidate.candidateId) 호출 및 모달 오픈 로직 작성 */}
                  console.log(`모달 오픈 준비: ${candidate.candidateId}번 후보`);
                }}
                aria-label="상세 정보 보기"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <div className="w-16 h-16 mb-4 overflow-hidden bg-gray-100 rounded-full flex items-center justify-center ring-4 ring-gray-50">
                {candidate.imageUrl ? (
                  <img
                    src={candidate.imageUrl}
                    alt={candidate.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-400">
                    {candidate.name.charAt(0)}
                  </span>
                )}
              </div>

              <span className="text-lg font-bold text-gray-800">
                {candidate.name}
              </span>
              <span className="text-sm font-medium text-gray-400 mt-0.5">
                {candidate.affiliation}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleVoteSubmit}
        disabled={!selectedId || isSubmitting}
        className="flex items-center justify-center w-full md:w-80 h-14 mt-4 rounded-xl bg-primary text-white text-lg font-bold transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-primary/90 hover:shadow-lg active:scale-95"
      >
        {isSubmitting ? '처리 중...' : '투표 완료'}
      </button>
    </div>
  );
}