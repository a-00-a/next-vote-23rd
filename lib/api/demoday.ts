import { fetchApi } from '@/lib/fetch';
import { API_ENDPOINTS } from '@/lib/constants';
import {
  DemodayVoteRequest,
  DemodayVoteResponse,
  DemodayLiveStatusResponse,
  DemodayResultResponse,
  DemodayTeamListResponse,
} from '@/types/demoday';

export const getDemodayLiveStatus = (serverHeaders?: Record<string, string>) =>
  fetchApi<DemodayLiveStatusResponse>(
    API_ENDPOINTS.DEMODAY.LIVE_STATUS,
    {},
    serverHeaders
  );

export const voteForDemoday = (body: DemodayVoteRequest) =>
  fetchApi<DemodayVoteResponse>(API_ENDPOINTS.DEMODAY.VOTE, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const getDemodayResult = (serverHeaders?: Record<string, string>) =>
  fetchApi<DemodayResultResponse>(
    API_ENDPOINTS.DEMODAY.RESULT,
    {},
    serverHeaders
  );

export const getDemodayTeams = (serverHeaders?: Record<string, string>) => {
  console.log('getDemodayTeams 호출', serverHeaders);
  return fetchApi<DemodayTeamListResponse>(
    API_ENDPOINTS.DEMODAY.TEAMS,
    {},
    serverHeaders
  );
};
