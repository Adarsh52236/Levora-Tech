'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import {
  projects,
  projectFilters,
  type Project,
} from '@/data/projects'
import { SectionHeading } from '@/components/ui/section-heading'
import { CaseStudyModal } from '@/components/ui/case-study-modal'
import { useAutoAdvance } from '@/lib/use-auto-advance'

export function Portfolio() {
  const [hoverPaused, setHoverPaused] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const { index: filterIndex, setIndex: setFilterIndex, ref } = useAutoAdvance({
    length: projectFilters.length,
    interval: 5500,
    paused: hoverPaused,
  })
  const filter = projectFilters[filterIndex]

  const featured = projects.find((p) => p.featured) ?? projects[0]
  const rest = projects.filter((p) => p.id !== featured.id)
  const visible =
    filter === 'All' ? rest : rest.filter((p) => p.category === filter)

  return (
    <section
      id="work"
      ref={ref}
      className="relative px-4 py-24 sm:py-32"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Work"
          title="Selected work."
          description="A look at the kinds of products we design and engineer across web, mobile, and platforms."
        />

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => setSelected(featured)}
          className="group mt-12 cursor-pointer overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-[0_12px_40px_-16px_rgba(0,56,118,0.2)]"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative h-56 md:h-auto md:min-h-[280px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                Featured · {featured.category}
              </span>
              <h3 className="font-display mt-3 text-2xl font-bold sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
                View case study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </motion.article>

        <div className="relative mt-10 flex flex-nowrap gap-2 overflow-x-auto pb-2 sm:flex-wrap">
          {projectFilters.map((f, i) => (
            <button
              key={f}
              onClick={() => setFilterIndex(i)}
              className={`relative whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                filter === f
                  ? 'border-brand-cyan/60 text-brand-cyan'
                  : 'border-border bg-secondary/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="portfolio-filter"
                  className="absolute inset-0 rounded-full bg-brand-blue/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                onClick={() => setSelected(p)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-background"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {p.category}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-4 py-2 text-sm font-medium backdrop-blur-md">
                      View Details <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
