import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, delay = 0, y = 22, className, as = 'div' }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'article' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </Tag>
  )
}

// A manga chapter title: inked rule, chapter number, huge title, vertical Japanese.
export function Chapter({ id, no, name, jp, title, lede }: { id: string; no: string; name: string; jp: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <header className="relative">
      <Reveal y={0}>
        <div className="flex items-center gap-4 border-t-[3px] border-ink pt-3">
          <span className="label text-red">Chapter {no}</span>
          <span className="label text-muted">{name}</span>
          <span className="jp-sm ml-auto text-[14px] text-muted">{jp}</span>
        </div>
      </Reveal>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:gap-16">
        <Reveal delay={0.05}>
          <h2 id={id} className="display text-[54px] sm:text-[78px] lg:text-[104px]">{title}</h2>
        </Reveal>
        {lede && (
          <Reveal delay={0.12}>
            <p className="max-w-md text-[17px] leading-[1.6] text-ink-2 lg:pb-2">{lede}</p>
          </Reveal>
        )}
      </div>
    </header>
  )
}

// Hand-inked marker stroke behind one key word.
export function Brush({ children, color = 'var(--color-red)' }: { children: ReactNode; color?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <motion.span
        aria-hidden
        className="absolute bottom-[0.06em] left-[-0.06em] -z-0 h-[0.3em] w-[calc(100%+0.12em)] origin-left -rotate-[1.5deg]"
        style={{ background: color, borderRadius: '2px 40% 6px 30% / 4px 60% 3px 50%' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35, ease }}
      />
      <span className="relative">{children}</span>
    </span>
  )
}

// Original skull-and-crossbones mark: the crossbones are a wrench and a pen.
export function JollyRoger({ className = '', size = 120 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden>
      <g stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M22 98 L98 30" />
        <path d="M22 30 L98 98" />
      </g>
      {/* wrench head */}
      <path d="M90 22 a10 10 0 1 0 14 14 l-6-1-3-3-1-6z" fill="var(--color-ink)" />
      {/* pen nib */}
      <path d="M96 92 l10 10 -14 2z" fill="var(--color-ink)" />
      <circle cx="21" cy="29" r="6" fill="var(--color-ink)" />
      <circle cx="21" cy="99" r="6" fill="var(--color-ink)" />
      <path d="M60 18c-17 0-28 11-28 26 0 9 4 15 10 19v9c0 3 2 5 5 5h26c3 0 5-2 5-5v-9c6-4 10-10 10-19 0-15-11-26-28-26z" fill="var(--color-sheet)" stroke="var(--color-ink)" strokeWidth="4" />
      <ellipse cx="49" cy="46" rx="7" ry="8" fill="var(--color-ink)" />
      <ellipse cx="71" cy="46" rx="7" ry="8" fill="var(--color-ink)" />
      <path d="M60 54 l-4 7h8z" fill="var(--color-ink)" />
      <path d="M50 70v7M57 70v7M64 70v7M71 70v7" stroke="var(--color-ink)" strokeWidth="3" />
      {/* red headband */}
      <path d="M33 34c15-7 39-7 54 0l-2 7c-15-6-35-6-50 0z" fill="var(--color-red)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}
