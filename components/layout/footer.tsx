'use client'

import { ArrowUp, Globe, Mail, Share2 } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

const social = [
  { icon: Share2, label: 'Social', href: '#' },
  { icon: Globe, label: 'Website', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@ezyit.com' },
]

export function Footer() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-border bg-section-cool px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center text-4xl">
            <Logo />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Engineering refined digital experiences for modern businesses.
          </p>
          <div className="mt-5 flex gap-3">
            {social.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand-cyan/40 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navigate
          </p>
          <nav className="mt-4 flex flex-col gap-2">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Stay in touch
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Get insights on product engineering and digital craft.
          </p>
          <div className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
              aria-label="Email for newsletter"
            />
            <button className="rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-primary-foreground">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} EzyIT. All rights reserved.
        </p>
        <button
          onClick={scrollTop}
          aria-label="Back to top"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-cyan/50 hover:text-foreground"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  )
}
