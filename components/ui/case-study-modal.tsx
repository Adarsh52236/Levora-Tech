'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import type { Project } from '@/data/projects'

type CaseStudyModalProps = {
  project: Project | null
  onClose: () => void
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] flex items-end justify-center p-4 sm:items-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"
              aria-label="Close case study"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative h-48 w-full overflow-hidden sm:h-56">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                {project.category}
              </span>
              <h3 className="font-display mt-4 text-2xl font-bold">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                    Problem
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                    Solution
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
