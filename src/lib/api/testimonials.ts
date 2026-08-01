import { apiClient } from './client'
import { ENDPOINTS } from './endpoints'
import { Testimonial } from '@/types/testimonial'
import { ApiResponse } from '@/types/api'

export async function fetchTestimonials(): Promise<ApiResponse<Testimonial[]>> {
  return apiClient.get<Testimonial[]>(ENDPOINTS.TESTIMONIALS)
}

// Admin CMS Placeholders
export async function createTestimonialAdmin(payload: Partial<Testimonial>): Promise<ApiResponse<Testimonial>> {
  return apiClient.post<Testimonial>(ENDPOINTS.ADMIN_TESTIMONIALS, payload)
}

export async function updateTestimonialAdmin(id: string, payload: Partial<Testimonial>): Promise<ApiResponse<Testimonial>> {
  return apiClient.put<Testimonial>(ENDPOINTS.ADMIN_TESTIMONIAL_BY_ID(id), payload)
}

export async function deleteTestimonialAdmin(id: string): Promise<ApiResponse<{ id: string }>> {
  return apiClient.delete<{ id: string }>(ENDPOINTS.ADMIN_TESTIMONIAL_BY_ID(id))
}
