'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { COMPANY_INFO } from '@/lib/constants/company'

const points = [
  'Performance-first development',
  'Scalable architecture',
  'Pixel-level interface precision',
  'Secure implementation practices',
  'Transparent communication',
  'Long-term partnership mindset',
]

export function WhyChooseSection() {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow={`Why ${COMPANY_INFO.name}`}
            title="Built for businesses that care about quality."
            description="We work as an extended engineering team, balancing craft with the practical needs of your business."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {points.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-blue/15 text-brand-cyan">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-medium text-foreground/90">{p}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
