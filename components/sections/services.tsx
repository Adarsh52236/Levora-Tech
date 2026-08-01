'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { services } from '@/data/services'
import { SectionHeading } from '@/components/ui/section-heading'
import { springSnappy } from '@/lib/motion'
import { useAutoAdvance } from '@/lib/use-auto-advance'

export function Services() {
  const [hoverPaused, setHoverPaused] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const skipAutoOpen = useRef(true)
  const { index, setIndex, ref } = useAutoAdvance({
    length: services.length,
    interval: 5500,
    paused: hoverPaused,
  })

  useEffect(() => {
    if (skipAutoOpen.current) {
      skipAutoOpen.current = false
      return
    }
    setOpenId(services[index].id)
  }, [index])

  const handleCardClick = (i: number, id: string) => {
    if (openId === id) {
      setOpenId(null)
    } else {
      setOpenId(id)
      setIndex(i)
    }
  }

  return (
    <section
      id="services"
      ref={ref}
      className="relative px-4 py-24 sm:py-32"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Services"
          title="What we engineer."
          description="From websites to full platforms, every service is delivered with the same standard of precision and care."
        />

        <div className="mt-14 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
          {services.map((s, i) => {
            const open = openId === s.id
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (i % 3) * 0.08 }}
                className="perspective-card min-w-[280px] md:min-w-0"
              >
                <button
                  type="button"
                  onClick={() => handleCardClick(i, s.id)}
                  aria-expanded={open}
                  className={`card-tilt group relative w-full cursor-pointer overflow-hidden rounded-2xl border bg-background p-6 text-left transition-colors duration-300 ${
                    open
                      ? 'border-brand-cyan/60'
                      : 'border-border hover:border-brand-blue/50'
                  }`}

                >
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-cyan ring-1 ring-inset ring-brand-blue/20">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={springSnappy}
                      className="pointer-events-none text-muted-foreground"
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.short}
                  </p>

                  <AnimatePresence initial={false}>
                    {open && (
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
                              {s.build}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                              Technologies
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {s.tech.map((t) => (
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
                              {s.idealFor}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
