export type Testimonial = {
  id: string
  quote: string
  author: string
  role: string
  company: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'EzyIT brought clarity and structure to our digital product. The final experience felt faster, cleaner, and far more professional.',
    author: 'Sarah Chen',
    role: 'Founder',
    company: 'BrightPath Services',
    initials: 'SC',
  },
  {
    id: 't2',
    quote:
      'Their attention to detail was visible in every screen. The platform felt polished from the first version.',
    author: 'Marcus Webb',
    role: 'Operations Lead',
    company: 'NovaScale',
    initials: 'MW',
  },
  {
    id: 't3',
    quote:
      'They understood both the business requirement and the technical execution. That balance made the project smooth.',
    author: 'Priya Sharma',
    role: 'Product Manager',
    company: 'Vertex Labs',
    initials: 'PS',
  },
]
