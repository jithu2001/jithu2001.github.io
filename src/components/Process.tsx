import { AnimatePresence, motion } from 'motion/react'
import { useState, type KeyboardEvent } from 'react'
import { processSteps } from '../data/content'
import { Chapter } from './ui'

// Island positions on the chart, in % of the map box.
const isles = [
  { x: 7, y: 66 },
  { x: 21, y: 30 },
  { x: 36, y: 62 },
  { x: 51, y: 27 },
  { x: 65, y: 64 },
  { x: 79, y: 31 },
  { x: 93, y: 63 },
]

// Smooth route through the islands (Catmull-Rom → cubic Bézier), in a 1000×420 viewBox.
function routePath() {
  const p = isles.map((i) => ({ x: i.x * 10, y: i.y * 4.2 }))
  let d = `M${p[0].x} ${p[0].y}`
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], e = p[i + 2] ?? c
    d += ` C${b.x + (c.x - a.x) / 6} ${b.y + (c.y - a.y) / 6}, ${c.x - (e.x - b.x) / 6} ${c.y - (e.y - b.y) / 6}, ${c.x} ${c.y}`
  }
  return d
}
const ROUTE = routePath()

// Each island gets its own hand-drawn outline.
const shapes = [
  'M8 30c2-12 14-20 28-18 10-8 26-4 30 6 12 2 18 14 10 22-4 10-20 12-30 8-12 6-30 4-34-6-6-2-6-8-4-12z',
  'M6 26c0-12 16-18 26-14 8-10 28-8 32 4 10 4 12 18 2 22-6 8-22 8-30 4-14 4-30-2-30-16z',
  'M10 24c4-10 18-14 28-10 12-6 28 0 30 12 8 6 4 18-8 20-10 6-26 4-34 0-12 2-20-12-16-22z',
  'M8 28c-2-12 12-20 24-16 10-8 30-6 34 6 10 6 8 20-4 22-8 8-24 6-32 2-14 2-22-6-22-14z',
  'M8 24c4-12 20-16 30-10 12-4 26 2 28 14 6 8 0 18-12 18-10 6-28 4-34-2-10-2-14-12-12-20z',
  'M6 30c0-12 14-20 26-16 10-8 28-6 32 6 12 4 10 18 0 22-8 6-22 6-30 2-14 4-28-2-28-14z',
  'M10 26c2-12 16-16 28-12 10-8 28-2 30 10 8 6 4 18-6 20-10 8-28 6-34 0-12 0-20-8-18-18z',
]

