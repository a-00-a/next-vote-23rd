'use client';

import { useEffect, useState } from 'react';
import { CandidateDetail } from '@/types/partLeader';
import { getCandidateDetail } from '@/lib/api/partLeader';
import { getProfileImageUrl } from '@/lib/utils/avatar';

interface CandidateModalProps {
  candidateId: number | null;
  onClose: () => void;
}

export default function CandidateModal({
  candidateId,
  onClose,
}: CandidateModalProps) {
  const [candidate, setCandidate] = useState<CandidateDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!candidateId) return;

    const fetchCandidate = async () => {
      setIsLoading(true);
      try {
        const res = await getCandidateDetail(candidateId);
        if (res.isSuccess) {
          setCandidate(res.result);
        }
      } catch (err) {
        console.error('후보 상세 조회 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  if (!candidateId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : candidate ? (
          <div className="flex flex-col items-center gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20">
              <img
                src={candidate.imageUrl ?? getProfileImageUrl(candidate.name)}
                alt={candidate.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {candidate.name}
              </h2>
              <p className="text-gray-500 font-medium">
                {candidate.affiliation}
              </p>
            </div>
            <div className="w-full bg-gray-50 rounded-2xl p-5">
              <p className="text-gray-600 leading-relaxed text-center">
                {candidate.description}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">
            정보를 불러올 수 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
