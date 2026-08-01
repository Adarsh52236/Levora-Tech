'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Crosshair, Gauge, TrendingUp } from 'lucide-react'
import { AutoProgressDots } from '@/components/ui/auto-progress-dots'
import { fadeUp, springSnappy, staggerContainer } from '@/lib/motion'
import { useAutoAdvance } from '@/hooks/useAutoAdvance'
import { COMPANY_INFO } from '@/lib/constants/company'

const PILLAR_INTERVAL = 3500

const rotatingWords = ['websites', 'web apps', 'platforms', 'mobile apps']

const pillars = [
  {
    icon: Crosshair,
    title: 'Precision',
    desc: 'Every detail considered, from architecture to the final pixel.',
    detail: 'Design systems, clean APIs, and interfaces that feel intentional at every breakpoint.',
  },
  {
    icon: Gauge,
    title: 'Performance',
    desc: 'Fast experiences engineered for speed and reliability.',
    detail: 'Core Web Vitals, lazy loading, and infrastructure tuned for real-world traffic.',
  },
  {
    icon: TrendingUp,
    title: 'Scalability',
    desc: 'Systems built to grow with your business, not against it.',
    detail: 'Modular architecture that adapts as your product, team, and user base expand.',
  },
]

function ProductShowcase() {
  const cards = [
    { label: 'Web', gradient: 'from-brand-blue/20 via-brand-cyan/10 to-transparent', delay: 0 },
    { label: 'Mobile', gradient: 'from-brand-orange/20 via-brand-amber/10 to-transparent', delay: 0.4 },
    { label: 'Platform', gradient: 'from-brand-cyan/20 via-brand-blue/15 to-transparent', delay: 0.8 },
  ]

  return (
    <div className="relative mx-auto aspect-[4/3] max-w-md lg:max-w-none">
      <div
        className="absolute inset-0 rounded-3xl opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0,56,118,0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/15 blur-[60px]" />

      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 30, rotate: i === 0 ? -2 : i === 1 ? 2 : -1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 * i }}
          animate={{ y: [0, i % 2 === 0 ? -10 : -6, 0] }}
          style={{ animationDelay: `${card.delay}s` }}
          className={`absolute overflow-hidden rounded-2xl border border-border bg-background shadow-[0_20px_50px_-20px_rgba(0,56,118,0.25)] ${
            i === 0
              ? 'left-[8%] top-[10%] z-10 w-[72%]'
              : i === 1
                ? 'right-[5%] top-[28%] z-20 w-[68%]'
                : 'bottom-[8%] left-[18%] z-30 w-[70%]'
          }`}
        >
          <div className={`h-24 bg-gradient-to-br ${card.gradient} sm:h-28`}>
            <div className="flex items-center gap-1.5 px-3 pt-3">
              <span className="h-2 w-2 rounded-full bg-brand-orange/80" />
              <span className="h-2 w-2 rounded-full bg-brand-amber/80" />
              <span className="h-2 w-2 rounded-full bg-brand-blue/40" />
            </div>
          </div>
          <div className="space-y-2 p-4">
            <div className="h-2 w-2/3 rounded-full bg-foreground/10" />
            <div className="h-2 w-1/2 rounded-full bg-foreground/5" />
            <span className="inline-block rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-cyan">
              {card.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function AboutSection() {
  const [pillarHoverPaused, setPillarHoverPaused] = useState(false)
  const { index: wordIndex, ref: sectionRef } = useAutoAdvance({
    length: rotatingWords.length,
    interval: 2800,
  })
  const {
    index: activePillar,
    setIndex: setActivePillar,
    ref: pillarRef,
    paused: pillarPaused,
  } = useAutoAdvance({
    length: pillars.length,
    interval: PILLAR_INTERVAL,
    paused: pillarHoverPaused,
  })

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-4 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-brand-amber/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan"
            >
              About {COMPANY_INFO.name}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-display display-title mt-4 text-balance text-3xl font-bold tracking-display sm:text-4xl md:text-[2.75rem]"
            >
              We craft{' '}
              <span className="relative inline-block min-w-[9ch] text-brand-cyan">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="inline-block"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>{' '}
              built to perform.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {COMPANY_INFO.name} partners with ambitious teams to design, engineer, and ship
              digital products that look refined, load fast, and scale without
              friction.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
              {['Design', 'Engineering', 'Launch', 'Scale'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.button
              variants={fadeUp}
              type="button"
              onClick={() => scrollTo('process')}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-cyan"
            >
              See how we work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductShowcase />
          </motion.div>
        </div>

        <div
          ref={pillarRef}
          onMouseEnter={() => setPillarHoverPaused(true)}
          onMouseLeave={() => setPillarHoverPaused(false)}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-16 rounded-3xl border border-border bg-section-cool p-2 sm:p-3"
          >
            <div className="grid gap-2 sm:grid-cols-3">
              {pillars.map((p, i) => {
                const active = activePillar === i
                const Icon = p.icon
                return (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setActivePillar(i)}
                    className="relative rounded-2xl p-5 text-left transition-opacity duration-300"
                    style={{ opacity: active ? 1 : 0.55 }}
                  >
                    {active && (
                      <motion.span
                        layoutId="about-pillar"
                        className="absolute inset-0 rounded-2xl border border-brand-cyan/30 bg-background shadow-[0_8px_32px_-16px_rgba(0,56,118,0.2)]"
                        transition={springSnappy}
                      />
                    )}
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-cyan">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="relative z-10 mt-4 font-semibold">{p.title}</h3>
                    <p className="relative z-10 mt-1 text-sm text-muted-foreground">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={active ? `${p.title}-detail` : `${p.title}-desc`}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="block"
                        >
                          {active ? p.detail : p.desc}
                        </motion.span>
                      </AnimatePresence>
                    </p>
                  </button>
                )
              })}
            </div>
          </motion.div>

          <div className="mt-4 flex justify-center">
            <AutoProgressDots
              count={pillars.length}
              active={activePillar}
              onSelect={setActivePillar}
              duration={PILLAR_INTERVAL}
              paused={pillarPaused}
              labels={pillars.map((p) => p.title)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
