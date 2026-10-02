import type { PointerEvent } from 'react'
import { capabilities } from '../data/content'
import { Check } from './Icons'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const tone: Record<string, { fg: string; soft: string }> = {
  backend: { fg: 'var(--color-blue)', soft: 'var(--color-blue-soft)' },
  fde: { fg: 'var(--color-sky)', soft: 'var(--color-sky-soft)' },
  product: { fg: 'var(--color-violet)', soft: 'var(--color-violet-soft)' },
  ai: { fg: 'var(--color-teal)', soft: 'var(--color-teal-soft)' },
}

// Cursor-following spotlight, written straight to CSS variables (no re-render).
function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="cap-title" className="section !pt-0">
      <div className="container-x">
        <SectionHeader
          id="cap-title"
          index="02"
          eyebrow="What I do"
          title="Four hats, one job: get the right thing working."
          lede="Most products don't fail on one hard problem. They fail in the gaps between engineering, deployment and product. I work in those gaps."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:gap-5">
          {capabilities.map((c, i) => (
            <Reveal key={c.id} delay={0.06 * i}>
              <article
                onPointerMove={spotlight}
                className="card group relative h-full overflow-hidden p-6 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:shadow-lift sm:p-8"
                style={{ ['--tone' as string]: tone[c.id].fg }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), ${tone[c.id].soft}, transparent 65%)` }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-2.5 py-1 font-mono text-[11.5px] tracking-wider uppercase" style={{ color: tone[c.id].fg, background: tone[c.id].soft }}>
                      {c.kicker}
                    </span>
                    <span className="font-mono text-[12px] text-faint">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-[24px] font-semibold sm:text-[26px]">{c.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted">{c.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {c.evidence.map((e) => (
                      <li key={e} className="flex gap-3 text-[14.5px] leading-snug text-ink-2">
                        <Check className="mt-0.5 shrink-0" width={16} height={16} style={{ color: tone[c.id].fg }} />
                        {e}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Related tools">
                    {c.tags.map((t) => (
                      <li key={t} className="chip !text-[12px]">{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
