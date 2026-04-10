import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { seedProfile, seedProjects, seedSkills, seedCertifications, seedEducation, seedHackathons } from '../lib/seed'
import type { Profile, Project, Skill, Certification } from '../lib/supabase'
import { Lock, LogOut, Save, Plus, Trash2, Upload, Eye, ChevronDown, ChevronUp } from 'lucide-react'

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
const hasSupabase = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_project_url'
)

// ─── Login ─────────────────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: () => void }) {
  const [pass, setPass] = useState('')
  const [err, setErr] = useState(false)

  const attempt = () => {
    if (pass === ADMIN_PASS) { sessionStorage.setItem('admin', '1'); onLogin() }
    else { setErr(true); setTimeout(() => setErr(false), 1500) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
            <Lock size={22} style={{ color: 'var(--gold)' }} />
          </div>
          <h1 className="font-cinzel font-bold text-2xl text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="font-mono text-xs text-gray-400 tracking-widest mt-2">PORTFOLIO MANAGEMENT</p>
        </div>

        <div className="card-base p-6 space-y-4">
          <input
            type="password" placeholder="Enter password" value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && attempt()}
            className={`w-full px-4 py-3 rounded-lg font-mono text-sm bg-gray-100 dark:bg-white/5
              border transition-colors outline-none
              ${err ? 'border-red-400' : 'border-gray-200 dark:border-white/10 focus:border-yellow-500'}`}
          />
          {err && <p className="font-mono text-xs text-red-400 tracking-wider">INCORRECT PASSWORD</p>}
          <button onClick={attempt} className="btn-gold w-full justify-center flex">ENTER</button>
        </div>
      </div>
    </div>
  )
}

// ─── Section wrapper ────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="card-base overflow-hidden mb-6">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/5">
        <span className="font-mono text-sm tracking-widest uppercase text-gray-700 dark:text-gray-300">{title}</span>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && <div className="p-6">{children}</div>}
    </div>
  )
}

// ─── Field ──────────────────────────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', rows }: {
  label: string; value: string | number; onChange: (v: string) => void
  type?: string; rows?: number
}) {
  const cls = "w-full px-3 py-2.5 rounded-lg font-rajdhani text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-yellow-500 outline-none transition-colors text-gray-900 dark:text-white"
  return (
    <div>
      <label className="block font-mono text-xs text-gray-400 tracking-widest uppercase mb-1.5">{label}</label>
      {rows ? (
        <textarea value={String(value)} onChange={e => onChange(e.target.value)} rows={rows} className={cls} />
      ) : (
        <input type={type} value={String(value)} onChange={e => onChange(e.target.value)} className={cls} />
      )}
    </div>
  )
}

