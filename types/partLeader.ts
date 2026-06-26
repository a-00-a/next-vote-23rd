import { Part, Team } from './auth';
import { ApiResponseWrapper } from './common';

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

export interface PartLeaderVoteRequest {
  candidateId: number;
}

export interface PartLeaderVoteResult {
  voteId: number;
  candidateId: number;
  candidateName: string;
}

export type PartLeaderVoteResponse = ApiResponseWrapper<PartLeaderVoteResult>;

export interface CandidateDetail {
  userId: number;
  name: string;
  part: Part;
  teamName: Team;
  profileImageUrl: string | null;
  introduction: string;
}

export interface PartLeaderResultResponse {
  part: Part;
  //votingProgress: VotingProgress;
  voteResult: {
    ranking: number;
    candidateId: number;
    name: string;
    profileImageUrl: string | null;
    voteCount: number;
    isWinner: boolean;
  }[];
}
