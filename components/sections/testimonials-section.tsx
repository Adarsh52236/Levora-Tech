'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { SectionHeading } from '@/components/ui/section-heading'
import { AutoProgressDots } from '@/components/ui/auto-progress-dots'
import { useAutoAdvance } from '@/lib/use-auto-advance'

const INTERVAL = 6000

export function TestimonialsSection() {
  const [hoverPaused, setHoverPaused] = useState(false)
  const startX = useRef<number | null>(null)
  const count = testimonials.length

  const { index, setIndex, go, ref, paused } = useAutoAdvance({
    length: count,
    interval: INTERVAL,
    paused: hoverPaused,
  })

  const active = testimonials[index]

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-section-cool px-4 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by teams that ship."
          align="center"
        />

        <div
          className="relative mt-12"
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onTouchStart={(e) => {
            startX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (startX.current === null) return
            const dx = e.changedTouches[0].clientX - startX.current
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            startX.current = null
          }}
        >
          <div className="relative min-h-[16rem] overflow-hidden rounded-3xl border border-border bg-background py-8 pl-10 pr-8 sm:py-12 sm:pl-14 sm:pr-12">
            <span
              className="pointer-events-none absolute left-10 top-4 font-display text-8xl leading-none text-brand-blue/10 sm:left-14"
              aria-hidden
            >
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative"
              >
                <p className="text-balance text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
                  {active.quote}
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-semibold text-brand-cyan">
                    {active.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {active.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {active.role}, {active.company}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-cyan/50 hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <AutoProgressDots
              count={count}
              active={index}
              onSelect={setIndex}
              duration={INTERVAL}
              paused={paused}
            />
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-cyan/50 hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
