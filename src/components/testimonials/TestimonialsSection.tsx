'use client'

import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageSquareOff } from 'lucide-react'
import { useTestimonials } from '@/hooks/useTestimonials'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AutoProgressDots } from '@/components/ui/auto-progress-dots'
import { useAutoAdvance } from '@/hooks/useAutoAdvance'
import { SectionLoader } from '@/components/loaders/UiverseLoader'
import { ApiError } from '@/components/common/ApiError'
import { TestimonialCard } from './TestimonialCard'

const INTERVAL = 6000

export function TestimonialsSection() {
  const { testimonials, isLoading, error, mutate } = useTestimonials()
  const [hoverPaused, setHoverPaused] = useState(false)
  const startX = useRef<number | null>(null)
  const count = testimonials?.length || 0

  const { index, setIndex, go, ref, paused } = useAutoAdvance({
    length: count,
    interval: INTERVAL,
    paused: hoverPaused,
  })

  const active = testimonials ? testimonials[index] : null

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

        {error && !isLoading && (
          <div className="mt-12">
            <ApiError error={error} onRetry={() => mutate()} />
          </div>
        )}

        {isLoading && <SectionLoader label="Loading testimonials…" />}

        {!isLoading && !error && count === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-secondary/30 p-12 text-center">
            <MessageSquareOff className="mb-4 h-8 w-8 text-muted-foreground/50" />
            <h3 className="text-lg font-medium">No testimonials available.</h3>
            <p className="mt-2 text-sm text-muted-foreground">Our clients haven't provided any quotes yet.</p>
          </div>
        )}

        {!isLoading && !error && active && (
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
                <TestimonialCard testimonial={active} />
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
        )}
      </div>
    </section>
  )
}
