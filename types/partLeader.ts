import { Part, Team } from './auth';
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
  userId: number;
  name: string;
  teamName: Team;
  profileThumbnailUrl: string | null;
}

export interface CandidateListResponse {
  part: Part;
  //votingProgress: VotingProgress;
  candidates: Candidate[];
}

export interface CandidateDetail {
  userId: number;
  name: string;
  part: Part;
  teamName: Team;
  profileImageUrl: string | null;
  introduction: string;
}

