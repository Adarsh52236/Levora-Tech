'use client'

type AutoProgressDotsProps = {
  count: number
  active: number
  onSelect: (index: number) => void
  duration: number
  paused?: boolean
  labels?: string[]
}

export function AutoProgressDots({
  count,
  active,
  onSelect,
  duration,
  paused = false,
  labels = [],
}: AutoProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === active
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={labels[i] ?? `Go to slide ${i + 1}`}
            className="relative h-2 overflow-hidden rounded-full transition-all duration-300"
            style={{ width: isActive ? 32 : 8 }}
          >
            <span
              className={`absolute inset-0 rounded-full ${
                isActive ? 'bg-brand-blue/20' : 'bg-border hover:bg-muted-foreground/40'
              }`}
            />
            {isActive && (
              <span
                key={`${active}-${paused}`}
                className="absolute inset-0 origin-left rounded-full bg-brand-blue"
                style={{
                  animation: paused
                    ? 'none'
                    : `auto-progress ${duration}ms linear forwards`,
                  transform: paused ? 'scaleX(1)' : undefined,
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
