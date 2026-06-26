import { Team } from './auth';
import { ApiResponseWrapper } from './common';

export interface DemodayVoteRequest {
  team: Team;
}

export type DemodayVoteResponse = ApiResponseWrapper<null>;

export interface DemodayLiveStatusResult {
  totalVoterCount: number;
  votedCount: number;
  resultOpen: boolean;
  teams: {
    team: Team;
    teamName: string; // 화면 표시용
    voteCount: number;
  }[];
}

export type DemodayLiveStatusResponse =
  ApiResponseWrapper<DemodayLiveStatusResult>;

export interface DemodayResultResponse {
  votingProgress: {
    detail: {
      backendTotal: number;
      backendVoted: number;
      frontendTotal: number;
      frontendVoted: number;
    };
  };
  voteResult: {
    ranking: number;
    teamName: Team;
    voteCount: number;
    isWinner: boolean;
  }[];
}
