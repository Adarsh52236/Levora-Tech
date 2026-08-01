'use client'

import { Mail } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { COMPANY_INFO } from '@/lib/constants/company'
import { ContactForm } from './ContactForm'

export function ContactSection() {
  return (
    <section id="contact" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something exceptional."
              description="Tell us what you are planning. We'll help shape the right digital solution."
            />
            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors hover:border-brand-cyan/40"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-cyan">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Email us directly</p>
                  <p className="font-medium">{COMPANY_INFO.email}</p>
                </div>
              </a>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We typically respond within one business day. Share as much context
                as you can — goals, timeline, and budget range help us prepare
                thoughtfully.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
