import Link from 'next/link';
import { cookies } from 'next/headers';
import DemodayVoteForm from '@/components/vote/demoday/DemodayVoteForm';
import TypewriterText from '@/components/common/TypewriterText';
import DemodayLiveStatus from '@/components/vote/demoday/DemodayLiveStatus';

import { getDemodayTeams, getDemodayLiveStatus } from '@/lib/api/demoday';
import { DemodayTeam, DemodayLiveStatusResult } from '@/types/demoday';

export default async function DemodayVote() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  console.log('token:', token);

  const serverHeaders: Record<string, string> = token
    ? { Cookie: `accessToken=${token}` }
    : {};

  let teamList: DemodayTeam[] = [];
  let liveStatus: DemodayLiveStatusResult | null = null;

  try {
    const [teamsRes, statusRes] = await Promise.all([
      getDemodayTeams(serverHeaders),
      getDemodayLiveStatus(serverHeaders),
    ]);
    console.log('teamsRes:', teamsRes);
    console.log('statusRes:', statusRes);

    teamList = teamsRes.isSuccess ? teamsRes.result : [];
    liveStatus = statusRes.isSuccess ? statusRes.result : null;
  } catch (err) {
    console.error('API 에러:', err);
  }

  // const teamList = teamsRes.isSuccess ? teamsRes.result : [];
  // const liveStatus = statusRes.isSuccess ? statusRes.result : null;

  return (
    <div className="w-full min-h-dvh bg-gray-50/50 flex justify-center items-center px-4 md:px-8 pt-12">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10 lg:gap-16">
        <section className="flex-3 flex flex-col gap-8">
          <TypewriterText text="데모데이에서 가장 우수한 팀에게 투표해주세요!" />
          <DemodayVoteForm initialTeams={teamList} />

          <Link
            href="/demoday/result"
            className="text-sm font-medium text-gray-400 hover:text-gray-600 underline underline-offset-4 transition-colors w-fit"
          >
            최종 결과 페이지로 이동
          </Link>
        </section>

        <section className="flex-2">
          {liveStatus ? (
            <div className="sticky top-12">
              <DemodayLiveStatus statusData={liveStatus} />
            </div>
          ) : (
            <div className="w-full h-40 bg-gray-100 rounded-3xl animate-pulse" />
          )}
        </section>
      </div>
    </div>
  );
}
