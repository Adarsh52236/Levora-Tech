'use client'

import { useEffect, useRef, useState } from 'react'
import { useServices } from '@/hooks/useServices'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ServiceSkeleton } from '@/components/loaders/ServiceSkeleton'
import { ApiError } from '@/components/common/ApiError'
import { EmptyState } from '@/components/common/EmptyState'
import { ServiceGrid } from './ServiceGrid'
import { useAutoAdvance } from '@/hooks/useAutoAdvance'

export function ServicesSection() {
  const { services, isLoading, error, mutate } = useServices()
  const [hoverPaused, setHoverPaused] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const skipAutoOpen = useRef(true)

  const { index, setIndex, ref } = useAutoAdvance({
    length: services?.length || 0,
    interval: 5500,
    paused: hoverPaused,
  })

  useEffect(() => {
    if (!services || services.length === 0) return
    if (skipAutoOpen.current) {
      skipAutoOpen.current = false
      return
    }
    setOpenId(services[index].id)
  }, [index, services])

  const handleCardClick = (i: number, id: string) => {
    if (openId === id) {
      setOpenId(null)
    } else {
      setOpenId(id)
      setIndex(i)
    }
  }

  return (
    <section
      id="services"
      ref={ref}
      className="relative px-4 py-24 sm:py-32"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Services"
          title="What we engineer."
          description="From websites to full platforms, every service is delivered with the same standard of precision and care."
        />

        {error && !isLoading && (
          <div className="mt-14">
            <ApiError error={error} onRetry={() => mutate()} />
          </div>
        )}

        {isLoading && <ServiceSkeleton />}

        {!isLoading && !error && services && services.length === 0 && (
          <EmptyState
            title="No services available yet."
            description="Check back later for our offerings."
          />
        )}

        {!isLoading && !error && services && services.length > 0 && (
          <ServiceGrid
            services={services}
            openId={openId}
            onCardClick={handleCardClick}
          />
        )}
      </div>
    </section>
  )
}
