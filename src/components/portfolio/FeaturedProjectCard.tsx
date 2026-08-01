'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Project } from '@/types/project'

interface FeaturedProjectCardProps {
  project: Project
  onClick: () => void
}

export function FeaturedProjectCard({ project, onClick }: FeaturedProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group mt-12 cursor-pointer overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-[0_12px_40px_-16px_rgba(0,56,118,0.2)]"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative h-56 md:h-auto md:min-h-[280px]">
          <Image
            src={project.cover_image || project.image || ''}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-center p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
            Featured · {project.category || project.industry}
          </span>
          <h3 className="font-display mt-3 text-2xl font-bold sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
            View case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}