// ─── Main Admin ─────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(sessionStorage.getItem('admin') === '1')
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState<Profile>(seedProfile)
  const [projects, setProjects] = useState<Project[]>(seedProjects)
  const [skills, setSkills] = useState<Skill[]>(seedSkills)
  const [certs, setCerts] = useState<Certification[]>(seedCertifications)
  const [uploading, setUploading] = useState<string | null>(null)

  useEffect(() => {
    if (!authed || !hasSupabase) return
    const load = async () => {
      const [p, pr, sk, ce] = await Promise.all([
        supabase.from('profile').select('*').single(),
        supabase.from('projects').select('*').order('order_index'),
        supabase.from('skills').select('*').order('order_index'),
        supabase.from('certifications').select('*').order('order_index'),
      ])
      if (p.data) setProfile(p.data)
      if (pr.data?.length) setProjects(pr.data)
      if (sk.data?.length) setSkills(sk.data)
      if (ce.data?.length) setCerts(ce.data)
    }
    load()
  }, [authed])

  const saveAll = async () => {
    if (!hasSupabase) { alert('Add Supabase keys to .env to save data'); return }
    await Promise.all([
      supabase.from('profile').upsert(profile),
      ...projects.map(p => supabase.from('projects').upsert(p)),
      ...skills.map(s => supabase.from('skills').upsert(s)),
      ...certs.map(c => supabase.from('certifications').upsert(c)),
    ])
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const uploadFile = async (file: File, bucket: string, field: 'photo_url' | 'resume_url') => {
    if (!hasSupabase) { alert('Add Supabase keys to upload files'); return }
    setUploading(field)
    const ext = file.name.split('.').pop()
    const path = `${field}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      setProfile(p => ({ ...p, [field]: data.publicUrl }))
    }
    setUploading(null)
  }

  const uploadProjectImage = async (file: File, projectId: string) => {
    if (!hasSupabase) { alert('Add Supabase keys to upload files'); return }
    setUploading(projectId)
    const path = `project-${projectId}-${Date.now()}.${file.name.split('.').pop()}`
    const { error } = await supabase.storage.from('assets').upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from('assets').getPublicUrl(path)
      setProjects(ps => ps.map(p => p.id === projectId ? { ...p, image_url: data.publicUrl } : p))
    }
    setUploading(null)
  }

  if (!authed) return <Login onLogin={() => setAuthed(true)} />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-dark-nav/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-cinzel font-bold text-sm" style={{ color: 'var(--gold)' }}>ADMIN PANEL</span>
          <span className="font-mono text-xs text-gray-400 ml-4 tracking-widest">M.YOUSUF PORTFOLIO</span>
        </div>
        <div className="flex gap-3">
          <a href="/" target="_blank" className="btn-gold flex items-center gap-2 text-xs py-2">
            <Eye size={13} /> Preview
          </a>
          <button onClick={saveAll}
            className={`btn-gold flex items-center gap-2 text-xs py-2 ${saved ? 'opacity-70' : ''}`}
            style={saved ? { borderColor: '#34d399', color: '#34d399' } : {}}>
            <Save size={13} /> {saved ? 'Saved!' : 'Save All'}
          </button>
          <button onClick={() => { sessionStorage.removeItem('admin'); setAuthed(false) }}
            className="btn-gold flex items-center gap-2 text-xs py-2" style={{ borderColor: 'rgba(239,68,68,0.4)', color: '#ef4444' }}>
            <LogOut size={13} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {!hasSupabase && (
          <div className="mb-6 p-4 rounded-lg font-mono text-xs tracking-wider"
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)' }}>
            ⚠ DEMO MODE — Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to persist data
          </div>
        )}

        {/* Profile */}
        <Section title="Profile">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" value={profile.name} onChange={v => setProfile(p => ({ ...p, name: v }))} />
            <Field label="Title / Role" value={profile.title} onChange={v => setProfile(p => ({ ...p, title: v }))} />
            <Field label="Email" value={profile.email} onChange={v => setProfile(p => ({ ...p, email: v }))} />
            <Field label="Phone" value={profile.phone} onChange={v => setProfile(p => ({ ...p, phone: v }))} />
            <Field label="Location" value={profile.location} onChange={v => setProfile(p => ({ ...p, location: v }))} />
            <Field label="Available From" value={profile.available_from} onChange={v => setProfile(p => ({ ...p, available_from: v }))} />
            <Field label="CGPA" value={profile.cgpa} onChange={v => setProfile(p => ({ ...p, cgpa: v }))} />
            <Field label="Hackathon Prize" value={profile.hackathon_prize} onChange={v => setProfile(p => ({ ...p, hackathon_prize: v }))} />
            <Field label="LinkedIn URL" value={profile.linkedin} onChange={v => setProfile(p => ({ ...p, linkedin: v }))} />
            <Field label="GitHub URL" value={profile.github} onChange={v => setProfile(p => ({ ...p, github: v }))} />
            <div className="sm:col-span-2">
              <Field label="Bio" value={profile.bio} onChange={v => setProfile(p => ({ ...p, bio: v }))} rows={3} />
            </div>
          </div>

          {/* Photo upload */}
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-gray-400 tracking-widest uppercase mb-2">Profile Photo</label>
              <div className="flex gap-3 items-center">
                {profile.photo_url && <img src={profile.photo_url} className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: 'var(--gold)' }} />}
                <label className="btn-gold flex items-center gap-2 text-xs py-2 cursor-pointer">
                  <Upload size={13} /> {uploading === 'photo_url' ? 'Uploading...' : 'Upload Photo'}
                  <input type="file" accept="image/*" className="hidden"
                    onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0], 'assets', 'photo_url')} />
                </label>
              </div>
              <Field label="Or paste photo URL" value={profile.photo_url} onChange={v => setProfile(p => ({ ...p, photo_url: v }))} />
            </div>
            <div>
              <label className="block font-mono text-xs text-gray-400 tracking-widest uppercase mb-2">Resume PDF</label>
              <label className="btn-gold flex items-center gap-2 text-xs py-2 cursor-pointer w-fit mb-2">
                <Upload size={13} /> {uploading === 'resume_url' ? 'Uploading...' : 'Upload Resume PDF'}
                <input type="file" accept=".pdf" className="hidden"
                  onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0], 'assets', 'resume_url')} />
              </label>
              <Field label="Or paste resume URL" value={profile.resume_url} onChange={v => setProfile(p => ({ ...p, resume_url: v }))} />
            </div>
          </div>
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <div className="space-y-6">
            {projects.map((proj, i) => (
              <div key={proj.id} className="p-4 rounded-lg border border-gray-100 dark:border-white/5 relative">
                <button onClick={() => setProjects(ps => ps.filter(p => p.id !== proj.id))}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-500 transition-colors">
                  <Trash2 size={15} />
                </button>
                <div className="grid sm:grid-cols-2 gap-3 pr-6">
                  <Field label="Title" value={proj.title} onChange={v => setProjects(ps => ps.map((p, j) => j === i ? { ...p, title: v } : p))} />
                  <Field label="GitHub URL" value={proj.github_url} onChange={v => setProjects(ps => ps.map((p, j) => j === i ? { ...p, github_url: v } : p))} />
                  <Field label="Live URL" value={proj.live_url} onChange={v => setProjects(ps => ps.map((p, j) => j === i ? { ...p, live_url: v } : p))} />
                  <div>
                    <label className="block font-mono text-xs text-gray-400 tracking-widest uppercase mb-1.5">Project Image</label>
                    <div className="flex gap-2 items-center">
                      {proj.image_url && <img src={proj.image_url} className="w-10 h-10 rounded object-cover" />}
                      <label className="btn-gold flex items-center gap-1 text-xs py-1.5 cursor-pointer">
                        <Upload size={11} /> {uploading === proj.id ? 'Uploading...' : 'Upload'}
                        <input type="file" accept="image/*" className="hidden"
                          onChange={e => e.target.files?.[0] && uploadProjectImage(e.target.files[0], proj.id)} />
                      </label>
                    </div>
                    <input type="text" placeholder="Or paste image URL" value={proj.image_url}
                      onChange={e => setProjects(ps => ps.map((p, j) => j === i ? { ...p, image_url: e.target.value } : p))}
                      className="w-full mt-1 px-3 py-2 rounded font-mono text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Description" value={proj.description} rows={2}
                      onChange={v => setProjects(ps => ps.map((p, j) => j === i ? { ...p, description: v } : p))} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs text-gray-400 tracking-widest uppercase mb-1.5">Tech Stack (comma separated)</label>
                    <input type="text" value={proj.tech_stack.join(', ')}
                      onChange={e => setProjects(ps => ps.map((p, j) => j === i ? { ...p, tech_stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) } : p))}
                      className="w-full px-3 py-2.5 rounded-lg font-rajdhani text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-yellow-500 outline-none transition-colors" />
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">Type:</span>
                      <button onClick={() => setProjects(ps => ps.map((p, j) => j === i ? { ...p, project_type: 'main' as const } : p))}
                        className={`px-3 py-1 font-mono text-xs rounded border transition-all ${proj.project_type === 'main' ? 'border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-white/10 text-gray-400'}`}>
                        Main (DA/ML)
                      </button>
                      <button onClick={() => setProjects(ps => ps.map((p, j) => j === i ? { ...p, project_type: 'hobby' as const } : p))}
                        className={`px-3 py-1 font-mono text-xs rounded border transition-all ${proj.project_type === 'hobby' ? 'border-cyan-400 text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' : 'border-gray-200 dark:border-white/10 text-gray-400'}`}>
                        Hobby
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id={`feat-${proj.id}`} checked={proj.is_featured}
                        onChange={e => setProjects(ps => ps.map((p, j) => j === i ? { ...p, is_featured: e.target.checked } : p))} />
                      <label htmlFor={`feat-${proj.id}`} className="font-mono text-xs text-gray-400 tracking-widest uppercase cursor-pointer">Featured</label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setProjects(ps => [...ps, {
            id: Date.now().toString(), title: 'New Project', description: '',
            tech_stack: [], github_url: '', live_url: '', image_url: '', is_featured: false, project_type: 'main' as const, order_index: ps.length + 1
          }])} className="mt-4 btn-gold flex items-center gap-2 text-xs py-2">
            <Plus size={13} /> Add Project
          </button>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="grid sm:grid-cols-2 gap-3">
            {skills.map((sk, i) => (
              <div key={sk.id} className="flex items-center gap-2 p-3 rounded-lg border border-gray-100 dark:border-white/5">
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <input value={sk.name} onChange={e => setSkills(ss => ss.map((s, j) => j === i ? { ...s, name: e.target.value } : s))}
                    className="px-2 py-1.5 rounded font-rajdhani text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none col-span-2" />
                  <input type="number" min={0} max={100} value={sk.level}
                    onChange={e => setSkills(ss => ss.map((s, j) => j === i ? { ...s, level: +e.target.value } : s))}
                    className="px-2 py-1.5 rounded font-mono text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none" />
                </div>
                <button onClick={() => setSkills(ss => ss.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => setSkills(ss => [...ss, { id: Date.now().toString(), name: 'New Skill', category: 'Tools', level: 70, order_index: ss.length + 1 }])}
            className="mt-3 btn-gold flex items-center gap-2 text-xs py-2">
            <Plus size={13} /> Add Skill
          </button>
        </Section>

        {/* Certifications */}
        <Section title="Certifications">
          <div className="space-y-3">
            {certs.map((cert, i) => (
              <div key={cert.id} className="grid sm:grid-cols-4 gap-2 items-center p-3 rounded-lg border border-gray-100 dark:border-white/5">
                <input value={cert.title} onChange={e => setCerts(cs => cs.map((c, j) => j === i ? { ...c, title: e.target.value } : c))}
                  placeholder="Title" className="sm:col-span-2 px-2 py-1.5 rounded font-rajdhani text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none" />
                <input value={cert.issuer} onChange={e => setCerts(cs => cs.map((c, j) => j === i ? { ...c, issuer: e.target.value } : c))}
                  placeholder="Issuer" className="px-2 py-1.5 rounded font-rajdhani text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none" />
                <div className="flex gap-2">
                  <input value={cert.date} onChange={e => setCerts(cs => cs.map((c, j) => j === i ? { ...c, date: e.target.value } : c))}
                    placeholder="Date" className="flex-1 px-2 py-1.5 rounded font-mono text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none" />
                  <button onClick={() => setCerts(cs => cs.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setCerts(cs => [...cs, { id: Date.now().toString(), title: '', issuer: '', date: '', credential_url: '', order_index: cs.length + 1 }])}
            className="mt-3 btn-gold flex items-center gap-2 text-xs py-2">
            <Plus size={13} /> Add Certification
          </button>
        </Section>

        <div className="flex justify-end mt-4">
          <button onClick={saveAll}
            className={`btn-gold flex items-center gap-2 ${saved ? 'opacity-70' : ''}`}
            style={saved ? { borderColor: '#34d399', color: '#34d399' } : {}}>
            <Save size={15} /> {saved ? '✓ Saved!' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
