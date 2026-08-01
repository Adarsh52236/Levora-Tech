'use client'

import { motion } from 'framer-motion'
import { NAV_ITEMS } from '@/lib/constants/navigation'

interface NavLinksProps {
  activeId: string
  onSelect: (href: string) => void
}

export function NavLinks({ activeId, onSelect }: NavLinksProps) {
  return (
    <div className="hidden items-center gap-1 md:flex">
      {NAV_ITEMS.map((l) => {
        const id = l.href.replace('#', '')
        const isActive = activeId === id || (activeId === 'home' && id === 'services')
        return (
          <button
            key={l.href}
            onClick={() => onSelect(id)}
            className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className={isActive ? 'text-foreground' : ''}>
              {l.label}
            </span>
            {isActive && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-x-3 -bottom-0.5 h-px brand-divider"
              />
            )}
            {!isActive && (
              <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 brand-divider transition-transform duration-300 group-hover:scale-x-100" />
            )}
          </button>
        )
      })}
    </div>
  )
}
