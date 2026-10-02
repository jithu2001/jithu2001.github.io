import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { certifications, education, experience } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function Experience() {
  const track = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 75%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  return (
    <section id="experience" aria-labelledby="exp-title" className="section">
      <div className="container-x">
        <SectionHeader
          id="exp-title"
          index="04"
          eyebrow="Experience"
          title="Where I've built, shipped and supported."
          lede="Two roles, one pattern: own the problem from requirements through production, then stay until people actually use what we built."
        />

        <div className="relative mt-16">
          <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line-strong md:left-[calc(220px+7px)]">
            <motion.div className="h-full w-full origin-top bg-gradient-to-b from-blue via-violet to-teal" style={{ scaleY: line }} />
          </div>

          <ol ref={track} className="space-y-10 md:space-y-14">
          {experience.map((r) => (
            <li key={r.company} className="relative grid gap-4 pl-9 md:grid-cols-[220px_1fr] md:gap-12 md:pl-0">
              <Reveal className="md:pt-1 md:text-right md:pr-12">
                <p className="font-mono text-[12.5px] text-muted">{r.period}</p>
                <p className="mt-1 text-[13px] text-faint">{r.location}</p>
              </Reveal>
              <span aria-hidden className="absolute top-1.5 left-0 h-[15px] w-[15px] rounded-full border-[3px] border-white bg-blue shadow-[0_0_0_1px_var(--color-line-strong),0_0_0_6px_rgb(61_107_245/0.12)] md:left-[220px]" />

              <Reveal delay={0.05} className="md:pl-6">
                <article className="card p-6 sm:p-8">
                  <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <div>
                      <h3 className="text-[24px] font-semibold sm:text-[26px]">{r.company}</h3>
                      <p className="mt-1 text-[16px] text-ink-2">{r.role}</p>
                    </div>
                    <span className="chip">{r.type}</span>
                  </header>
                  <p className="mt-4 text-[16px] leading-relaxed text-muted">{r.summary}</p>

                  {r.highlights.some((h) => h.title) ? (
                    <ul className="mt-6 grid gap-3 lg:grid-cols-3">
                      {r.highlights.map((h) => (
                        <li key={h.text} className="rounded-2xl border border-line bg-canvas/70 p-4 sm:p-5">
                          <p className="font-medium">{h.title}</p>
                          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{h.text}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="mt-6 space-y-3">
                      {r.highlights.map((h) => (
                        <li key={h.text} className="flex gap-3 text-[15.5px] leading-relaxed text-ink-2">
                          <span aria-hidden className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue/60" />
                          {h.text}
                        </li>
                      ))}
                    </ul>
                  )}

                  <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5" aria-label="Stack">
                    {r.stack.map((s) => (
                      <li key={s} className="font-mono text-[12px] text-muted after:ml-1.5 after:text-line-strong after:content-['/'] last:after:content-['']">{s}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-[1fr_1fr_1fr]">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={0.05 * i}>
              <div className="glass h-full rounded-2xl p-5 sm:p-6">
                <p className="eyebrow !text-[11px]">{e.period}</p>
                <p className="mt-3 font-medium">{e.school}</p>
                <p className="mt-1 text-[14.5px] text-muted">{e.detail}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.1}>
            <div className="glass h-full rounded-2xl p-5 sm:p-6">
              <p className="eyebrow !text-[11px]">Certifications</p>
              <ul className="mt-3 space-y-1.5 text-[14.5px] text-ink-2">
                {certifications.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
