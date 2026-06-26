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

export interface DemodayResultItem {
  ranking: number;
  team: Team;
  teamName: string;
  voteCount: number;
  isWinner: boolean;
}

export interface DemodayResultResult {
  teams: DemodayResultItem[];
}

export type DemodayResultResponse = ApiResponseWrapper<null>;
