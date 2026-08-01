import { cn } from '@/lib/utils/cn'

type SectionDividerProps = {
  variant?: 'gradient' | 'angle' | 'dots'
  className?: string
}

export function SectionDivider({
  variant = 'gradient',
  className,
}: SectionDividerProps) {
  if (variant === 'angle') {
    return (
      <div
        className={cn('relative h-16 w-full overflow-hidden', className)}
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-section-cool"
          style={{
            clipPath: 'polygon(0 0, 100% 60%, 100% 100%, 0 100%)',
          }}
        />
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div
        className={cn('flex justify-center py-6', className)}
        aria-hidden
      >
        <div className="flex gap-1.5">
          <span className="h-1 w-1 rounded-full bg-brand-blue/40" />
          <span className="h-1 w-1 rounded-full bg-brand-orange/40" />
          <span className="h-1 w-1 rounded-full bg-brand-amber/40" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('mx-auto h-px max-w-6xl brand-divider opacity-60', className)}
      aria-hidden
    />
  )
}
