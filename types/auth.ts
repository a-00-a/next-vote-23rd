import { ApiResponseWrapper } from './common';

export type Part = 'BACKEND' | 'FRONTEND';
export type Team = 'CONX' | 'DITDA' | 'GROUPEAT' | 'IPX' | 'JOBDRI';

export interface UserSummary {
  id: number;
  name: string;
  part: Part;
  team: Team;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export type LoginResponse = ApiResponseWrapper<{ user: UserSummary }>;

export interface SignupRequest {
  name: string;
  loginId: string;
  password: string;
  team: Team;
  part: Part;
  inviteCode: string;
}

export type SignupResponse = ApiResponseWrapper<null>;
export type LogoutResponse = ApiResponseWrapper<null>;
