import { Loader2 } from 'lucide-react'

export function UiverseLoader({ className = '' }: { className?: string }) {
  return <Loader2 className={`h-8 w-8 animate-spin text-brand-cyan ${className}`} />
}

export function SectionLoader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center py-20 text-muted-foreground">
      <Loader2 className="mb-4 h-8 w-8 animate-spin text-brand-cyan" />
      {label && <p className="text-sm font-medium">{label}</p>}
    </div>
  )
}
