'use client'

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const blurReveal = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

export const springSnappy = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 28,
}

export const easeOutExpo = [0.22, 1, 0.36, 1] as const

export function useReducedMotion() {
  return useFramerReducedMotion() ?? false
}
