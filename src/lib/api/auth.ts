import { apiClient } from './client'
import { ENDPOINTS } from './endpoints'
import { LoginPayload, TokenResponse, User } from '@/types/auth'
import { ApiResponse } from '@/types/api'

export async function login(payload: LoginPayload): Promise<ApiResponse<TokenResponse>> {
  return apiClient.post<TokenResponse>(ENDPOINTS.AUTH_LOGIN, payload)
}

export async function refresh(refreshToken: string): Promise<ApiResponse<TokenResponse>> {
  return apiClient.post<TokenResponse>(ENDPOINTS.AUTH_REFRESH, { refresh_token: refreshToken })
}

export async function logout(): Promise<ApiResponse<{ user_id: string }>> {
  return apiClient.post<{ user_id: string }>(ENDPOINTS.AUTH_LOGOUT)
}

export async function getMe(): Promise<ApiResponse<User>> {
  return apiClient.get<User>(ENDPOINTS.AUTH_ME)
}
