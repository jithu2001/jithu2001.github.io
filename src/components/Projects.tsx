import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { profile, projects, type Project } from '../data/content'
import { GitHubActivity } from './GitHubActivity'
import { ArrowRight, ArrowUpRight, Close, GitHub } from './Icons'
import { Chapter, Reveal } from './ui'

// Grid spans on large screens: a manga page, not a uniform card grid.
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-12']

function Flow({ flow, wide }: { flow: string[]; wide?: boolean }) {
  return (
    <ol className={`relative grid gap-x-6 gap-y-4 ${wide ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'}`} aria-label="Architecture">
      {flow.map((f, i) => (
        <li key={f} className={`relative ${!wide && i % 2 ? 'mt-5' : ''}`}>
          <span className="block border-2 border-ink bg-sheet px-3 py-2 font-mono text-[12px] leading-tight shadow-[3px_3px_0_var(--color-ink)]">
            <span className="text-red">{i + 1}.</span> {f}
          </span>
        </li>
      ))}
    </ol>
  )
}

function Panel({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  const wide = i === 5
  return (
    <Reveal delay={0.05 * (i % 3)} className={`${spans[i]} ${wide ? 'md:col-span-2' : 'md:col-span-1'}`}>
      <article className={`panel group relative flex h-full flex-col overflow-hidden transition-transform duration-300 ease-[var(--ease-out-quint)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0_var(--color-ink)] ${wide ? 'lg:flex-row' : ''}`}>
        <div className={`relative overflow-hidden border-b-[2.5px] border-ink bg-paper-2 p-5 sm:p-6 ${wide ? 'lg:w-[44%] lg:border-r-[2.5px] lg:border-b-0' : ''}`}>
          <div aria-hidden className={`absolute inset-0 opacity-[0.18] ${i % 2 ? 'halftone fade-tl' : 'halftone fade-br'}`} />
          <div className="relative flex items-center justify-between">
            <p className="label">Treasure No.{String(i + 1).padStart(2, '0')}</p>
            <p className="label text-red">{p.category}</p>
          </div>
          <div className="relative mt-6 mb-2">
            <Flow flow={p.flow} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="display text-[36px] sm:text-[42px]">{p.name}</h3>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{p.tagline}</p>
          <p className="mt-5 border-l-[3px] border-red pl-3 text-[15px] font-semibold">{p.detail.title}</p>
          <p className="mt-5 font-mono text-[12px] tracking-wide text-muted">{p.stack.join(' / ')}</p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <button type="button" onClick={onOpen} aria-haspopup="dialog" className="flex items-center gap-2 font-display text-[18px] tracking-[0.04em] uppercase">
              <span className="ink-link">Open the case</span>
              <ArrowRight width={17} height={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0" aria-hidden />
            </button>
            <div className="relative z-10 flex gap-2">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" aria-label={`${p.name} live demo`} className="grid h-10 w-10 place-items-center border-2 border-ink bg-sheet hover:bg-red hover:text-sheet">
                  <ArrowUpRight width={17} height={17} />
                </a>
              )}
              <a href={p.repo} target="_blank" rel="noreferrer" aria-label={`${p.name} on GitHub`} className="grid h-10 w-10 place-items-center border-2 border-ink bg-sheet hover:bg-ink hover:text-sheet">
                <GitHub width={17} height={17} />
              </a>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function CaseFile({ project, onClose }: { project: Project | null; onClose: () => void }) {
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

  const idx = shown ? projects.indexOf(shown) : 0

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="case-title"
      className="m-auto max-h-[92dvh] w-[calc(100%-20px)] max-w-[820px] overflow-hidden border-[3px] border-ink bg-sheet p-0 text-ink shadow-[12px_12px_0_var(--color-ink)]"
    >
      {shown && (
        <motion.div key={shown.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="max-h-[92dvh] overflow-y-auto">
          <header className="relative overflow-hidden border-b-[3px] border-ink bg-red px-6 pt-6 pb-7 text-sheet sm:px-10 sm:pt-8">
            <div aria-hidden className="halftone absolute inset-0 opacity-20 fade-r" />
            <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center border-2 border-ink bg-sheet text-ink hover:bg-ink hover:text-sheet">
              <Close />
            </button>
            <p className="label relative">Case file · Treasure No.{String(idx + 1).padStart(2, '0')} · {shown.category}</p>
            <h3 id="case-title" className="display relative mt-3 pr-12 text-[48px] sm:text-[64px]">{shown.name}</h3>
            <p className="relative mt-3 max-w-xl text-[17px] leading-relaxed">{shown.tagline}</p>
          </header>

          <div className="border-b-[3px] border-ink bg-paper-2 px-6 py-6 sm:px-10">
            <Flow flow={shown.flow} wide />
          </div>

          <div className="grid md:grid-cols-2">
            {[['The problem', shown.problem], ['The solution', shown.solution]].map(([k, v], i) => (
              <section key={k} className={`p-6 sm:p-8 ${i ? 'border-t-[3px] border-ink md:border-t-0 md:border-l-[3px]' : ''}`}>
                <h4 className="label text-red">{k}</h4>
                <p className="mt-3 text-[16px] leading-relaxed">{v}</p>
              </section>
            ))}
          </div>

          <div className="space-y-7 border-t-[3px] border-ink p-6 sm:p-8">
            <section>
              <h4 className="label text-red">What I did</h4>
              <p className="mt-3 text-[16px] leading-relaxed">{shown.contribution}</p>
            </section>
            <section className="relative border-[2.5px] border-ink bg-paper p-5 shadow-[5px_5px_0_var(--color-ink)]">
              <h4 className="display text-[26px]">{shown.detail.title}</h4>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{shown.detail.text}</p>
            </section>
            <p className="font-mono text-[13px] tracking-wide text-muted"><span className="text-ink">Stack:</span> {shown.stack.join(' / ')}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href={shown.repo} target="_blank" rel="noreferrer" className="btn btn-paper"><GitHub /> View on GitHub</a>
              {shown.demo && <a href={shown.demo} target="_blank" rel="noreferrer" className="btn btn-red">Live demo <ArrowUpRight /></a>}
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
      <div className="page">
        <Chapter
          id="projects-title"
          no="05"
          name="The treasure"
          jp="第五話 · 宝物"
          title="Things I built because a real problem needed them."
          lede={<>Six builds from my public GitHub, each with one decision worth talking about. <a href={profile.github} target="_blank" rel="noreferrer" className="ink-link font-semibold">See every repo ↗</a></>}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {projects.map((p, i) => <Panel key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />)}
        </div>

        <GitHubActivity />
      </div>
      <CaseFile project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
