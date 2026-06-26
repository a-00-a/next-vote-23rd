import { Team } from './auth';
import { ApiResponseWrapper, VotingProgress } from './common';

export interface DemodayVoteRequest {
  team: Team;
}

export type DemodayVoteResponse = ApiResponseWrapper<null>;

export interface DemodayLiveStatusResponse {
  votingProgress: VotingProgress;
  voteResult: {
    teamName: Team;
    voteCount: number;
  }[];
}

export interface DemodayResultResponse {
  votingProgress: VotingProgress & {
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