export function Process() {
  const [i, setI] = useState(0)
  const step = processSteps[i]
  const n = processSteps.length

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = i
    if (e.key in map) next = (i + map[e.key] + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    else return
    e.preventDefault()
    setI(next)
    document.getElementById(`isle-${processSteps[next].id}`)?.focus()
  }

  return (
    <section id="route" aria-labelledby="route-title" className="section border-y-[2.5px] border-ink bg-paper-2">
      <div className="page">
        <Chapter
          id="route-title"
          no="03"
          name="The route"
          jp="第三話 · 航路"
          title="From a user's problem to a product they keep."
          lede="Every product sails past the same seven islands. I've worked every one of them. Pick an island to see what I do there, and where I've done it."
        />

        {/* Sea chart */}
        <div className="-mx-[18px] mt-14 overflow-x-auto px-[18px] pt-2 pb-3 md:mx-0 md:overflow-visible md:px-0">
          <div className="panel relative aspect-[1000/420] min-w-[760px] overflow-hidden !bg-[#e9dfc8]">
            <svg aria-hidden viewBox="0 0 1000 420" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <pattern id="waves" width="96" height="48" patternUnits="userSpaceOnUse">
                  <path d="M4 20c6-6 12-6 18 0s12 6 18 0" fill="none" stroke="#1d4f86" strokeWidth="1.3" opacity=".17" />
                </pattern>
                <pattern id="grid" width="100" height="70" patternUnits="userSpaceOnUse">
                  <path d="M100 0V70M0 70H100" fill="none" stroke="#1d4f86" strokeWidth=".8" opacity=".16" />
                </pattern>
              </defs>
              <rect width="1000" height="420" fill="url(#grid)" />
              <rect width="1000" height="420" fill="url(#waves)" />
              <path d={ROUTE} fill="none" stroke="var(--color-ink)" strokeWidth="2.4" className="route-dash" vectorEffect="non-scaling-stroke" />
              <motion.path
                d={ROUTE}
                fill="none"
                stroke="var(--color-red)"
                strokeWidth="3.4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{ pathLength: Math.max(i / (n - 1), 0.001) }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            <svg aria-hidden viewBox="0 0 100 100" className="absolute top-4 right-4 h-[18%] w-auto opacity-80">
              <circle cx="50" cy="50" r="34" fill="none" stroke="#16130f" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="26" fill="none" stroke="#16130f" strokeWidth=".8" strokeDasharray="2 3" />
              <path d="M50 12 L56 50 L50 88 L44 50Z" fill="#16130f" />
              <path d="M12 50 L50 45 L88 50 L50 55Z" fill="#c8211b" />
              <text x="50" y="9" textAnchor="middle" fontFamily="Anton" fontSize="10" fill="#16130f">N</text>
            </svg>
            <p className="label absolute bottom-3 left-4 text-sea/80" aria-hidden>Chart of the product loop · not to scale</p>

            <div role="tablist" aria-label="Stages of the product loop" onKeyDown={onKey}>
              {processSteps.map((s, idx) => {
                const on = idx === i
                const p = isles[idx]
                return (
                  <button
                    key={s.id}
                    id={`isle-${s.id}`}
                    role="tab"
                    aria-selected={on}
                    aria-controls="route-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setI(idx)}
                    className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <svg viewBox="0 -18 80 68" className="h-[60px] w-[72px] transition-transform duration-300 group-hover:-translate-y-1" aria-hidden>
                      <path d={shapes[idx]} fill="none" stroke="var(--color-sea)" strokeWidth="1.2" opacity=".5" transform="translate(40 25) scale(1.18) translate(-40 -25)" />
                      <path d={shapes[idx]} fill={on ? 'var(--color-red)' : '#e3cf9f'} stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
                      <path d={shapes[idx]} fill={on ? '#8f1510' : idx < i ? '#6f7d4f' : '#97a571'} stroke="var(--color-ink)" strokeWidth="1.6" transform="translate(40 24) scale(.55) translate(-40 -25)" />
                      {idx % 2 === 0 && (
                        <g stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" fill="none">
                          <path d="M42 22c0-10 2-18 6-26" />
                          <path d="M48-4c-6-4-13-3-17 2M48-4c5-5 12-5 16-1M48-4c-2 6-7 9-12 10M48-4c5 3 8 8 8 13" />
                        </g>
                      )}
                    </svg>
                    <span className={`mt-1 flex items-center gap-1.5 border-2 border-ink px-2 py-0.5 text-[13px] font-semibold whitespace-nowrap transition-colors ${on ? 'bg-ink text-sheet' : 'bg-sheet text-ink group-hover:bg-paper'}`}>
                      <span className={`font-mono text-[11px] ${on ? 'text-paper-3' : 'text-red'}`}>{String(idx + 1).padStart(2, '0')}</span>
                      {s.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <motion.div
              aria-hidden
              className="pointer-events-none absolute z-10 -translate-x-1/2"
              initial={false}
              animate={{ left: `${isles[i].x}%`, top: `${isles[i].y - 30}%` }}
              transition={{ type: 'spring', stiffness: 60, damping: 14 }}
            >
              <div className="bob"><Ship /></div>
            </motion.div>
          </div>
        </div>
        <p className="label mt-1 text-muted md:hidden" aria-hidden>Swipe the chart →</p>

        {/* Navigator's note */}
        <div id="route-panel" role="tabpanel" aria-labelledby={`isle-${step.id}`} className="mt-8">
          <div className="panel panel-shadow grid md:grid-cols-[220px_1fr]">
            <div className="flex items-center justify-between border-b-[2.5px] border-ink bg-ink p-5 text-sheet md:flex-col md:items-start md:border-r-[2.5px] md:border-b-0 md:p-7">
              <div>
                <p className="label text-paper-3">Island</p>
                <p className="display text-[72px] text-red md:text-[104px]">{String(i + 1).padStart(2, '0')}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setI((i - 1 + n) % n)} className="grid h-11 w-11 place-items-center border-2 border-sheet text-[18px] hover:bg-sheet hover:text-ink" aria-label="Previous island">←</button>
                <button type="button" onClick={() => setI((i + 1) % n)} className="grid h-11 w-11 place-items-center border-2 border-sheet text-[18px] hover:bg-sheet hover:text-ink" aria-label="Next island">→</button>
              </div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-8 p-6 sm:p-9 lg:grid-cols-2 lg:gap-12"
              >
                <div>
                  <p className="label text-red">{step.label}</p>
                  <h3 className="display mt-3 text-[38px] sm:text-[46px]">{step.title}</h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{step.what}</p>
                </div>
                <div className="border-l-[3px] border-red pl-6">
                  <p className="label text-muted">From the logbook</p>
                  <p className="mt-3 text-[20px] leading-[1.5] italic" style={{ fontFamily: 'Georgia, serif' }}>“{step.example}”</p>
                  {i === n - 1 && <p className="label mt-5 text-sea">↺ and the voyage starts again</p>}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Ship() {
  return (
    <svg viewBox="0 0 64 56" width="58" height="50">
      <path d="M31 4v34" stroke="#16130f" strokeWidth="2.5" />
      <path d="M33 6c12 4 16 14 16 24H33z" fill="#f8f2e5" stroke="#16130f" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M29 10c-9 4-13 12-13 20h13z" fill="#f8f2e5" stroke="#16130f" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="41" cy="19" r="3.5" fill="#16130f" />
      <path d="M31 4l10 3-10 3" fill="#c8211b" stroke="#16130f" strokeWidth="1.5" />
      <path d="M6 38h52l-7 12H13z" fill="#c8211b" stroke="#16130f" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M2 53c5-3 9-3 14 0s9 3 14 0 9-3 14 0 9 3 14 0" fill="none" stroke="#1d4f86" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
