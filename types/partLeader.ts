import { Part } from './auth';
import { ApiResponseWrapper } from './common';

export interface PartLeaderVoteRequest {
  candidateId: number;
}

export interface PartLeaderVoteResult {
  voteId: number;
  candidateId: number;
  candidateName: string;
}

export type PartLeaderVoteResponse = ApiResponseWrapper<PartLeaderVoteResult>;

export interface PartLeaderResultCandidate {
  candidateId: number;
  name: string;
  affiliation: string;
  imageUrl: string | null;
  voteCount: number;
}

export interface PartLeaderResultResult {
  part: Part;
  partName: string;
  candidates: PartLeaderResultCandidate[];
}

export type PartLeaderResultResponse =
  ApiResponseWrapper<PartLeaderResultResult>;

export interface Candidate {
  candidateId: number;
  name: string;
  part: Part;
  partName: string;
  affiliation: string;
  imageUrl: string | null;
}

export type CandidateListResponse = ApiResponseWrapper<Candidate[]>;

export interface CandidateDetail extends Candidate {
  description: string;
}

export type CandidateDetailResponse = ApiResponseWrapper<CandidateDetail>;
