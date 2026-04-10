import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Profile {
  id: number
  name: string
  title: string
  bio: string
  photo_url: string
  resume_url: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  available_from: string
  cgpa: string
  total_certs: number
  hackathon_prize: string
}

export interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github_url: string
  live_url: string
  image_url: string
  is_featured: boolean
  project_type: 'main' | 'hobby'   // 'main' = DA/ML, 'hobby' = hackathon/AI-assisted
  order_index: number
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number // 1-100
  order_index: number
}

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  credential_url: string
  order_index: number
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  score: string
  order_index: number
}

export interface Hackathon {
  id: string
  title: string
  prize: string
  year: string
  description: string
  live_url: string
  order_index: number
}
