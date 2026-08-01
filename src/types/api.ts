export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  errors?: Record<string, string[]>
}

export class ApiClientError extends Error {
  status: number
  errors?: Record<string, string[]>

  constructor(message: string, status: number = 500, errors?: Record<string, string[]>) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.errors = errors
  }
}
