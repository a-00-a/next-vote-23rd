export const COOKIE_NAME = {
  ACCESS_TOKEN: 'accessToken',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/proxy/auth/login',
    SIGNUP: '/signup',
    LOGOUT: '/proxy/auth/logout',
  },
  DEMODAY: {
    VOTE: '/proxy/votes/demoday',
    LIVE_STATUS: '/api/v1/votes/demoday/status',
    RESULT: '/api/v1/votes/demoday/results',
    TEAMS: '/api/v1/votes/demoday/teams',
  },
  PART_LEADER: {
    CANDIDATES: '/api/v1/votes/part-leader/candidates', // 목록 + 상세 둘 다 사용
    VOTE: '/proxy/votes/part-leader',
    RESULT: '/api/v1/votes/part-leader/results',
  },
} as const;
