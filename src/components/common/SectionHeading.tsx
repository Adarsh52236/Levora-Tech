'use client'

import { motion } from 'framer-motion'
import { springSnappy } from '@/lib/motion'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <div className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSnappy}
        className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-cyan"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...springSnappy, delay: 0.05 }}
        className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springSnappy, delay: 0.1 }}
          className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
