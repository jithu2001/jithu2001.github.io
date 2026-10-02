import { AnimatePresence, motion } from 'motion/react'
import { useState, type KeyboardEvent } from 'react'
import { skillGroups } from '../data/content'
import { useMediaQuery } from '../hooks/useDeviceTier'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const palette = ['#3d6bf5', '#5a63f2', '#0b8bc4', '#0e9f8e', '#2f7ff0', '#7c6cf0', '#c27c0e', '#d9466f']

function Network({ index }: { index: number }) {
  const g = skillGroups[index]
  const color = palette[index]
  const n = g.items.length
  // Place items on an ellipse; start at the top and go clockwise.
  const pts = g.items.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    return { x: 50 + Math.cos(a) * 36, y: 50 + Math.sin(a) * 37 }
  })

  return (
    <div className="relative aspect-[1.25] w-full">
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <ellipse cx="50" cy="50" rx="36" ry="37" fill="none" stroke="var(--color-line-strong)" strokeWidth="0.15" strokeDasharray="0.6 0.9" vectorEffect="non-scaling-stroke" />
        <ellipse cx="50" cy="50" rx="18" ry="19" fill="none" stroke="var(--color-line)" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
        <AnimatePresence mode="popLayout">
          {pts.map((p, i) => (
            <motion.line
              key={`${g.id}-${i}`}
              x1="50" y1="50" x2={p.x} y2={p.y}
              stroke={color}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </AnimatePresence>
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={g.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="rounded-2xl px-5 py-3 text-center text-white shadow-lift" style={{ background: color }}>
            <p className="text-[15px] font-semibold whitespace-nowrap">{g.label}</p>
            <p className="font-mono text-[10.5px] text-white/75">{n} tools</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <ul aria-label={`${g.label} skills`}>
        <AnimatePresence mode="popLayout">
          {g.items.map((item, i) => (
            <motion.li
              key={`${g.id}-${item}`}
              initial={{ opacity: 0, scale: 0.6, left: '50%', top: '50%' }}
              animate={{ opacity: 1, scale: 1, left: `${pts[i].x}%`, top: `${pts[i].y}%` }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 220, damping: 24, delay: i * 0.025 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <span className="glass block rounded-full px-3 py-1.5 text-[13px] whitespace-nowrap text-ink-2">
                <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: color }} />
                {item}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export function Skills() {
  const [active, setActive] = useState(0)
  const wide = useMediaQuery('(min-width: 1024px)')
  const g = skillGroups[active]

  const onKey = (e: KeyboardEvent) => {
    const n = skillGroups.length
    const map: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    if (!(e.key in map)) return
    e.preventDefault()
    const next = (active + map[e.key] + n) % n
    setActive(next)
    document.getElementById(`skill-tab-${skillGroups[next].id}`)?.focus()
  }

  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="container-x">
        <SectionHeader
          id="skills-title"
          index="06"
          eyebrow="Skills"
          title="A toolkit shaped by what each job needed."
          lede="I picked these up on real projects, not tutorials. Choose an area to see the tools I use there."
        />

        <Reveal delay={0.1} className="mt-14">
          <div className="card grid overflow-hidden lg:grid-cols-[320px_1fr]">
            <div
              role="tablist"
              aria-label="Skill areas"
              aria-orientation={wide ? 'vertical' : 'horizontal'}
              onKeyDown={onKey}
              className="flex gap-1.5 overflow-x-auto border-b border-line p-3 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0 lg:p-4"
            >
              {skillGroups.map((s, i) => {
                const on = i === active
                return (
                  <button
                    key={s.id}
                    id={`skill-tab-${s.id}`}
                    role="tab"
                    aria-selected={on}
                    aria-controls="skill-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => wide && setActive(i)}
                    className={`relative shrink-0 rounded-xl px-4 py-2.5 text-left text-[14.5px] transition-colors lg:py-3 ${on ? 'text-ink' : 'text-muted hover:text-ink'}`}
                  >
                    {on && <motion.span layoutId="skill-pill" className="absolute inset-0 rounded-xl bg-canvas shadow-[0_0_0_1px_var(--color-line)]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                    <span className="relative flex items-center justify-between gap-6 whitespace-nowrap">
                      <span className="flex items-center gap-2.5">
                        <span aria-hidden className="h-2 w-2 rounded-full transition-transform" style={{ background: palette[i], transform: on ? 'scale(1.25)' : 'scale(1)' }} />
                        {s.label}
                      </span>
                      <span className="hidden font-mono text-[11px] text-faint lg:inline">{s.items.length}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${g.id}`} className="relative bg-[radial-gradient(circle_at_50%_50%,#f3f6ff,transparent_70%)] p-5 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={g.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[15px] text-muted"
                >
                  {g.blurb}
                </motion.p>
              </AnimatePresence>
              {wide ? (
                <div className="mx-auto mt-2 max-w-[720px]">
                  <Network index={active} />
                </div>
              ) : (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${g.label} skills`}>
                  {g.items.map((item, i) => (
                    <motion.li key={`${g.id}-${item}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="chip !px-3 !py-1.5 !text-[14px]">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: palette[active] }} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
