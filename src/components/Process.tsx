import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { processSteps } from '../data/content'
import { SectionHeader } from './SectionHeader'
import { Reveal } from './Reveal'

const hues = ['#3d6bf5', '#5a63f2', '#7c6cf0', '#8f6fe0', '#0e9f8e', '#0b8bc4', '#2f7ff0']

export function Process() {
  const [i, setI] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const step = processSteps[i]

  // The hero's 3D loop can deep-link into a step.
  useEffect(() => {
    const on = (e: Event) => {
      const idx = processSteps.findIndex((s) => s.id === (e as CustomEvent<string>).detail)
      if (idx >= 0) setI(idx)
    }
    window.addEventListener('process:select', on)
    return () => window.removeEventListener('process:select', on)
  }, [])

  // On mobile the stage list scrolls sideways; keep the selected stage in view
  // without touching the page's vertical scroll.
  const list = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = list.current
    const tab = tabs.current[i]
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return
    el.scrollTo({ left: tab.offsetLeft - el.clientWidth / 2 + tab.offsetWidth / 2, behavior: 'smooth' })
  }, [i])

  const onKey = (e: KeyboardEvent) => {
    const n = processSteps.length
    let next = i
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    else return
    e.preventDefault()
    setI(next)
    tabs.current[next]?.focus()
  }

  const progress = i / (processSteps.length - 1)

  return (
    <section id="process" aria-labelledby="process-title" className="section overflow-hidden bg-gradient-to-b from-transparent via-white/70 to-transparent">
      <div className="container-x">
        <SectionHeader
          id="process-title"
          index="03"
          eyebrow="How I work"
          title={<>From a user's problem to a product they <span className="font-serif font-normal italic">keep</span> using.</>}
          lede="I can work at every stage of this loop. Pick a stage to see what I do there, and where I've done it."
        />

        <Reveal delay={0.1} className="mt-14">
          <div className="relative">
            {/* Track */}
            <div aria-hidden className="absolute top-[27px] right-[7%] left-[7%] hidden h-[2px] rounded-full bg-line-strong md:block">
              <motion.div
                className="h-full origin-left rounded-full"
                style={{ background: 'linear-gradient(90deg,#3d6bf5,#7c6cf0,#0e9f8e,#2f7ff0)' }}
                animate={{ scaleX: progress }}
                transition={{ type: 'spring', stiffness: 120, damping: 22 }}
              />
            </div>

            <div
              ref={list}
              role="tablist"
              aria-label="Stages of the product loop"
              onKeyDown={onKey}
              className="relative -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-7 md:gap-0 md:overflow-visible md:px-0"
            >
              {processSteps.map((s, idx) => {
                const on = idx === i
                const done = idx < i
                return (
                  <button
                    key={s.id}
                    ref={(el) => { tabs.current[idx] = el }}
                    role="tab"
                    id={`tab-${s.id}`}
                    aria-selected={on}
                    aria-controls="process-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setI(idx)}
                    onMouseEnter={() => matchMedia('(hover: hover)').matches && setI(idx)}
                    className="group flex shrink-0 snap-center flex-col items-center gap-3 rounded-2xl px-3 py-1 text-center md:px-1"
                  >
                    <span className="relative grid h-14 w-14 place-items-center">
                      {on && (
                        <motion.span
                          layoutId="process-ring"
                          className="absolute inset-0 rounded-full"
                          style={{ boxShadow: `0 0 0 6px ${hues[idx]}1f, 0 10px 30px -8px ${hues[idx]}88` }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span
                        className="relative grid h-11 w-11 place-items-center rounded-full border font-mono text-[13px] transition-all duration-300"
                        style={{
                          background: on ? hues[idx] : done ? 'white' : 'rgb(255 255 255 / 0.85)',
                          color: on ? 'white' : done ? hues[idx] : 'var(--color-muted)',
                          borderColor: on ? hues[idx] : done ? `${hues[idx]}55` : 'var(--color-line-strong)',
                        }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </span>
                    <span className={`text-[13.5px] leading-tight whitespace-nowrap transition-colors md:whitespace-normal ${on ? 'font-medium text-ink' : 'text-muted group-hover:text-ink-2'}`}>
                      {s.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detail */}
          <div id="process-panel" role="tabpanel" aria-labelledby={`tab-${step.id}`} className="mt-8 md:mt-10">
            <div className="card relative overflow-hidden p-6 sm:p-10">
              <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-60 blur-3xl transition-colors duration-700" style={{ background: `${hues[i]}22` }} />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-14"
                >
                  <div>
                    <p className="eyebrow" style={{ color: hues[i] }}>Stage {i + 1} · {step.label}</p>
                    <h3 className="mt-3 text-[26px] leading-tight font-semibold sm:text-[32px]">{step.title}</h3>
                    <p className="mt-4 text-[17px] leading-relaxed text-muted">{step.what}</p>
                  </div>
                  <div className="rounded-2xl border border-line bg-canvas/70 p-5 sm:p-6">
                    <p className="eyebrow !text-[11px]">Where I've done it</p>
                    <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{step.example}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="relative mt-8 flex items-center justify-between border-t border-line pt-5">
                <button type="button" onClick={() => setI((i - 1 + processSteps.length) % processSteps.length)} className="link-quiet" aria-label="Previous stage">
                  ← Prev
                </button>
                <p className="font-mono text-[12px] text-faint" aria-hidden>
                  {i === processSteps.length - 1 ? '↺ and back to the problem' : `${i + 1} / ${processSteps.length}`}
                </p>
                <button type="button" onClick={() => setI((i + 1) % processSteps.length)} className="link-quiet" aria-label="Next stage">
                  Next →
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
