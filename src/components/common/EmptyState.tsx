'use client'

import { ReactNode } from 'react'
import { LayoutGrid } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
}

export function EmptyState({
  title,
  description,
  icon = <LayoutGrid className="mb-4 h-8 w-8 text-muted-foreground/50" />,
}: EmptyStateProps) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/30 p-12 text-center">
      {icon}
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
