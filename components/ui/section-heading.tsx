'use client'

import { motion } from 'framer-motion'
import { blurReveal, staggerContainer } from '@/lib/motion'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={
        align === 'center'
          ? 'mx-auto max-w-2xl overflow-visible text-center'
          : 'max-w-2xl overflow-visible text-left'
      }
    >
      {eyebrow && (
        <motion.span
          variants={blurReveal}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan"
        >
          <span className="h-px w-6 bg-brand-cyan/60" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={blurReveal}
        className="font-display display-title mt-4 overflow-visible text-balance text-3xl font-bold tracking-display sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={blurReveal}
          className={`mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
