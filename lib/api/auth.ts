import { fetchApi } from '@/lib/fetch';
import { API_ENDPOINTS } from '@/lib/constants';

import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  LogoutResponse,
} from '@/types/auth';

export const login = (body: LoginRequest) =>
  fetchApi<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const signup = (body: SignupRequest) =>
  fetchApi<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const logout = () =>
  fetchApi<LogoutResponse>(API_ENDPOINTS.AUTH.LOGOUT, {
    method: 'POST',
  });
