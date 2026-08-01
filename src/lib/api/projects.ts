import { apiClient } from './client'
import { ENDPOINTS } from './endpoints'
import { Project } from '@/types/project'
import { ApiResponse } from '@/types/api'

export async function fetchProjects(): Promise<ApiResponse<Project[]>> {
  return apiClient.get<Project[]>(ENDPOINTS.PROJECTS)
}

export async function fetchProjectBySlug(slug: string): Promise<ApiResponse<Project>> {
  return apiClient.get<Project>(ENDPOINTS.PROJECT_BY_SLUG(slug))
}

// Admin CMS Placeholders
export async function createProjectAdmin(payload: Partial<Project>): Promise<ApiResponse<Project>> {
  return apiClient.post<Project>(ENDPOINTS.ADMIN_PROJECTS, payload)
}

export async function updateProjectAdmin(id: string, payload: Partial<Project>): Promise<ApiResponse<Project>> {
  return apiClient.put<Project>(ENDPOINTS.ADMIN_PROJECT_BY_ID(id), payload)
}

export async function deleteProjectAdmin(id: string): Promise<ApiResponse<{ id: string }>> {
  return apiClient.delete<{ id: string }>(ENDPOINTS.ADMIN_PROJECT_BY_ID(id))
}
