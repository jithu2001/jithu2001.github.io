import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { projects, profile, type Project } from '../data/content'
import { GitHubActivity } from './GitHubActivity'
import { ArrowRight, ArrowUpRight, Close, GitHub } from './Icons'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const accents: Record<Project['accent'], { fg: string; soft: string; mid: string }> = {
  blue: { fg: '#3d6bf5', soft: '#e6edff', mid: '#b9cbff' },
  violet: { fg: '#7c6cf0', soft: '#efecff', mid: '#cfc7ff' },
  teal: { fg: '#0e9f8e', soft: '#e2f6f2', mid: '#a9e3d9' },
  amber: { fg: '#c27c0e', soft: '#fdf2dc', mid: '#f4d79c' },
  rose: { fg: '#d9466f', soft: '#fde8ee', mid: '#f6bccb' },
  sky: { fg: '#0b8bc4', soft: '#e0f3fb', mid: '#a6daf0' },
}

// A tiny architecture diagram per project: four stages in a loop.
function FlowPreview({ flow, accent }: { flow: string[]; accent: Project['accent'] }) {
  const a = accents[accent]
  const boxes = [
    { x: 6, y: 22 },
    { x: 174, y: 22 },
    { x: 174, y: 96 },
    { x: 6, y: 96 },
  ]
  const path = 'M146 38 H174 M244 54 V96 M174 112 H146'
  const motionPath = "path('M76 38 H244 V112 H76')"
  return (
    <svg viewBox="0 0 320 150" className="h-full w-full" aria-hidden>
      <defs>
        <pattern id={`dots-${accent}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill={a.mid} opacity=".6" />
        </pattern>
      </defs>
      <rect width="320" height="150" fill={`url(#dots-${accent})`} opacity=".7" />
      <path d={path} stroke={a.fg} strokeWidth="1.5" fill="none" className="flow-dash [animation-play-state:paused] group-hover:[animation-play-state:running]" opacity=".7" />
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width="140" height="32" rx="9" fill="white" stroke={i === 0 ? a.fg : a.mid} strokeWidth={i === 0 ? 1.4 : 1} />
          <circle cx={b.x + 13} cy={b.y + 16} r="3" fill={a.fg} opacity={0.35 + i * 0.2} />
          <text x={b.x + 23} y={b.y + 20} fontFamily="Geist Mono, monospace" fontSize="10" fill="#2a3245">{flow[i]}</text>
        </g>
      ))}
      <circle
        r="4"
        fill={a.fg}
        className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 [animation:travel_2.6s_var(--ease-out-quint)_infinite]"
        style={{ offsetPath: motionPath, offsetRotate: '0deg' }}
      />
    </svg>
  )
}

