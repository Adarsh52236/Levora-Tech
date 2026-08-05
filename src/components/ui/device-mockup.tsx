import React from 'react'
import { cn } from '@/lib/utils/cn'

interface DeviceMockupProps {
  type: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export function DeviceMockup({ type, children, className, contentClassName }: DeviceMockupProps) {
  const isMobile = type === 'Mobile' || type === 'iOS' || type === 'App'

  if (isMobile) {
    return (
      <div className={cn("relative mx-auto rounded-[2rem] sm:rounded-[2.5rem] border-[8px] sm:border-[12px] border-gray-900 bg-gray-900 shadow-xl overflow-hidden", className)}>
        {/* iPhone Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 z-20 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-gray-900 sm:h-6 sm:w-32"></div>
        {/* Hardware Buttons */}
        <div className="absolute -left-[10px] sm:-left-[14px] top-16 sm:top-24 h-8 sm:h-12 w-1 sm:w-1.5 rounded-l-md bg-gray-800"></div>
        <div className="absolute -left-[10px] sm:-left-[14px] top-28 sm:top-40 h-12 sm:h-16 w-1 sm:w-1.5 rounded-l-md bg-gray-800"></div>
        <div className="absolute -right-[10px] sm:-right-[14px] top-24 sm:top-32 h-16 sm:h-20 w-1 sm:w-1.5 rounded-r-md bg-gray-800"></div>
        
        <div className={cn("relative h-full w-full overflow-hidden rounded-[1.5rem] sm:rounded-[1.8rem] bg-background", contentClassName)}>
          {children}
        </div>
      </div>
    )
  }

  // Browser Mockup
  return (
    <div className={cn("relative w-full overflow-hidden rounded-xl border border-border bg-background shadow-xl", className)}>
      <div className="flex h-8 sm:h-10 w-full items-center gap-1.5 sm:gap-2 border-b border-border bg-[#f1f5f9] dark:bg-[#1e293b] px-3 sm:px-4">
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#ff5f56]" />
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#ffbd2e]" />
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className={cn("relative w-full bg-background", contentClassName)}>
        {children}
      </div>
    </div>
  )
}
