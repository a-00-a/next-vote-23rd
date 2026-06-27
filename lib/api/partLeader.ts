import { fetchApi } from '@/lib/fetch';
import { API_ENDPOINTS } from '@/lib/constants';
import { Part } from '@/types/auth';
import {
  PartLeaderVoteRequest,
  PartLeaderVoteResponse,
  CandidateListResponse,
  PartLeaderResultResponse,
  CandidateDetailResponse,
} from '@/types/partLeader';

export const getCandidates = (
  part: Part,
  serverHeaders?: Record<string, string>
) =>
  fetchApi<CandidateListResponse>(
    `${API_ENDPOINTS.PART_LEADER.CANDIDATES}?part=${part}`,
    {},
    serverHeaders
  );

export const getCandidateDetail = (candidateId: number) =>
  fetchApi<CandidateDetailResponse>(
    `${API_ENDPOINTS.PART_LEADER.CANDIDATE_DETAIL}/${candidateId}`
  );

export const voteForPartLeader = (body: PartLeaderVoteRequest) =>
  fetchApi<PartLeaderVoteResponse>(API_ENDPOINTS.PART_LEADER.VOTE, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const getPartLeaderResult = (
  part: Part,
  serverHeaders?: Record<string, string>
) =>
  fetchApi<PartLeaderResultResponse>(
    `${API_ENDPOINTS.PART_LEADER.RESULT}?part=${part}`,
    { headers: serverHeaders }
  );
