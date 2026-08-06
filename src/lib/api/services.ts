import { apiClient } from './client'
import { ENDPOINTS } from './endpoints'
import { Service } from '@/types/service'
import { ApiResponse } from '@/types/api'

import { fallbackServices } from '@/data/mockData'

export async function fetchServices(): Promise<ApiResponse<Service[]>> {
  try {
    return await apiClient.get<Service[]>(ENDPOINTS.SERVICES)
  } catch (error) {
    console.warn('Network error fetching services, using fallback data:', error)
    return {
      success: true,
      data: fallbackServices,
      message: 'Fallback data used due to network error'
    }
  }
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
