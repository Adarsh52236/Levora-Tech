'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Project } from '@/types/project'
import { PortfolioCard } from './PortfolioCard'

interface PortfolioGridProps {
  projects: Project[]
  onSelect: (p: Project) => void
}

export function PortfolioGrid({ projects, onSelect }: PortfolioGridProps) {
  return (
    <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {projects.map((p) => (
          <PortfolioCard key={p.id} project={p} onClick={() => onSelect(p)} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
