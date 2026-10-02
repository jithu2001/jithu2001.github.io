import { motion, useReducedMotion } from 'motion/react'
import { useRef, useState, type PointerEvent } from 'react'
import { clients, heroStats, profile } from '../data/content'
import { ArrowRight, Download, GitHub, LinkedIn } from './Icons'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduced = useReducedMotion()
  const poster = useRef<HTMLDivElement>(null)
  const [tilting, setTilting] = useState(false)

  // Real 3D: the poster tilts toward the cursor and its layers sit at different depths.
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !poster.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    poster.current.style.transform = `rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg)`
    if (!tilting) setTilting(true)
  }
  const onLeave = () => {
    if (poster.current) poster.current.style.transform = ''
    setTilting(false)
  }

  return (
    <section id="home" aria-labelledby="hero-title" onPointerMove={onMove} onPointerLeave={onLeave} className="relative overflow-hidden pt-[100px] lg:pt-[120px]">
      <div className="page grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        {/* Copy */}
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="label text-ink">Vol. 01 · The end-to-end engineer</span>
            <span className="label flex items-center gap-2 text-muted">
              <span className="h-2 w-2 rounded-full bg-red" aria-hidden /> Open to FDE, backend, product & freelance
            </span>
          </motion.div>

          <h1 id="hero-title" className="display mt-7 text-[54px] sm:text-[80px] lg:text-[70px] xl:text-[84px]">
            <span className="sr-only">Jithu J George: </span>
            {['I build software,', 'ship it, and make', 'sure people'].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.04em]">
                <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease }}>{l}</motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-red" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.34, ease }}>
                actually use it.
              </motion.span>
            </span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }} className="mt-8 grid max-w-xl gap-8 sm:grid-cols-[3px_1fr] sm:gap-5">
            <span aria-hidden className="hidden bg-ink sm:block" />
            <p className="text-[18px] leading-[1.6] text-ink-2">
              I'm <strong className="font-semibold text-ink">Jithu J George</strong>, a software engineer with 3+ years taking Go backends and
              computer-vision systems from prototype to production, often on-site at enterprise manufacturers. Engineering, product,
              AI and deployment: I've worked the whole voyage.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#projects" className="btn btn-red group">
              View my work <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="btn btn-paper">Let's work together</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.75 }} className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[15px] font-medium">
            <a className="ink-link flex items-center gap-2" href={profile.github} target="_blank" rel="noreferrer"><GitHub /> GitHub</a>
            <a className="ink-link flex items-center gap-2" href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn</a>
            <a className="ink-link flex items-center gap-2" href={profile.resume} download><Download /> Resume</a>
          </motion.div>
        </div>

        {/* Poster */}
        <motion.div
          initial={{ opacity: 0, y: -40, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[400px] lg:max-w-[440px]"
          style={{ perspective: 1100 }}
        >
          <div aria-hidden className="speedlines absolute -inset-[28%] opacity-[0.07]" />
          <p aria-hidden className="jp absolute top-[50%] -left-8 z-20 -rotate-12 text-[76px] leading-none text-red [-webkit-text-stroke:3px_var(--color-ink)] sm:-left-24 sm:text-[96px]">
            ドン
          </p>
          <div className={reduced || tilting ? '' : 'sway'}>
            <div ref={poster} className="relative transition-transform duration-300 ease-out [transform-style:preserve-3d]">
              <WantedPoster />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Caption boxes */}
      <div className="page relative z-10 mt-16 lg:mt-20">
        <dl className="grid grid-cols-2 border-[2.5px] border-ink bg-sheet lg:grid-cols-4">
          {heroStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.07 }}
              className={`px-5 py-5 sm:px-7 sm:py-6 ${i % 2 ? 'border-l-[2.5px] border-ink' : ''} ${i > 1 ? 'border-t-[2.5px] border-ink lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l-[2.5px]' : ''}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-[44px] sm:text-[56px]">{s.value}</dd>
              <dd className="mt-1 text-[14.5px] leading-snug text-ink-2">{s.label}</dd>
            </motion.div>
          ))}
        </dl>
      </div>

      {/* Ink band */}
      <div className="relative mt-16 border-y-[2.5px] border-ink bg-ink py-4 text-sheet lg:mt-20">
        <div className="page flex items-center gap-6">
          <p className="label shrink-0 text-paper-3">Deployed on-site at</p>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <ul className="marquee-track flex w-max" aria-label="Enterprise client sites">
              {[...clients, ...clients].map((c, i) => (
                <li key={i} aria-hidden={i >= clients.length} className="display flex items-center text-[26px] whitespace-nowrap">
                  {c}
                  <span className="mx-7 text-red" aria-hidden>✕</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function WantedPoster() {
  const [photo, setPhoto] = useState(true)
  return (
    <figure
      className="relative border-[2.5px] border-ink bg-[#ead7ad] p-5 [transform-style:preserve-3d] shadow-[10px_12px_0_var(--color-ink)] sm:p-7"
      style={{ backgroundImage: 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgb(120 70 20 / .28) 100%)' }}
      aria-label="Wanted poster: Jithu J George, bounty open to offers"
    >
      {/* nail */}
      <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-[2.5px] border-ink bg-[#8a8279] shadow-[inset_-3px_-3px_0_rgb(0_0_0/.3)] [transform:translateZ(40px)]" />

      <p className="text-center font-poster text-[58px] leading-none tracking-[0.06em] text-ink sm:text-[72px]" style={{ transform: 'translateZ(30px)' }}>WANTED</p>

      <div className="relative mt-4 aspect-[5/4] overflow-hidden border-[3px] border-ink bg-[#f3e5c4]" style={{ transform: 'translateZ(18px)' }}>
        {photo ? (
          <img src="/portrait.jpg" alt="Jithu J George drawn in a pirate-anime style" width={800} height={640} decoding="async" className="h-full w-full object-cover [filter:sepia(.22)_saturate(.92)_contrast(1.04)]" onError={() => setPhoto(false)} />
        ) : (
          <Portrait />
        )}
      </div>

      <div className="mt-4 flex items-center gap-3" style={{ transform: 'translateZ(24px)' }}>
        <span className="h-[2px] flex-1 bg-ink" />
        <span className="font-poster text-[18px] tracking-[0.18em]">HIRE OR COLLAB</span>
        <span className="h-[2px] flex-1 bg-ink" />
      </div>
      <p className="mt-2 text-center font-poster text-[34px] leading-tight tracking-[0.03em] sm:text-[40px]" style={{ transform: 'translateZ(30px)' }}>
        JITHU J. GEORGE
      </p>
      <div className="mt-2 flex items-baseline justify-center gap-3" style={{ transform: 'translateZ(30px)' }}>
        <span className="font-mono text-[12px] tracking-[0.2em] text-ink-2">BOUNTY</span>
        <span className="font-poster text-[26px] tracking-[0.04em] sm:text-[30px]">OPEN TO OFFERS</span>
      </div>
      <p className="mx-auto mt-3 max-w-[300px] text-center font-mono text-[11px] leading-relaxed tracking-wide text-ink-2 uppercase">
        Last seen deploying at Coca-Cola, ITC, Unilever, Hyundai & others · Kerala, India
      </p>

      <span className="stamp absolute top-[40%] right-3 bg-[#ead7ad] text-[14px] text-red sm:right-4" style={{ transform: 'translateZ(55px) rotate(-12deg)' }}>
        Backend · FDE<br />Product · AI
      </span>
    </figure>
  )
}

// Original ink portrait used until a real photo is added at /public/portrait.jpg.
function Portrait() {
  return (
    <svg viewBox="0 0 250 200" className="h-full w-full" role="img" aria-label="Ink illustration of Jithu">
      <defs>
        <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" fill="#16130f" opacity=".55" />
        </pattern>
        <linearGradient id="fadeDots" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".7" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="dotMask"><rect width="250" height="200" fill="url(#fadeDots)" /></mask>
      </defs>
      <rect width="250" height="200" fill="url(#dots)" mask="url(#dotMask)" />
      <circle cx="170" cy="70" r="46" fill="#c8211b" opacity=".9" />
      {/* shoulders */}
      <path d="M38 200c6-40 40-58 87-58s81 18 87 58z" fill="#16130f" />
      <path d="M108 140h34v14c-5 6-29 6-34 0z" fill="#16130f" />
      {/* head */}
      <path d="M125 40c-26 0-41 18-41 44 0 30 18 56 41 56s41-26 41-56c0-26-15-44-41-44z" fill="#f3e5c4" stroke="#16130f" strokeWidth="4" />
      {/* hair */}
      <path d="M82 82c-4-30 14-50 44-50 24 0 44 14 43 46-8-12-18-20-34-22 4 6 4 10 2 14-12-12-30-14-46-6-4 4-7 10-9 18z" fill="#16130f" />
      {/* glasses */}
      <g fill="none" stroke="#16130f" strokeWidth="4">
        <rect x="94" y="84" width="27" height="20" rx="5" />
        <rect x="129" y="84" width="27" height="20" rx="5" />
        <path d="M121 92h8M94 90l-8-3M156 90l8-3" />
      </g>
      <path d="M118 120c5 4 10 4 15 0" fill="none" stroke="#16130f" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M125 104v8h4" fill="none" stroke="#16130f" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
