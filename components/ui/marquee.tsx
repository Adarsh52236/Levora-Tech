'use client'

import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: React.ReactNode
  className?: string
  speed?: 'slow' | 'normal'
}

export function Marquee({
  children,
  className,
  speed = 'normal',
}: MarqueeProps) {
  return (
    <div className={cn('group/marquee relative overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max gap-8',
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
