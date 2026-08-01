'use client'

import { motion } from 'framer-motion'
import { Testimonial } from '@/types/testimonial'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const quoteText = testimonial.quote || testimonial.message
  const authorName = testimonial.name || testimonial.client_name
  const authorRole = testimonial.role || testimonial.designation
  const companyName = testimonial.company
  const initials = authorName ? authorName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'LT'

  return (
    <motion.blockquote
      key={testimonial.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative"
    >
      <p className="text-balance text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
        {quoteText}
      </p>
      <footer className="mt-8 flex items-center gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-semibold text-brand-cyan">
          {initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {authorName}
          </p>
          <p className="text-xs text-muted-foreground">
            {authorRole}, {companyName}
          </p>
        </div>
      </footer>
    </motion.blockquote>
  )
}
