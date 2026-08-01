'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type Stat = {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 5, suffix: '+', label: 'Years of Engineering' },
  { value: 50, suffix: '+', label: 'Technologies Mastered' },
]

function Counter({
  value,
  suffix,
  start,
  onComplete,
}: {
  value: number
  suffix: string
  start: boolean
  onComplete?: () => void
}) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf = 0
    const duration = 1400
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * value))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        onComplete?.()
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value, onComplete])

  return (
    <span className="tabular-nums">
      {n}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [glowIndex, setGlowIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="relative bg-foreground py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,107,181,0.15),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center sm:text-left"
            >
              <div
                className={`font-display text-4xl font-bold tracking-tight text-white sm:text-5xl ${
                  glowIndex === i
                    ? 'drop-shadow-[0_0_24px_rgba(26,107,181,0.8)]'
                    : ''
                } transition-all duration-500`}
              >
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  start={inView}
                  onComplete={() => setGlowIndex(i)}
                />
              </div>
              <div className="relative mx-auto mt-3 h-px w-full max-w-[120px] overflow-hidden rounded-full bg-white/20 sm:mx-0">
                <motion.span
                  className="absolute inset-y-0 left-0 brand-divider"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                />
              </div>
              <p className="mt-3 text-sm text-white/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
