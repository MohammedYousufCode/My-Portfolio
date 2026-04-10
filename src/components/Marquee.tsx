import { useEffect, useRef } from 'react'

interface MarqueeProps {
  items: string[]
  speed?: number
  reverse?: boolean
  className?: string
}

export default function Marquee({ items, speed = 35, reverse = false, className = '' }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let start: number | null = null
    let raf: number
    let position = 0
    const singleWidth = track.scrollWidth / 2

    const animate = (ts: number) => {
      if (!start) start = ts
      const delta = (ts - start) / 1000
      start = ts

      position += reverse ? -(speed * delta) : (speed * delta)
      if (!reverse && position >= singleWidth) position -= singleWidth
      if (reverse && position <= -singleWidth) position += singleWidth

      track.style.transform = `translateX(${-position}px)`
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [speed, reverse])

  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex gap-4 w-max will-change-transform">
        {doubled.map((item, i) => (
          <span key={i}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full border font-mono text-xs tracking-widest uppercase whitespace-nowrap
              border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400
              hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
