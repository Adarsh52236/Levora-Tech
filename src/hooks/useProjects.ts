'use client'

import useSWR from 'swr'
import { fetchProjects } from '@/lib/api/projects'
import { Project } from '@/types/project'
import { ENDPOINTS } from '@/lib/api/endpoints'

const fallbackImages = [
  '/images/projects/saas-landing.svg',
  '/images/projects/mobile-booking.svg',
  '/images/projects/automation-platform.svg',
  '/images/projects/operations-dashboard.svg',
  '/images/projects/ios-portal.svg',
  '/images/projects/luxury-service.svg',
]

export function useProjects() {
  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    ENDPOINTS.PROJECTS,
    async () => {
      const res = await fetchProjects()
      const raw = res.data || []
      return raw.map((p, i) => {
        const image = p.cover_image || p.image || fallbackImages[i % fallbackImages.length]
        return {
          ...p,
          image,
          cover_image: image,
          tags: p.technologies || p.tags || [],
          category: p.industry || p.category || 'Engineering',
        }
      })
    }
  )

  return { projects: data, error, isLoading, mutate }
}
