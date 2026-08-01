import { cn } from '@/lib/utils'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn('flex select-none flex-col items-center leading-none', className)}
      aria-label="EzyIT Tech Limited"
    >
      <div className="flex items-baseline font-bold tracking-tight">
        <span className="text-brand-blue">Ezy</span>
        <span className="text-brand-orange">IT</span>
        <sup className="ml-0.5 -translate-y-2 text-[0.4em] font-medium text-brand-orange">
          ®
        </sup>
      </div>
      <div className="mt-1 flex w-full justify-between px-0.5 text-[0.32em] font-bold uppercase tracking-[0.25em]">
        <span className="text-brand-blue">Tech</span>
        <span className="text-brand-orange">Limited</span>
      </div>
    </div>
  )
}
