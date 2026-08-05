'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/types/project'
import { useProjects } from '@/hooks/useProjects'
import { SectionLoader } from '@/components/loaders/UiverseLoader'
import { ApiError } from '@/components/common/ApiError'
import { EmptyState } from '@/components/common/EmptyState'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CaseStudyModal } from '@/components/ui/case-study-modal'
import { useAutoAdvance } from '@/hooks/useAutoAdvance'
import { FeaturedProjectCard } from './FeaturedProjectCard'
import { PortfolioGrid } from './PortfolioGrid'

export function PortfolioSection() {
  const { projects, isLoading, error, mutate } = useProjects()
  const [hoverPaused, setHoverPaused] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [filterIndex, setFilterIndex] = useState(0)

  const projectFilters = ['All', 'Web', 'Mobile', 'Platform']
  const filter = projectFilters[filterIndex] || 'All'

  // We can't use AutoAdvance easily with dynamic lengths if it's changing, 
  // but let's just use normal state for simplicity or keep AutoAdvance.
  // Replacing useAutoAdvance to prevent bugs if projectFilters changes size:
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (hoverPaused || projectFilters.length <= 1) return
    const timer = setInterval(() => {
      setFilterIndex((prev) => (prev + 1) % projectFilters.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [hoverPaused, projectFilters.length])

  const featured = projects && projects.length > 0 ? (projects.find((p) => p.featured) ?? projects[0]) : null
  const rest = projects ? projects.filter((p) => p.id !== featured?.id) : []
  const visible = filter === 'All' ? rest : rest.filter((p) => (p.category || p.industry) === filter)

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

        {error && !isLoading && (
          <div className="mt-12">
            <ApiError error={error} onRetry={() => mutate()} />
          </div>
        )}

        {isLoading && <SectionLoader label="Loading projects…" />}

        {!isLoading && !error && projects && projects.length === 0 && (
          <EmptyState
            title="No projects showcased yet."
            description="Check back later for portfolio updates."
          />
        )}

        {!isLoading && !error && projects && projects.length > 0 && featured && (
          <>
            <FeaturedProjectCard project={featured} onClick={() => setSelected(featured)} />

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

            <PortfolioGrid projects={visible} onSelect={(p) => setSelected(p)} />
          </>
        )}
      </div>

      <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
