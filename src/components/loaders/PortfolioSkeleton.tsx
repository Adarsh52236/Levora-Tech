import { Skeleton } from '@/components/ui/skeleton'

export function PortfolioSkeleton() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="col-span-1 h-[420px] rounded-2xl sm:col-span-2 lg:col-span-3" />
      <Skeleton className="h-[360px] rounded-2xl" />
      <Skeleton className="h-[360px] rounded-2xl" />
      <Skeleton className="h-[360px] rounded-2xl" />
    </div>
  )
}
