export const COOKIE_NAME = {
  ACCESS_TOKEN: 'accessToken',
} as const;

// API 엔드포인트 (BE 확정 후 수정 필요)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
  },
  DEMODAY: {
    LIVE_STATUS: '/demoday/vote/progress',
    VOTE: '/demoday/vote',
    RESULT: '/demoday/vote/result',
  },
} as const;
