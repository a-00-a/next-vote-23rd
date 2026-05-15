import PartLeaderVoteResult from '@/components/vote/part-leader/PartLeaderVoteResult';

export default function PartLeaderResult() {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center p-4 gap-10 bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-primary text-[48px] font-semibold tracking-tight">
          🎉 축하합니다! 🎉
        </h1>
        <h2 className="text-gray-600 text-xl font-medium">
          프론트 파트장 투표 결과
        </h2>
      </div>
      <PartLeaderVoteResult />
    </div>
  );
}
