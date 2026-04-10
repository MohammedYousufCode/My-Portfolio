import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import {
  seedProfile, seedProjects, seedSkills,
  seedCertifications, seedEducation, seedHackathons
} from '../lib/seed'
import type { Profile, Project, Skill, Certification, Education, Hackathon } from '../lib/supabase'

import Particles from '../components/Particles'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Certifications from '../components/Certifications'
import EducationSection from '../components/Education'
import Contact from '../components/Contact'

const hasSupabase = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_project_url'
)

export default function Portfolio() {
  const [profile, setProfile] = useState<Profile>(seedProfile)
  const [projects, setProjects] = useState<Project[]>(seedProjects)
  const [skills, setSkills] = useState<Skill[]>(seedSkills)
  const [certs, setCerts] = useState<Certification[]>(seedCertifications)
  const [education, setEducation] = useState<Education[]>(seedEducation)
  const [hackathons, setHackathons] = useState<Hackathon[]>(seedHackathons)

  useEffect(() => {
    if (!hasSupabase) return

    const load = async () => {
      const [p, pr, sk, ce, ed, ha] = await Promise.all([
        supabase.from('profile').select('*').single(),
        supabase.from('projects').select('*').order('order_index'),
        supabase.from('skills').select('*').order('order_index'),
        supabase.from('certifications').select('*').order('order_index'),
        supabase.from('education').select('*').order('order_index'),
        supabase.from('hackathons').select('*').order('order_index'),
      ])
      if (p.data) setProfile(p.data)
      if (pr.data?.length) setProjects(pr.data)
      if (sk.data?.length) setSkills(sk.data)
      if (ce.data?.length) setCerts(ce.data)
      if (ed.data?.length) setEducation(ed.data)
      if (ha.data?.length) setHackathons(ha.data)
    }

    load()
  }, [])

  return (
    <div className="min-h-screen relative ironman-bg">
      <Particles />
      <Navbar />
      <main className="relative z-10">
        <Hero profile={profile} />
        <div className="section-divider" />
        <About profile={profile} />
        <div className="section-divider" />
        <Skills skills={skills} />
        <div className="section-divider" />
        <Projects projects={projects} />
        <div className="section-divider" />
        <Certifications certs={certs} />
        <div className="section-divider" />
        <EducationSection education={education} hackathons={hackathons} />
        <div className="section-divider" />
        <Contact profile={profile} />
      </main>
    </div>
  )
}
