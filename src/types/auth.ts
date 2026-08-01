export interface User {
  id: string
  email: string
  name: string
  role?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  user: User
}
