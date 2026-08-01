import {
  Globe,
  LayoutGrid,
  Smartphone,
  Apple,
  PenTool,
  Code2,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  id: string
  title: string
  short: string
  build: string
  tech: string[]
  idealFor: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    short:
      'Fast, responsive, premium websites built for clarity, speed, and conversion.',
    build:
      'Marketing sites, landing experiences, and content platforms engineered for performance and search visibility.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Headless CMS'],
    idealFor: 'Businesses, agencies, startups, service brands',
    icon: Globe,
  },
  {
    id: 'web-applications',
    title: 'Web Applications',
    short:
      'Scalable web platforms with clean architecture, secure logic, and refined user experiences.',
    build:
      'Dashboards, portals, and internal tools with robust state management, auth, and data layers.',
    tech: ['React', 'Node.js', 'APIs', 'Databases', 'Authentication'],
    idealFor: 'SaaS products, dashboards, portals, internal tools',
    icon: LayoutGrid,
  },
  {
    id: 'mobile-applications',
    title: 'Mobile Applications',
    short:
      'Cross-platform mobile experiences that feel fast, native, and effortless.',
    build:
      'Consumer and business apps with offline support, push notifications, and smooth motion.',
    tech: ['React Native', 'Expo', 'TypeScript', 'REST & GraphQL'],
    idealFor: 'Startups, service businesses, product teams',
    icon: Smartphone,
  },
  {
    id: 'ios-applications',
    title: 'iOS Applications',
    short:
      'iOS-first applications crafted for performance, polish, and platform precision.',
    build:
      'Native iOS experiences that respect Apple guidelines with refined detail and security.',
    tech: ['Swift', 'SwiftUI', 'Core Data', 'App Store delivery'],
    idealFor: 'Premium products, client portals, mobile-first brands',
    icon: Apple,
  },
  {
    id: 'ui-ux-engineering',
    title: 'UI/UX Engineering',
    short:
      'Interfaces that are clear, beautiful, and engineered to be easy to use.',
    build:
      'Design systems, prototypes, and production-ready interfaces with measurable usability.',
    tech: ['Figma', 'Design Systems', 'Prototyping', 'Accessibility'],
    idealFor: 'Product teams, redesigns, new digital products',
    icon: PenTool,
  },
  {
    id: 'custom-software',
    title: 'Custom Software Solutions',
    short:
      'Tailored software built around your operations, data, and growth model.',
    build:
      'Automation systems, integrations, and bespoke platforms aligned to real business logic.',
    tech: ['TypeScript', 'Cloud', 'APIs', 'Automation'],
    idealFor: 'Operations-heavy businesses, scaling companies',
    icon: Code2,
  },
]
