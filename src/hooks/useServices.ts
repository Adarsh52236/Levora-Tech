'use client'

import useSWR from 'swr'
import { fetchServices } from '@/lib/api/services'
import { Service } from '@/types/service'
import { ENDPOINTS } from '@/lib/api/endpoints'

export function useServices() {
  const { data, error, isLoading, mutate } = useSWR<Service[]>(
    ENDPOINTS.SERVICES,
    async () => {
      const res = await fetchServices()
      return res.data || []
    }
  )

  return { services: data, error, isLoading, mutate }
}
