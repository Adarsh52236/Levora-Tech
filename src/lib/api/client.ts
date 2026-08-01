import { API_BASE_URL } from './endpoints'
import { ApiResponse, ApiClientError } from '@/types/api'

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | null | undefined>
  timeoutMs?: number
  retries?: number
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | null | undefined>): string {
    let queryString = ''
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryStr = searchParams.toString()
      if (queryStr) {
        queryString = `?${queryStr}`
      }
    }
    return `${this.baseUrl}${endpoint}${queryString}`
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { params, timeoutMs = 15000, retries = 0, headers = {}, ...customConfig } = options

    const url = this.buildUrl(endpoint, params)
    const token = this.getToken()

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(headers as Record<string, string>),
    }

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    let attempt = 0
    while (attempt <= retries) {
      try {
        const response = await fetch(url, {
          ...customConfig,
          headers: requestHeaders,
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        const data: ApiResponse<T> = await response.json().catch(() => ({} as ApiResponse<T>))

        if (!response.ok || data.success === false) {
          throw new ApiClientError(
            data.message || `Request failed with status ${response.status}`,
            response.status,
            data.errors
          )
        }

        return data
      } catch (error) {
        clearTimeout(timeoutId)
        if (error instanceof ApiClientError) {
          throw error
        }
        if (attempt < retries) {
          attempt++
          continue
        }
        throw new ApiClientError(
          error instanceof Error ? error.message : 'Network error or backend offline',
          0
        )
      }
    }

    throw new ApiClientError('Network error', 0)
  }

  get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers: body instanceof FormData ? {} : { 'Content-Type': 'application/json' },
    })
  }

  put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
