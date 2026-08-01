export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
export const API_PREFIX = '/api/v1'

export const ENDPOINTS = {
  HEALTH: `${API_PREFIX}/health`,
  SERVICES: `${API_PREFIX}/services`,
  PROJECTS: `${API_PREFIX}/projects`,
  PROJECT_BY_SLUG: (slug: string) => `${API_PREFIX}/projects/${slug}`,
  TESTIMONIALS: `${API_PREFIX}/testimonials`,
  CONTACT: `${API_PREFIX}/contact`,
  
  // Auth
  AUTH_LOGIN: `${API_PREFIX}/auth/login`,
  AUTH_REFRESH: `${API_PREFIX}/auth/refresh`,
  AUTH_LOGOUT: `${API_PREFIX}/auth/logout`,
  AUTH_ME: `${API_PREFIX}/auth/me`,

  // Media
  UPLOAD: `${API_PREFIX}/upload`,

  // Admin CMS Placeholders
  ADMIN_SERVICES: `${API_PREFIX}/admin/services`,
  ADMIN_SERVICE_BY_ID: (id: string) => `${API_PREFIX}/admin/services/${id}`,
  ADMIN_PROJECTS: `${API_PREFIX}/admin/projects`,
  ADMIN_PROJECT_BY_ID: (id: string) => `${API_PREFIX}/admin/projects/${id}`,
  ADMIN_TESTIMONIALS: `${API_PREFIX}/admin/testimonials`,
  ADMIN_TESTIMONIAL_BY_ID: (id: string) => `${API_PREFIX}/admin/testimonials/${id}`,
} as const
