import Link from 'next/link';
import PartLeaderVoteForm from '@/components/vote/part-leader/PartLeaderVoteForm';

export default function DemodayVote() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center w-100 h-20 rounded-lg bg-primary text-white text-2xl font-bold">
        프론트 파트장 투표
      </div>
      <PartLeaderVoteForm />
      <Link
        href="/part-leader-result"
        className="ml-4 text-lg text-gray-500 hover:text-gray-700"
      >
        프론트파트장결과page 확인용
      </Link>
    </div>
  );
}
