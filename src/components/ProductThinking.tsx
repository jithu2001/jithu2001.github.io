import { motion } from 'motion/react'
import { faqScope, voiceCase } from '../data/content'
import { ArrowUpRight, Check, Minus } from './Icons'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

function MetricTree() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="mx-auto w-fit rounded-2xl bg-ink px-5 py-3 text-center text-white shadow-lift"
      >
        <p className="font-mono text-[10.5px] tracking-wider text-white/60 uppercase">North-star</p>
        <p className="mt-0.5 font-medium">{voiceCase.northStar}</p>
      </motion.div>

      {/* Connectors */}
      <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className="mx-auto hidden h-10 w-full sm:block">
        {[50, 150, 250, 350].map((x, i) => (
          <motion.path
            key={x}
            d={`M200 0 C200 22, ${x} 18, ${x} 40`}
            fill="none"
            stroke="#b9cbff"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease }}
          />
        ))}
      </svg>
      <div aria-hidden className="mx-auto h-6 w-px bg-[#b9cbff] sm:hidden" />

      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Input metrics, in funnel order">
        {voiceCase.funnel.map((f, i) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease }}
            className="rounded-xl border border-[#d6e0ff] bg-blue-soft/60 px-3 py-2.5 text-center text-[13px] leading-snug text-ink-2"
          >
            <span className="block font-mono text-[10px] text-blue">0{i + 1}</span>
            {f}
          </motion.li>
        ))}
      </ol>

      <div className="mt-4 rounded-xl border border-dashed border-rose/35 bg-rose-soft/40 p-3">
        <p className="font-mono text-[10.5px] tracking-wider text-rose uppercase">Guardrails: must not get worse</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {voiceCase.guardrails.map((g) => <li key={g} className="chip !border-rose/20 !text-[12px]">{g}</li>)}
        </ul>
      </div>
    </div>
  )
}

