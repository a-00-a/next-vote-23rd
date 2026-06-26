import { fetchApi } from '@/lib/fetch';
import { API_ENDPOINTS } from '@/lib/constants';
import {
  DemodayVoteRequest,
  DemodayVoteResponse,
  DemodayLiveStatusResponse,
  DemodayResultResponse,
} from '@/types/demoday';

export const getDemodayLiveStatus = () =>
  fetchApi<DemodayLiveStatusResponse>(API_ENDPOINTS.DEMODAY.LIVE_STATUS);

export const voteForDemoday = (body: DemodayVoteRequest) =>
  fetchApi<DemodayVoteResponse>(API_ENDPOINTS.DEMODAY.VOTE, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const getDemodayResult = () =>
  fetchApi<DemodayResultResponse>(API_ENDPOINTS.DEMODAY.RESULT);
