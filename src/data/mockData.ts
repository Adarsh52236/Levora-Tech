import { Service } from '@/types/service'
import { Project } from '@/types/project'
import { Testimonial } from '@/types/testimonial'

export const fallbackServices: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    slug: 'web-development',
    short_description: 'We build fast, responsive, and scalable web applications.',
    description: 'We build fast, responsive, and scalable web applications using the latest technologies.',
    icon: 'Code',
    display_order: 1,
    is_active: true
  },
  {
    id: '2',
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    short_description: 'Native and cross-platform mobile apps for iOS and Android.',
    description: 'Native and cross-platform mobile apps for iOS and Android.',
    icon: 'Smartphone',
    display_order: 2,
    is_active: true
  },
  {
    id: '3',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    short_description: 'Beautiful, intuitive interfaces that users love.',
    description: 'Beautiful, intuitive interfaces that users love.',
    icon: 'PenTool',
    display_order: 3,
    is_active: true
  }
]

export const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    description: 'A scalable e-commerce platform built with Next.js and Stripe.',
    industry: 'Retail',
    client_name: 'Shopify Plus',
    cover_image: '/images/projects/project1.jpg',
    gallery_images: [],
    technologies: ['Next.js', 'React', 'Stripe', 'Tailwind CSS'],
    featured: true,
    display_order: 1
  },
  {
    id: '2',
    title: 'Healthcare Dashboard',
    slug: 'healthcare-dashboard',
    description: 'A dashboard for medical professionals to manage patient data.',
    industry: 'Healthcare',
    client_name: 'HealthTech Inc',
    cover_image: '/images/projects/project2.jpg',
    gallery_images: [],
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    featured: true,
    display_order: 2
  }
]

export const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    client_name: 'John Doe',
    company: 'Tech Corp',
    designation: 'CTO',
    rating: 5,
    message: 'Levora Tech delivered our project on time and beyond our expectations. Highly recommended!',
    featured: true
  },
  {
    id: '2',
    client_name: 'Jane Smith',
    company: 'Innovate LLC',
    designation: 'CEO',
    rating: 5,
    message: 'The team was incredibly professional and built a stunning platform for our business.',
    featured: true
  }
]
