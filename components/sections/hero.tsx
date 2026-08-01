'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { clientNames, techMarquee } from '@/data/clients'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Marquee } from '@/components/ui/marquee'
import { fadeUp, staggerContainer } from '@/lib/motion'

const VantaBackground = dynamic(
  () =>
    import('@/components/ui/vanta-background').then((m) => m.VantaBackground),
  { ssr: false },
)

export function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const orbX = useTransform(sx, (v) => v * 28)
  const orbY = useTransform(sy, (v) => v * 28)
  const glowX = useTransform(sx, (v) => v * -16)
  const glowY = useTransform(sy, (v) => v * -16)
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28"
    >
      <VantaBackground className="absolute inset-0" />

      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-[15%] top-[20%] h-48 w-48 rounded-full bg-brand-cyan/20 blur-[80px]"
        aria-hidden
      />
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute bottom-[25%] right-[12%] h-56 w-56 rounded-full bg-brand-amber/15 blur-[90px]"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 bg-background/20 backdrop-blur-[2px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="font-display display-title text-balance text-4xl font-bold tracking-display sm:text-6xl md:text-7xl"
        >
          <motion.span variants={fadeUp} className="block">
            Engineering
          </motion.span>
          <motion.span variants={fadeUp} className="block">
            <span className="text-brand-blue">Digital </span>
            <span className="gradient-text">Excellence.</span>
          </motion.span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 text-balance text-lg font-medium text-foreground/90 sm:text-xl"
        >
          Web. Mobile. Platforms. Built with precision.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          EzyIT creates high-performance websites, applications, and digital
          platforms for brands that value quality, scalability, and refined
          execution.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton onClick={() => scrollTo('contact')}>
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={() => scrollTo('services')}>
            Explore Services
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 mt-16 w-full max-w-4xl"
      >
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by teams worldwide
        </p>
        <Marquee speed="slow" className="mask-linear-fade">
          <div className="flex gap-8">
            {clientNames.map((name) => (
              <span
                key={name}
                className="whitespace-nowrap text-sm font-semibold text-muted-foreground/70"
              >
                {name}
              </span>
            ))}
          </div>
        </Marquee>
        <Marquee className="mt-3">
          <div className="flex gap-4">
            {techMarquee.map((tech) => (
              <span
                key={tech}
                className="whitespace-nowrap rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </Marquee>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
        onClick={() => scrollTo('services')}
        className="relative z-10 mt-12 flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Scroll to services"
      >
        Explore
        <ChevronDown className="h-4 w-4" />
      </motion.button>
    </section>
  )
}
