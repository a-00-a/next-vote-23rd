import { fetchApi } from '@/lib/fetch';
import { API_ENDPOINTS } from '@/lib/constants';
import { Part } from '@/types/auth';
import {
  PartLeaderVoteRequest,
  PartLeaderVoteResponse,
  CandidateListResponse,
  CandidateDetail,
  PartLeaderResultResponse,
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

export const getCandidateDetail = (userId: number) =>
  fetchApi<CandidateDetail>(
    `${API_ENDPOINTS.PART_LEADER.CANDIDATES}/${userId}`
  );

export const voteForPartLeader = (body: PartLeaderVoteRequest) =>
  fetchApi<PartLeaderVoteResponse>(API_ENDPOINTS.PART_LEADER.VOTE, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const getPartLeaderResult = (part: Part) =>
  fetchApi<PartLeaderResultResponse>(
    `${API_ENDPOINTS.PART_LEADER.RESULT}?part=${part}`
  );
