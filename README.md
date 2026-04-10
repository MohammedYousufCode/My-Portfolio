# Mohammed Yousuf — Portfolio

JARVIS-inspired dark portfolio with scroll animations, marquee skills ticker, and admin panel.

---

## 🚀 Quick Start (5 steps)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env
```
Edit `.env` and fill in:
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_ADMIN_PASSWORD=yourpassword
```

### 3. Set up Supabase
1. Go to [supabase.com](https://supabase.com) → New Project
2. Go to **SQL Editor** → New Query
3. Paste entire contents of `supabase-setup.sql` → Run
4. Go to **Storage** → New Bucket → name it `assets` → set to **Public**

### 4. Run locally
```bash
npm run dev
```
Open http://localhost:5173

### 5. Deploy to Vercel
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repo
3. Add env variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_ADMIN_PASSWORD)
4. Deploy → Get your live URL!

---

## 🔐 Admin Panel

Visit: `yoursite.com/admin`

Password: whatever you set in `VITE_ADMIN_PASSWORD`

**What you can manage:**
- ✅ Profile: name, bio, photo, resume, links
- ✅ Projects: add/edit/delete + upload hero images
- ✅ Skills: add/edit/delete with proficiency levels
- ✅ Certifications: add/edit/delete

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx        # Navigation + dark/light toggle
│   ├── Particles.tsx     # Animated particle background
│   ├── Hero.tsx          # Hero section + typewriter
│   ├── About.tsx         # About + "What I Do" cards
│   ├── Skills.tsx        # Skills grid + marquee ticker
│   ├── Marquee.tsx       # Infinite auto-scroll marquee
│   ├── Projects.tsx      # Project cards with alternating reveal
│   ├── Certifications.tsx
│   ├── Education.tsx     # Timeline + hackathons
│   └── Contact.tsx
├── pages/
│   ├── Portfolio.tsx     # Main page
│   └── Admin.tsx         # Admin panel
├── lib/
│   ├── supabase.ts       # Supabase client + types
│   ├── seed.ts           # Default data (works without Supabase)
│   └── theme.tsx         # Dark/light mode context
└── hooks/
    └── useScrollReveal.ts # Intersection Observer hook
```

---

## 🎨 Features

- **Dark/Light mode** toggle
- **Scroll-triggered reveal** animations (fade + slide)
- **Infinite marquee** ticker for skills (2 rows, opposite directions)
- **Typewriter** effect on hero title
- **Animated particles** background
- **Project image upload** via admin
- **Alternating slide-in** for project cards (left/right)
- **Timeline animation** for education
- **Mobile responsive** — clean single column on phones
- Works **without Supabase** (shows seed data)

---

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v3
- Framer Motion
- Supabase (database + storage)
- React Router v6
