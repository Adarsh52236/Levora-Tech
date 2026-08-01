export interface Testimonial {
  id: string
  client_name: string
  name?: string // fallback alias
  company: str
  designation: string
  role?: string // fallback alias
  avatar_url?: string
  avatar?: string // fallback alias
  rating: number
  message: string
  quote?: string // fallback alias
  featured: boolean
  created_at?: string
  updated_at?: string
}
