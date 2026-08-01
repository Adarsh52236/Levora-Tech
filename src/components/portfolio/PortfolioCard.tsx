'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Project } from '@/types/project'

interface PortfolioCardProps {
  project: Project
  onClick: () => void
}

export function PortfolioCard({ project, onClick }: PortfolioCardProps) {
  const tags = project.technologies || project.tags || []

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-background"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={project.cover_image || project.image || ''}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {project.category || project.industry}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-4 py-2 text-sm font-medium backdrop-blur-md">
            View Details <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold">{project.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
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
  )
}
