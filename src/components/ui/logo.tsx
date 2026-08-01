import { cn } from '@/lib/utils/cn'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn('flex select-none flex-col items-center leading-none', className)}
      aria-label="Levora Tech"
    >
      <div className="flex items-baseline font-bold tracking-tight">
        <span className="text-brand-blue">Levora</span>
        <span className="text-brand-orange">Tech</span>
        <sup className="ml-0.5 -translate-y-2 text-[0.4em] font-medium text-brand-orange">
          ®
        </sup>
      </div>
    </div>
  )
}
