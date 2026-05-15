import DemodayVoteForm from "@/components/vote/demoday/DemodayVoteForm";

export default function DemodayVote() {
    return (
        <div className="w-full min-h-dvh flex flex-col items-center justify-center gap-10 pl-46.5">
            <div className="flex items-center justify-center w-100 h-20 rounded-lg bg-primary text-white text-2xl font-bold">데모데이 팀 투표</div>
            <DemodayVoteForm />
        </div>
    )
}