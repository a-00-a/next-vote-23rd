import { Team } from './auth';
import { ApiResponseWrapper } from './common';

export interface DemodayVoteRequest {
  team: Team;
}

export interface DemodayVoteResult {
  voteId: number;
  selectedTeam: Team;
  selectedTeamName: string;
}

export type DemodayVoteResponse = ApiResponseWrapper<DemodayVoteResult>;

export interface DemodayTeam {
  team: Team;
  teamName: string;
}

export type DemodayTeamListResponse = ApiResponseWrapper<DemodayTeam[]>;

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

export interface DemodayResultResult {
  totalVoterCount: number;
  votedCount: number;
  teams: {
    team: Team;
    teamName: string;
    voteCount: number;
  }[];
}

export type DemodayResultResponse = ApiResponseWrapper<DemodayResultResult>;
