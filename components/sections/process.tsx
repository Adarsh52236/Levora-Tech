'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, PenTool, Cpu, Rocket } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { AutoProgressDots } from '@/components/ui/auto-progress-dots'
import { useAutoAdvance } from '@/lib/use-auto-advance'

const INTERVAL = 4500

const steps = [
  {
    icon: Compass,
    title: 'Strategy',
    desc: 'Understand goals, users, constraints, and the product direction.',
    detail:
      'We map business objectives to product requirements, define success metrics, and align stakeholders before a single line of code is written.',
  },
  {
    icon: PenTool,
    title: 'Design',
    desc: 'Shape interfaces that are clear, beautiful, and easy to use.',
    detail:
      'Wireframes evolve into high-fidelity prototypes with motion, accessibility, and brand consistency baked in from the start.',
  },
  {
    icon: Cpu,
    title: 'Engineering',
    desc: 'Build reliable, scalable systems with clean code and strong architecture.',
    detail:
      'Modern stacks, rigorous testing, and CI/CD pipelines ensure every release is stable, secure, and performant.',
  },
  {
    icon: Rocket,
    title: 'Scale',
    desc: 'Improve, optimize, and support the product as it grows.',
    detail:
      'Post-launch we monitor, iterate, and extend — keeping your platform fast as traffic and features grow.',
  },
]

export function Process() {
  const [hoverPaused, setHoverPaused] = useState(false)
  const { index: active, setIndex: setActive, ref, paused } = useAutoAdvance({
    length: steps.length,
    interval: INTERVAL,
    paused: hoverPaused,
  })

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-section-cool px-4 py-24 sm:py-32"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Process"
          title="From idea to execution, every step is intentional."
        />

        <div className="mt-16 hidden md:block">
          <div className="grid grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const isActive = active === i
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-start p-1 text-left transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0.5 }}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'border-brand-blue bg-brand-blue text-white shadow-[0_0_20px_-4px_rgba(0,56,118,0.45)]'
                        : 'border-brand-cyan/30 bg-brand-blue/10 text-brand-cyan group-hover:border-brand-cyan/50 group-hover:opacity-100'
                    }`}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </button>
              )
            })}
          </div>

          <div className="mt-8">
            <AutoProgressDots
              count={steps.length}
              active={active}
              onSelect={setActive}
              duration={INTERVAL}
              paused={paused}
              labels={steps.map((s) => s.title)}
            />
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 rounded-2xl border border-border bg-background p-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              {steps[active].detail}
            </p>
          </motion.div>
        </div>

        {/* Mobile — single auto-rotating step */}
        <div className="mt-12 md:hidden">
          {steps.map((s, i) =>
            active === i ? (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex gap-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-blue bg-brand-blue text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.detail}
                  </p>
                </div>
              </motion.div>
            ) : null,
          )}

          <div className="mt-6">
            <AutoProgressDots
              count={steps.length}
              active={active}
              onSelect={setActive}
              duration={INTERVAL}
              paused={paused}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
