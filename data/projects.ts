export type ProjectCategory = 'Web' | 'Mobile' | 'Platforms'

export type Project = {
  id: string
  title: string
  category: ProjectCategory
  description: string
  tags: string[]
  gradient: string
  image: string
  problem: string
  solution: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'luxury-service-website',
    title: 'Luxury Service Website',
    category: 'Web',
    description:
      'A refined website experience for a premium service brand.',
    tags: ['Next.js', 'CMS', 'Motion'],
    gradient: 'from-brand-blue/30 via-brand-cyan/20 to-transparent',
    image: '/images/projects/luxury-service.svg',
    problem: 'The brand needed a digital presence that matched their premium offline experience.',
    solution: 'A motion-rich Next.js site with headless CMS and sub-second load times.',
    featured: true,
  },
  {
    id: 'operations-dashboard',
    title: 'Operations Dashboard',
    category: 'Platforms',
    description:
      'A custom internal platform for managing workflows and data.',
    tags: ['React', 'Node.js', 'Auth'],
    gradient: 'from-brand-cyan/30 via-brand-blue/20 to-transparent',
    image: '/images/projects/operations-dashboard.svg',
    problem: 'Manual workflows were slowing operations across multiple teams.',
    solution: 'A unified dashboard with role-based access and real-time data sync.',
  },
  {
    id: 'mobile-booking-app',
    title: 'Mobile Booking App',
    category: 'Mobile',
    description:
      'A clean mobile experience for appointment and service booking.',
    tags: ['React Native', 'Expo'],
    gradient: 'from-brand-amber/25 via-brand-orange/20 to-transparent',
    image: '/images/projects/mobile-booking.svg',
    problem: 'Phone-based booking created scheduling conflicts and no-shows.',
    solution: 'Native-feel mobile app with push reminders and calendar sync.',
  },
  {
    id: 'saas-landing-experience',
    title: 'SaaS Landing Experience',
    category: 'Web',
    description:
      'A high-conversion product website with polished interactions.',
    tags: ['Next.js', 'Tailwind', 'A/B'],
    gradient: 'from-brand-blue/30 via-brand-amber/15 to-transparent',
    image: '/images/projects/saas-landing.svg',
    problem: 'Low conversion from paid traffic due to unclear value proposition.',
    solution: 'Conversion-optimized landing with interactive demos and social proof.',
  },
  {
    id: 'ios-client-portal',
    title: 'iOS Client Portal',
    category: 'Mobile',
    description:
      'A secure iOS-first experience for client communication and updates.',
    tags: ['SwiftUI', 'Security'],
    gradient: 'from-brand-cyan/30 via-brand-amber/15 to-transparent',
    image: '/images/projects/ios-portal.svg',
    problem: 'Clients lacked a secure channel for project updates and documents.',
    solution: 'End-to-end encrypted iOS portal with biometric authentication.',
  },
  {
    id: 'business-automation-platform',
    title: 'Business Automation Platform',
    category: 'Platforms',
    description:
      'A scalable system for automating business operations.',
    tags: ['TypeScript', 'Cloud', 'Automation'],
    gradient: 'from-brand-blue/30 via-brand-cyan/25 to-transparent',
    image: '/images/projects/automation-platform.svg',
    problem: 'Repetitive tasks consumed hours of staff time each week.',
    solution: 'Event-driven automation platform with visual workflow builder.',
  },
]

export const projectFilters: ('All' | ProjectCategory)[] = [
  'All',
  'Web',
  'Mobile',
  'Platforms',
]