function ProjectCard({ p, onOpen, index }: { p: Project; onOpen: () => void; index: number }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const a = accents[p.accent]

  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`
  }
  const reset = () => ref.current && (ref.current.style.transform = '')

  return (
    <Reveal delay={0.05 * (index % 3)} className="h-full">
      <article
        ref={ref}
        onPointerMove={tilt}
        onPointerLeave={reset}
        className="card group relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-quint)] will-change-transform hover:shadow-lift focus-within:shadow-lift"
      >
        <div className="relative h-[168px] overflow-hidden border-b border-line" style={{ background: `linear-gradient(160deg, ${a.soft}, #ffffff 85%)` }}>
          <div className="absolute inset-x-4 inset-y-2">
            <FlowPreview flow={p.flow} accent={p.accent} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-[11px] tracking-wider uppercase" style={{ color: a.fg }}>{p.category}</p>
          <h3 className="mt-1.5 text-[21px] font-semibold">{p.name}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.tagline}</p>

          <div className="mt-5 rounded-xl border border-line bg-canvas/60 p-3.5">
            <p className="font-mono text-[10.5px] tracking-wider text-faint uppercase">Interesting bit</p>
            <p className="mt-1.5 text-[14px] leading-snug font-medium text-ink-2">{p.detail.title}</p>
          </div>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {p.stack.slice(0, 5).map((s) => <li key={s} className="chip !px-2 !py-0.5 !text-[11.5px]">{s}</li>)}
            {p.stack.length > 5 && <li className="chip !px-2 !py-0.5 !text-[11.5px] text-faint">+{p.stack.length - 5}</li>}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <button type="button" onClick={onOpen} className="group/btn inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ink" aria-haspopup="dialog">
              Read the case
              <ArrowRight width={16} height={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              {/* Makes the whole card clickable without nesting interactive elements */}
              <span className="absolute inset-0" aria-hidden />
            </button>
            <div className="relative z-10 flex items-center gap-1">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink" aria-label={`${p.name} live demo`}>
                  <ArrowUpRight width={17} height={17} />
                </a>
              )}
              <a href={p.repo} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink" aria-label={`${p.name} on GitHub`}>
                <GitHub width={17} height={17} />
              </a>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [shown, setShown] = useState<Project | null>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (project) {
      setShown(project)
      if (!d.open) d.showModal()
    } else if (d.open) d.close()
  }, [project])

  const a = shown ? accents[shown.accent] : accents.blue

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="project-dialog-title"
      className="m-auto max-h-[92dvh] w-[calc(100%-24px)] max-w-[760px] overflow-hidden rounded-[28px] border border-line bg-surface p-0 text-ink shadow-[0_40px_120px_-30px_rgb(15_23_42/0.45)]"
    >
      {shown && (
        <motion.div
          key={shown.id}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-[92dvh] overflow-y-auto"
        >
          <div className="relative px-6 pt-6 pb-7 sm:px-10 sm:pt-9" style={{ background: `linear-gradient(170deg, ${a.soft}, #fff 80%)` }}>
            <button type="button" onClick={onClose} className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink-2 shadow-card hover:text-ink" aria-label="Close">
              <Close />
            </button>
            <p className="font-mono text-[12px] tracking-wide" style={{ color: a.fg }}>{shown.category}</p>
            <h3 id="project-dialog-title" className="mt-2 pr-10 text-[28px] leading-tight font-semibold sm:text-[34px]">{shown.name}</h3>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-muted">{shown.tagline}</p>
            <ol className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11.5px] text-ink-2" aria-label="Architecture">
              {shown.flow.map((f, i) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="rounded-lg border bg-white px-2.5 py-1.5" style={{ borderColor: a.mid }}>{f}</span>
                  {i < shown.flow.length - 1 && <span aria-hidden style={{ color: a.fg }}>→</span>}
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-px bg-line sm:grid-cols-2">
            {[
              ['Problem', shown.problem],
              ['Solution', shown.solution],
            ].map(([k, v]) => (
              <section key={k} className="bg-white px-6 py-6 sm:px-10">
                <h4 className="eyebrow !text-[11px]">{k}</h4>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-2">{v}</p>
              </section>
            ))}
          </div>

          <div className="space-y-6 px-6 py-7 sm:px-10">
            <section>
              <h4 className="eyebrow !text-[11px]">My contribution</h4>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-2">{shown.contribution}</p>
            </section>
            <section className="rounded-2xl border p-5" style={{ borderColor: a.mid, background: `${a.soft}88` }}>
              <h4 className="font-mono text-[11px] tracking-wider uppercase" style={{ color: a.fg }}>Technical detail · {shown.detail.title}</h4>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-2">{shown.detail.text}</p>
            </section>
            <section>
              <h4 className="eyebrow !text-[11px]">Stack</h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {shown.stack.map((s) => <li key={s} className="chip">{s}</li>)}
              </ul>
            </section>
            <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
              <a href={shown.repo} target="_blank" rel="noreferrer" className="btn btn-primary"><GitHub /> View on GitHub</a>
              {shown.demo && <a href={shown.demo} target="_blank" rel="noreferrer" className="btn btn-secondary">Live demo <ArrowUpRight /></a>}
            </div>
          </div>
        </motion.div>
      )}
    </dialog>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            id="projects-title"
            index="05"
            eyebrow="Selected projects"
            title="Things I've built because a real problem needed them."
            lede="Personal and client builds from my public GitHub. Each one starts with a constraint and has a technical decision worth talking about."
          />
          <Reveal>
            <a href={profile.github} target="_blank" rel="noreferrer" className="link-quiet shrink-0 !text-[15px]">
              All repositories <ArrowUpRight width={16} height={16} />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onOpen={() => setOpen(p)} />
          ))}
        </div>

        <GitHubActivity />
      </div>
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
