if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL이 설정되지 않았습니다.');
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ApiError {
  status: number;
  message: string;
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }).catch(() => {
    throw { status: 0, message: '네트워크 오류가 발생했습니다.' };
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    // 공통 에러 처리
    switch (res.status) {
      case 400:
        throw { status: 400, message: error.message ?? '잘못된 요청입니다.' };
      case 401:
        window.location.href = '/login';
        throw { status: 401, message: '로그인이 필요합니다.' };
      case 403:
        throw {
          status: 403,
          message: error.message ?? '접근 권한이 없습니다.',
        };
      case 404:
        throw { status: 404, message: '요청한 데이터를 찾을 수 없습니다.' };
      case 409:
        throw { status: 409, message: error.message ?? '중복된 요청입니다.' };
      case 500:
        throw { status: 500, message: '서버 오류가 발생했습니다.' };
      default:
        throw { status: res.status, message: '오류가 발생했습니다.' };
    }
  }

  return res.json().catch(() => {
    throw { status: res.status, message: '응답 파싱에 실패했습니다.' };
  });
}
