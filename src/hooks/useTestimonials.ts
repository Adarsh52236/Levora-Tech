'use client'

import useSWR from 'swr'
import { fetchTestimonials } from '@/lib/api/testimonials'
import { Testimonial } from '@/types/testimonial'
import { ENDPOINTS } from '@/lib/api/endpoints'

export function useTestimonials() {
  const { data, error, isLoading, mutate } = useSWR<Testimonial[]>(
    ENDPOINTS.TESTIMONIALS,
    async () => {
      const res = await fetchTestimonials()
      const raw = res.data || []
      return raw.map((t) => ({
        ...t,
        name: t.client_name || t.name,
        role: t.designation || t.role,
        quote: t.message || t.quote,
        avatar: t.avatar_url || t.avatar,
      }))
    }
  )

  return { testimonials: data, error, isLoading, mutate }
}
