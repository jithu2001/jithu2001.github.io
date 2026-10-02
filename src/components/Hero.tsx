import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { clients, heroStats, profile } from '../data/content'
import { useDeviceTier } from '../hooks/useDeviceTier'
import type { LoopNode } from './HeroScene'
import { ArrowRight, Download, GitHub, LinkedIn } from './Icons'

const HeroScene = lazy(() => import('./HeroScene'))

// Hero loop stages, each linked to a step in the Process section.
const loop: (LoopNode & { step: string })[] = [
  { id: 'problem', label: 'Problem', color: '#3d6bf5', step: 'problem' },
  { id: 'product', label: 'Product', color: '#7c6cf0', step: 'decision' },
  { id: 'build', label: 'Build', color: '#0e9f8e', step: 'engineering' },
  { id: 'deploy', label: 'Deploy', color: '#0b8bc4', step: 'deployment' },
]

export function selectProcessStep(step: string) {
  window.dispatchEvent(new CustomEvent('process:select', { detail: step }))
  document.getElementById('process')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const tier = useDeviceTier()
  const reduced = useReducedMotion() ?? false
  const [active, setActive] = useState<number | null>(null)
  const [running, setRunning] = useState(true)
  const labelRefs = useRef<(HTMLElement | null)[]>([])
  const stageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  // Stop rendering the canvas while the hero is off-screen.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Load the 3D chunk once the browser is idle, so text paints first.
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    if (w.requestIdleCallback) w.requestIdleCallback(() => setIdle(true), { timeout: 1200 })
    else setTimeout(() => setIdle(true), 400)
  }, [])

  const show3D = idle && (tier === 'full' || tier === 'lite')

  return (
    <section ref={sectionRef} id="home" aria-labelledby="hero-title" className="noise relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[720px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#e4ebff,transparent)] opacity-90" />
        <div className="absolute top-40 -right-40 h-[520px] w-[620px] rounded-full bg-[radial-gradient(closest-side,#efeaff,transparent)]" />
        <div className="absolute top-[30%] -left-48 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,#e1f5f1,transparent)] opacity-70" />
        <div className="grid-bg absolute inset-0" />
      </div>

      <div className="container-x grid items-center gap-6 lg:grid-cols-[1.08fr_1fr] lg:gap-4">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="chip glass !py-1.5 !pl-2.5"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to FDE, backend, product & freelance work
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="mt-6 text-[40px] leading-[1.03] font-semibold sm:text-[56px] lg:text-[64px] xl:text-[70px]"
          >
            <span className="sr-only">Jithu J George. </span>
            I build software, ship it, and make sure people{' '}
            <span className="font-serif font-normal tracking-normal italic text-gradient pr-1">actually use it.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease }}
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg"
          >
            I'm <strong className="font-medium text-ink">Jithu J George</strong>, a software engineer with 3+ years taking Go backends and
            computer-vision systems from prototype to production, often on-site at enterprise manufacturers. I work across{' '}
            <span className="text-ink-2">engineering · product · AI · deployment</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#projects" className="btn btn-primary group">
              View my work
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="btn btn-secondary">Let's work together</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.36 }}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a className="link-quiet" href={profile.github} target="_blank" rel="noreferrer"><GitHub /> GitHub</a>
            <a className="link-quiet" href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn</a>
            <a className="link-quiet" href={profile.resume} download><Download /> Resume</a>
          </motion.div>
        </div>

        {/* 3D stage */}
        <motion.div
          ref={stageRef}
          style={{ opacity: reduced ? 1 : sceneOpacity }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease }}
          className="relative -mx-5 h-[340px] sm:h-[420px] lg:mx-0 lg:-mr-16 lg:h-[560px]"
        >
          {show3D ? (
            <Suspense fallback={<StaticLoop />}>
              <HeroScene
                nodes={loop}
                tier={tier}
                reducedMotion={reduced}
                active={active}
                onHover={setActive}
                onSelect={(i) => selectProcessStep(loop[i].step)}
                labelRefs={labelRefs}
                running={running}
              />
              <div className="pointer-events-none absolute inset-0 overflow-hidden" role="group" aria-label="My working loop">
                {loop.map((n, i) => (
                  <button
                    key={n.id}
                    ref={(el) => { labelRefs.current[i] = el }}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    onClick={() => selectProcessStep(n.step)}
                    className={`glass pointer-events-auto absolute top-0 left-0 rounded-full px-3 py-1.5 font-mono text-[11.5px] tracking-wide text-ink-2 transition-[box-shadow,color] duration-300 will-change-transform ${active === i ? '!text-ink shadow-lift' : ''}`}
                    style={{ transform: 'translate3d(-999px,-999px,0)' }}
                    aria-label={`${n.label}: see how I approach this stage`}
                  >
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: n.color }} aria-hidden />
                    {n.label}
                  </button>
                ))}
              </div>
            </Suspense>
          ) : tier === 'none' ? (
            <StaticLoop />
          ) : (
            <div className="h-full w-full opacity-40"><StaticLoop /></div>
          )}
          <p className="pointer-events-none absolute right-6 bottom-2 hidden font-mono text-[11px] text-faint lg:block" aria-hidden>
            hover the loop · click a stage
          </p>
        </motion.div>
      </div>

      {/* Proof strip */}
      <div className="container-x relative z-10 mt-6 lg:mt-2">
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="bg-white/40 px-5 py-5 sm:px-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[26px] font-semibold tracking-tight sm:text-[30px]">{s.value}</dd>
              <dd className="mt-0.5 text-[13.5px] leading-snug text-muted">{s.label}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6"
        >
          <p className="eyebrow shrink-0">Deployed on-site at</p>
          <div className="marquee relative w-full overflow-hidden">
            <ul className="marquee-track flex w-max gap-10 pr-10" aria-label="Enterprise client sites">
              {[...clients, ...clients].map((c, i) => (
                <li key={i} aria-hidden={i >= clients.length} className="text-[17px] font-medium tracking-tight whitespace-nowrap text-ink-2/55">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Shown when WebGL is unavailable, data-saver is on, or while the 3D chunk loads.
function StaticLoop() {
  const pts = [
    { x: 300, y: 70, c: '#3d6bf5', l: 'Problem' },
    { x: 520, y: 210, c: '#7c6cf0', l: 'Product' },
    { x: 300, y: 350, c: '#0e9f8e', l: 'Build' },
    { x: 80, y: 210, c: '#0b8bc4', l: 'Deploy' },
  ]
  return (
    <svg viewBox="0 0 600 420" className="h-full w-full" role="img" aria-label="A loop from problem to product to build to deploy">
      <ellipse cx="300" cy="210" rx="220" ry="140" fill="none" stroke="#9fb2e6" strokeWidth="1.5" className="flow-dash" />
      {pts.map((p) => (
        <g key={p.l}>
          <circle cx={p.x} cy={p.y} r="26" fill={p.c} opacity=".12" />
          <circle cx={p.x} cy={p.y} r="11" fill={p.c} />
          <text x={p.x} y={p.y - 36} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="13" fill="#2a3245">{p.l}</text>
        </g>
      ))}
    </svg>
  )
}
