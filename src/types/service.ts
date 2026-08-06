export interface Service {
  id: string
  title: string
  slug: string
  short_description: string
  description: string
  icon: string
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}
