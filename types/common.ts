// 사용: 회원가입, 로그아웃, 투표하기 응답
export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface ApiResponseWrapper<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 사용: 데모데이, 파트장 투표 현황/결과
export interface VotingProgress {
  totalParticipantCount: number;
  currentVotedCount: number;
  isVoteCompleted: boolean;
}
