import { ApiResponse } from "./common";

export type Part = 'BACKEND' | 'FRONTEND';
export type Team = 'ConX' | 'Ditda' | 'Groupeat' | 'IPX' | 'Jobdri';

export interface UserSummary {
  name: string;
  part: Part;
  team: Team;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  user: UserSummary;
}

export interface SignupRequest {
  name: string;
  loginId: string;
  password: string;
  passwordConfirm: string;
  team: Team;
  part: Part;
}

export type SignupResponse = ApiResponse;
export type LogoutResponse = ApiResponse;