export function ProductThinking() {
  return (
    <section id="product" aria-labelledby="product-title" className="section bg-gradient-to-b from-transparent via-[#f1f0fd]/70 to-transparent">
      <div className="container-x">
        <SectionHeader
          id="product-title"
          index="07"
          eyebrow="Product thinking"
          title={<>The <span className="font-serif font-normal italic">why</span> comes before the how.</>}
          lede="Engineering taught me how to build things. Deployments taught me that building isn't the hard part. Here is how I reason about a product before I write code."
        />

        {/* Case study */}
        <Reveal delay={0.1} className="mt-14">
          <article className="card overflow-hidden" aria-labelledby="voice-title">
            <header className="flex flex-col justify-between gap-4 border-b border-line px-6 py-6 sm:flex-row sm:items-center sm:px-10">
              <div>
                <p className="eyebrow">Case study · PRD + prototype</p>
                <h3 id="voice-title" className="mt-2 text-[24px] font-semibold sm:text-[28px]">Bringing lapsed users back to ChatGPT Voice</h3>
              </div>
              <a href="https://prototype-milestone-3-chat-gpt.vercel.app" target="_blank" rel="noreferrer" className="btn btn-secondary !h-10 shrink-0 !text-[14px]">
                Try the prototype <ArrowUpRight width={16} height={16} />
              </a>
            </header>

            <div className="grid gap-px bg-line lg:grid-cols-[1fr_1.15fr]">
              <div className="space-y-8 bg-white px-6 py-8 sm:px-10">
                <section>
                  <h4 className="eyebrow !text-[11px]">1 · Reframe the problem</h4>
                  <div className="mt-4 space-y-2">
                    <p className="relative w-fit text-[19px] text-faint">
                      “{voiceCase.reframe.from}”
                      <motion.span
                        aria-hidden
                        className="absolute top-1/2 left-0 h-[1.5px] w-full origin-left bg-rose"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: '-20%' }}
                        transition={{ duration: 0.7, delay: 0.3, ease }}
                      />
                      <span className="sr-only"> (rejected framing)</span>
                    </p>
                    <p className="text-[21px] leading-snug font-medium">“{voiceCase.reframe.to}”</p>
                  </div>
                </section>

                <section>
                  <h4 className="eyebrow !text-[11px]">2 · Read the evidence honestly</h4>
                  <ul className="mt-4 space-y-3">
                    {voiceCase.evidence.map((e) => (
                      <li key={e.stat} className="flex gap-4 rounded-2xl border border-line bg-canvas/60 p-4">
                        <span className={`w-14 shrink-0 leading-none text-violet ${/\d/.test(e.stat) ? 'text-[26px] font-semibold' : 'pt-1 font-serif text-[22px] italic'}`}>{e.stat}</span>
                        <span className="text-[14.5px] leading-relaxed text-ink-2">{e.text}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="eyebrow !text-[11px]">Non-goals</h4>
                  <ul className="mt-3 space-y-2">
                    {voiceCase.nonGoals.map((n) => (
                      <li key={n} className="flex gap-2.5 text-[14.5px] text-muted">
                        <Minus width={16} height={16} className="mt-0.5 shrink-0 text-faint" /> {n}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="space-y-8 bg-white px-6 py-8 sm:px-10">
                <section>
                  <h4 className="eyebrow !text-[11px]">3 · Define success (KPI tree)</h4>
                  <div className="mt-5">
                    <MetricTree />
                  </div>
                </section>

                <section>
                  <h4 className="eyebrow !text-[11px]">4 · Design the experiment</h4>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-line p-3.5">
                      <p className="font-mono text-[10.5px] tracking-wider text-faint uppercase">Control</p>
                      <p className="mt-1 text-[14.5px] text-ink-2">{voiceCase.experiment.control}</p>
                    </div>
                    <div className="rounded-xl border border-teal/30 bg-teal-soft/50 p-3.5">
                      <p className="font-mono text-[10.5px] tracking-wider text-teal uppercase">Treatment</p>
                      <p className="mt-1 text-[14.5px] text-ink-2">{voiceCase.experiment.treatment}</p>
                    </div>
                  </div>
                  <p className="mt-3 flex gap-2.5 text-[14.5px] text-ink-2">
                    <Check width={16} height={16} className="mt-0.5 shrink-0 text-teal" />
                    Decision rule: {voiceCase.experiment.scale.toLowerCase()}.
                  </p>
                </section>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <article className="card h-full p-6 sm:p-8" aria-labelledby="scope-title">
              <p className="eyebrow">Scoping an AI product</p>
              <h3 id="scope-title" className="mt-2 text-[21px] font-semibold">Deciding what the FAQ assistant must not do</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                In finance, an assistant is only useful if people can trust it. I wrote the scope down before any code. It refuses
                rather than guesses, and every refusal skips the LLM entirely.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-teal/25 bg-teal-soft/40 p-4">
                  <p className="font-mono text-[10.5px] tracking-wider text-teal uppercase">Answers</p>
                  <ul className="mt-2.5 space-y-2">
                    {faqScope.does.map((d) => <li key={d} className="flex gap-2 text-[14px] text-ink-2"><Check width={15} height={15} className="mt-0.5 shrink-0 text-teal" />{d}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl border border-rose/20 bg-rose-soft/40 p-4">
                  <p className="font-mono text-[10.5px] tracking-wider text-rose uppercase">Refuses</p>
                  <ul className="mt-2.5 space-y-2">
                    {faqScope.doesNot.map((d) => <li key={d} className="flex gap-2 text-[14px] text-ink-2"><Minus width={15} height={15} className="mt-0.5 shrink-0 text-rose" />{d}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="card h-full p-6 sm:p-8" aria-labelledby="field-title">
              <p className="eyebrow">From the field</p>
              <h3 id="field-title" className="mt-2 text-[21px] font-semibold">Treating adoption as the metric that matters</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                At Perleybrook, a deployment counted as done when the client's team actually relied on it, not just when it was
                installed.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ['100%', 'adoption of AI dashboards after 10+ training sessions'],
                  ['−90%', 'manual reporting, via 100+ automated daily notifications'],
                  ['99%', 'uptime while integrating with legacy plant systems'],
                  ['5+', 'enterprise accounts where I turned floor requirements into tasks'],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-2xl border border-line bg-canvas/60 p-4">
                    <dt className="sr-only">{l}</dt>
                    <dd className="text-[24px] font-semibold tracking-tight">{v}</dd>
                    <dd className="mt-1 text-[13px] leading-snug text-muted">{l}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
