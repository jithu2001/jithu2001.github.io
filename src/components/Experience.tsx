import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { certifications, education, experience } from '../data/content'
import { Chapter, Reveal } from './ui'

export function Experience() {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 70%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  return (
    <section id="experience" aria-labelledby="exp-title" className="section">
      <div className="page">
        <Chapter
          id="exp-title"
          no="04"
          name="Ship's log"
          jp="第四話 · 航海日誌"
          title="Where I've built, shipped and stayed."
          lede="Two crews, one pattern: own the problem from requirements to production, then stay until people actually use it."
        />

        <div ref={track} className="relative mt-16">
          <div aria-hidden className="absolute top-0 bottom-0 left-[9px] w-[3px] bg-ink/15 lg:left-[279px]">
            <motion.div className="h-full w-full origin-top bg-red" style={{ scaleY: line }} />
          </div>

          <ol className="space-y-14 lg:space-y-20">
            {experience.map((r, ri) => (
              <li key={r.company} className="relative grid gap-6 pl-10 lg:grid-cols-[280px_1fr] lg:gap-0 lg:pl-0">
                <span aria-hidden className="absolute top-2 left-0 h-[21px] w-[21px] rotate-45 border-[2.5px] border-ink bg-red lg:left-[270px]" />

                <Reveal className="lg:pr-12">
                  <p className="label text-red">Log {String(ri + 1).padStart(2, '0')}</p>
                  <p className="display mt-2 text-[34px] whitespace-pre-line lg:text-[40px]">{r.period.replace(' – ', ' —\n')}</p>
                  <p className="mt-2 font-mono text-[13px] text-muted">{r.location} · {r.type}</p>
                </Reveal>

                <Reveal delay={0.06} className="lg:pl-14">
                  <article className="panel panel-shadow">
                    <header className="flex flex-wrap items-end justify-between gap-3 border-b-[2.5px] border-ink p-6 sm:p-8">
                      <div>
                        <h3 className="display text-[44px] sm:text-[56px]">{r.company}</h3>
                        <p className="mt-1 text-[17px] font-semibold">{r.role}</p>
                      </div>
                      <span className="stamp text-[15px] text-red">{r.type}</span>
                    </header>
                    <div className="p-6 sm:p-8">
                      <p className="max-w-2xl text-[17px] leading-relaxed text-ink-2">{r.summary}</p>

                      {r.highlights.some((h) => h.title) ? (
                        <ol className="mt-7 grid gap-0 border-2 border-ink lg:grid-cols-3">
                          {r.highlights.map((h, i) => (
                            <li key={h.text} className={`p-5 ${i ? 'border-t-2 border-ink lg:border-t-0 lg:border-l-2' : ''}`}>
                              <p className="font-mono text-[12px] text-red">Entry {i + 1}</p>
                              <p className="display mt-1 text-[26px]">{h.title}</p>
                              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{h.text}</p>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <ol className="mt-7 divide-y-2 divide-dotted divide-ink/25">
                          {r.highlights.map((h, i) => (
                            <li key={h.text} className="grid grid-cols-[44px_1fr] gap-2 py-3.5 text-[16px] leading-relaxed">
                              <span className="font-mono text-[13px] text-red">{String(i + 1).padStart(2, '0')}</span>
                              {h.text}
                            </li>
                          ))}
                        </ol>
                      )}

                      <p className="mt-6 border-t-2 border-ink pt-4 font-mono text-[12.5px] tracking-wide text-muted">
                        <span className="text-ink">Cargo:</span> {r.stack.join(' / ')}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-20">
          <div className="grid border-[2.5px] border-ink bg-sheet md:grid-cols-3">
            {education.map((e, i) => (
              <div key={e.school} className={`p-6 ${i ? 'border-t-[2.5px] border-ink md:border-t-0 md:border-l-[2.5px]' : ''}`}>
                <p className="label text-red">{i === 0 ? 'Training' : 'Studied'} · {e.period}</p>
                <p className="display mt-3 text-[26px]">{e.school}</p>
                <p className="mt-1 text-[15px] text-ink-2">{e.detail}</p>
              </div>
            ))}
            <div className="border-t-[2.5px] border-ink p-6 md:border-t-0 md:border-l-[2.5px]">
              <p className="label text-red">Certifications</p>
              <ul className="mt-3 space-y-1.5 text-[15px]">
                {certifications.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
