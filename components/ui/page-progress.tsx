'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/lib/motion'

export function PageProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  if (reduced) return null

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[200] h-0.5 origin-left bg-gradient-to-r from-brand-blue via-brand-orange to-brand-amber"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
