export interface Project {
  id: string
  title: string
  slug: string
  description: string
  industry: string
  client_name: string
  cover_image: string
  image?: string // fallback accessor
  gallery_images: string[]
  technologies: string[]
  tags?: string[] // mapped tags accessor
  category?: string // mapped category accessor
  live_url?: string
  github_url?: string
  featured: boolean
  display_order: number
  created_at?: string
  updated_at?: string
}
