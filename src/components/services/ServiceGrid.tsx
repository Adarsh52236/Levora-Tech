'use client'

import { Service } from '@/types/service'
import { ServiceCard } from './ServiceCard'

interface ServiceGridProps {
  services: Service[]
  openId: string | null
  onCardClick: (index: number, id: string) => void
}

export function ServiceGrid({ services, openId, onCardClick }: ServiceGridProps) {
  return (
    <div className="mt-14 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
      {services.map((s, i) => (
        <ServiceCard
          key={s.id}
          service={s}
          index={i}
          isOpen={openId === s.id}
          onClick={() => onCardClick(i, s.id)}
        />
      ))}
    </div>
  )
}
