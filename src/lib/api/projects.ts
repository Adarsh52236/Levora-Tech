import { apiClient } from './client'
import { ENDPOINTS } from './endpoints'
import { Project } from '@/types/project'
import { ApiResponse } from '@/types/api'

import { fallbackProjects } from '@/data/mockData'

export async function fetchProjects(): Promise<ApiResponse<Project[]>> {
  try {
    return await apiClient.get<Project[]>(ENDPOINTS.PROJECTS)
  } catch (error) {
    console.warn('Network error fetching projects, using fallback data:', error)
    return {
      success: true,
      data: fallbackProjects,
      message: 'Fallback data used due to network error'
    }
  }
}

export async function fetchProjectBySlug(slug: string): Promise<ApiResponse<Project>> {
  try {
    return await apiClient.get<Project>(ENDPOINTS.PROJECT_BY_SLUG(slug))
  } catch (error) {
    console.warn('Network error fetching project by slug, using fallback data:', error)
    const project = fallbackProjects.find(p => p.slug === slug)
    if (project) {
      return { success: true, data: project, message: 'Fallback data used due to network error' }
    }
    throw error
  }
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
