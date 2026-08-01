import { apiClient } from './client'
import { ENDPOINTS } from './endpoints'
import { ContactSubmission } from '@/types/contact'
import { ApiResponse } from '@/types/api'

export async function submitContact(data: ContactSubmission): Promise<ApiResponse<{ id: string }>> {
  return apiClient.post<{ id: string }>(ENDPOINTS.CONTACT, data)
}
