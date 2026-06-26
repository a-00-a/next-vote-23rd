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
