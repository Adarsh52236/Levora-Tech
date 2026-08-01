'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Globe, LayoutGrid, Smartphone, Apple, PenTool, Code2, Plus } from 'lucide-react'
import { Service } from '@/types/service'
import { springSnappy } from '@/lib/motion'

const iconMap: Record<string, any> = {
  Globe,
  LayoutGrid,
  Smartphone,
  Apple,
  PenTool,
  Code2,
}

interface ServiceCardProps {
  service: Service
  index: number
  isOpen: boolean
  onClick: () => void
}

export function ServiceCard({ service, index, isOpen, onClick }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || LayoutGrid

  // Fallbacks for detail fields if API returns single description
  const shortText = service.short_description || service.description
  const buildText = service.description
  const techList = (service as any).tech || ['React', 'TypeScript', 'Node.js']
  const idealForText = (service as any).idealFor || 'Businesses scaling their digital presence'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.08 }}
      className="perspective-card min-w-[280px] md:min-w-0"
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className={`card-tilt group relative w-full cursor-pointer overflow-hidden rounded-2xl border bg-background p-6 text-left transition-colors duration-300 ${
          isOpen
            ? 'border-brand-cyan/60'
            : 'border-border hover:border-brand-blue/50'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-cyan ring-1 ring-inset ring-brand-blue/20">
            <Icon className="h-5 w-5" />
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={springSnappy}
            className="pointer-events-none text-muted-foreground"
          >
            <Plus className="h-5 w-5" />
          </motion.span>
        </div>

        <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {shortText}
        </p>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={springSnappy}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-4 border-t border-border pt-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                    What we build
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {buildText}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                    Technologies
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {techList.map((t: string) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-secondary/70 px-2.5 py-1 text-xs text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                    Ideal for
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {idealForText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}
