import Link from 'next/link';
import PartLeaderVoteForm from '@/components/vote/part-leader/PartLeaderVoteForm';
import { Candidate } from '@/types/partLeader'; // 타입 임포트 경로 확인해주세요

// 💡 API 통신이 불가할 때 UI를 확인하기 위한 목업 데이터
const MOCK_CANDIDATES: Candidate[] = [
  { candidateId: 1, name: '권가은', part: 'FRONTEND', partName: '프론트엔드', affiliation: '프론트엔드', imageUrl: null },
  { candidateId: 2, name: '신유진', part: 'FRONTEND', partName: '프론트엔드', affiliation: '프론트엔드', imageUrl: null },
  { candidateId: 3, name: '김문기', part: 'FRONTEND', partName: '프론트엔드', affiliation: '프론트엔드', imageUrl: 'https://ui-avatars.com/api/?name=김문기&background=random' }, // 👈 이미지 있을 때 UI 테스트용
  { candidateId: 4, name: '오예린', part: 'FRONTEND', partName: '프론트엔드', affiliation: '프론트엔드', imageUrl: null },
  { candidateId: 5, name: '김서연', part: 'FRONTEND', partName: '프론트엔드', affiliation: '프론트엔드', imageUrl: null },
  { candidateId: 6, name: '이예지', part: 'FRONTEND', partName: '프론트엔드', affiliation: '프론트엔드', imageUrl: null },
  { candidateId: 7, name: '노수진', part: 'FRONTEND', partName: '프론트엔드', affiliation: '프론트엔드', imageUrl: null },
  { candidateId: 8, name: '장효신', part: 'FRONTEND', partName: '프론트엔드', affiliation: '프론트엔드', imageUrl: null },
  { candidateId: 9, name: '배성준', part: 'FRONTEND', partName: '프론트엔드', affiliation: '프론트엔드', imageUrl: null },
  { candidateId: 10, name: '황영준', part: 'FRONTEND', partName: '프론트엔드', affiliation: '프론트엔드', imageUrl: null },
];

export default async function PartLeaderVote() {
  // 🚨 현재 401 에러로 인해 임시 주석 처리
  // const response = await getCandidates('FRONTEND');
  // const candidates = response.isSuccess ? response.result : [];

  // 💡 대신 목업 데이터를 사용합니다.
  const candidates = MOCK_CANDIDATES;

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-16 bg-gray-50 px-4 gap-12">
      {/* ─── 헤더 영역 ─── */}
      <div className="flex flex-col items-center justify-center gap-3 mt-10">
        <h1 className="text-[40px] md:text-[48px] font-bold text-gray-800 tracking-tight text-center">
          프론트 파트장 투표
        </h1>
        <p className="text-gray-500 text-lg">
          우리를 이끌어갈 프론트엔드 파트장에게 소중한 한 표를 행사해 주세요!
        </p>
      </div>

      {/* ─── 투표 폼 (클라이언트 컴포넌트) ─── */}
      <PartLeaderVoteForm initialCandidates={candidates} />

      {/* ─── 투표 결과 조회 링크 ─── */}
      <div className="mt-8">
        <Link
          href="/part-leader/result"
          className="text-gray-400 hover:text-gray-600 font-medium underline underline-offset-4 transition-colors"
        >
          투표 결과 조회하기
        </Link>
      </div>
    </div>
  );
}