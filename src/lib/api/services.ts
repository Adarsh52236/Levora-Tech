import { apiClient } from './client'
import { ENDPOINTS } from './endpoints'
import { Service } from '@/types/service'
import { ApiResponse } from '@/types/api'

export async function fetchServices(): Promise<ApiResponse<Service[]>> {
  return apiClient.get<Service[]>(ENDPOINTS.SERVICES)
}

// Admin CMS Placeholders (Future Sprint Integration)
export async function createServiceAdmin(payload: Partial<Service>): Promise<ApiResponse<Service>> {
  return apiClient.post<Service>(ENDPOINTS.ADMIN_SERVICES, payload)
}

export async function updateServiceAdmin(id: string, payload: Partial<Service>): Promise<ApiResponse<Service>> {
  return apiClient.put<Service>(ENDPOINTS.ADMIN_SERVICE_BY_ID(id), payload)
}

export async function deleteServiceAdmin(id: string): Promise<ApiResponse<{ id: string }>> {
  return apiClient.delete<{ id: string }>(ENDPOINTS.ADMIN_SERVICE_BY_ID(id))
}
