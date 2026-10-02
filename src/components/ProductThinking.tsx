import { motion } from 'motion/react'
import { faqScope, voiceCase } from '../data/content'
import { ArrowUpRight } from './Icons'
import { Chapter, Reveal } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

function KpiTree() {
  return (
    <div>
      <div className="mx-auto w-fit border-[2.5px] border-ink bg-ink px-6 py-3 text-center text-sheet shadow-[4px_4px_0_var(--color-red)]">
        <p className="label text-paper-3">North star</p>
        <p className="display mt-1 text-[26px]">{voiceCase.northStar}</p>
      </div>
      <svg aria-hidden viewBox="0 0 400 44" preserveAspectRatio="none" className="hidden h-11 w-full sm:block">
        {[50, 150, 250, 350].map((x, i) => (
          <motion.path
            key={x}
            d={`M200 0 V18 H${x} V44`}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease }}
          />
        ))}
      </svg>
      <div aria-hidden className="mx-auto h-6 w-[2.5px] bg-ink sm:hidden" />
      <ol className="grid grid-cols-2 gap-2.5 sm:grid-cols-4" aria-label="Input metrics, in funnel order">
        {voiceCase.funnel.map((f, i) => (
          <li key={f} className="border-[2.5px] border-ink bg-sheet px-3 py-3 text-center text-[14px] leading-snug font-semibold">
            <span className="block font-mono text-[11px] font-normal text-red">Input {i + 1}</span>
            {f}
          </li>
        ))}
      </ol>
      <div className="mt-4 border-[2.5px] border-dashed border-red p-3">
        <p className="label text-red">Guardrails: must not get worse</p>
        <p className="mt-1.5 text-[14.5px] font-medium">{voiceCase.guardrails.join('  ·  ')}</p>
      </div>
    </div>
  )
}

function NoteHead({ n, t }: { n: number; t: string }) {
  return (
    <p className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full border-[2.5px] border-ink font-display text-[16px]">{n}</span>
      <span className="label">{t}</span>
    </p>
  )
}

export function ProductThinking() {
  return (
    <section id="product" aria-labelledby="product-title" className="section border-y-[2.5px] border-ink bg-paper-2">
      <div className="page">
        <Chapter
          id="product-title"
          no="07"
          name="Navigator's notes"
          jp="第七話 · 航海士の手記"
          title="The why comes before the how."
          lede="Engineering taught me how to build. Deployments taught me that building isn't the hard part. Here's how I work through a product before writing code."
        />

        <Reveal className="mt-14">
          <article className="panel panel-shadow" aria-labelledby="voice-title">
            <header className="flex flex-col justify-between gap-4 border-b-[2.5px] border-ink p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="label text-red">Case study · PRD + prototype</p>
                <h3 id="voice-title" className="display mt-2 text-[36px] sm:text-[46px]">Bringing lapsed users back to ChatGPT Voice</h3>
              </div>
              <a href="https://prototype-milestone-3-chat-gpt.vercel.app" target="_blank" rel="noreferrer" className="btn btn-paper shrink-0 !h-12 !text-[17px]">
                Try the prototype <ArrowUpRight width={17} height={17} />
              </a>
            </header>

            <div className="grid lg:grid-cols-2">
              <div className="space-y-10 p-6 sm:p-8 lg:border-r-[2.5px] lg:border-ink">
                <section>
                  <NoteHead n={1} t="Reframe the problem" />
                  <p className="relative mt-5 w-fit text-[22px] text-muted">
                    “{voiceCase.reframe.from}”
                    <motion.span
                      aria-hidden
                      className="absolute top-[52%] left-[-3%] h-[5px] w-[106%] origin-left -rotate-2 bg-red"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: '-20%' }}
                      transition={{ duration: 0.5, delay: 0.3, ease }}
                    />
                    <span className="sr-only"> (rejected framing)</span>
                  </p>
                  <p className="display mt-2 text-[34px] sm:text-[40px]">{voiceCase.reframe.to}</p>
                </section>

                <section>
                  <NoteHead n={2} t="Read the evidence honestly" />
                  <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-5">
                    <p className="display text-[84px] text-red">85%</p>
                    <p className="text-[16px] leading-relaxed">{voiceCase.evidence[0].text}</p>
                  </div>
                  <p className="mt-4 border-l-[3px] border-ink pl-4 text-[16px] leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
                    But: {voiceCase.evidence[1].text}
                  </p>
                </section>

                <section>
                  <p className="label">Not doing</p>
                  <ul className="mt-3 space-y-2">
                    {voiceCase.nonGoals.map((g) => (
                      <li key={g} className="flex gap-3 text-[15.5px]"><span aria-hidden className="font-bold text-red">✕</span>{g}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="space-y-10 border-t-[2.5px] border-ink p-6 sm:p-8 lg:border-t-0">
                <section>
                  <NoteHead n={3} t="Define success: the KPI tree" />
                  <div className="mt-6"><KpiTree /></div>
                </section>
                <section>
                  <NoteHead n={4} t="Design the experiment" />
                  <div className="mt-5 grid grid-cols-2 border-[2.5px] border-ink">
                    <div className="p-4">
                      <p className="label text-muted">Control</p>
                      <p className="mt-1.5 font-semibold">{voiceCase.experiment.control}</p>
                    </div>
                    <div className="border-l-[2.5px] border-ink bg-red p-4 text-sheet">
                      <p className="label">Treatment</p>
                      <p className="mt-1.5 font-semibold">{voiceCase.experiment.treatment}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[15.5px]"><span className="font-semibold">Decision rule:</span> {voiceCase.experiment.scale.toLowerCase()}.</p>
                </section>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="panel h-full p-6 sm:p-8" aria-labelledby="scope-title">
              <p className="label text-red">Scoping an AI product</p>
              <h3 id="scope-title" className="display mt-2 text-[32px]">What the FAQ assistant must never do</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">
                In finance, an assistant is only useful if people trust it. I wrote the scope down before writing any code. It refuses
                rather than guesses, and refusals never reach the LLM.
              </p>
              <div className="mt-6 grid border-[2.5px] border-ink sm:grid-cols-2">
                <div className="p-4">
                  <p className="label">Answers</p>
                  <ul className="mt-2 space-y-1.5 text-[15px]">{faqScope.does.map((d) => <li key={d}>✓ {d}</li>)}</ul>
                </div>
                <div className="border-t-[2.5px] border-ink bg-ink p-4 text-sheet sm:border-t-0 sm:border-l-[2.5px]">
                  <p className="label text-red">Refuses</p>
                  <ul className="mt-2 space-y-1.5 text-[15px]">{faqScope.doesNot.map((d) => <li key={d}>✕ {d}</li>)}</ul>
                </div>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="panel h-full p-6 sm:p-8" aria-labelledby="field-title">
              <p className="label text-red">From the field</p>
              <h3 id="field-title" className="display mt-2 text-[32px]">Adoption is the real launch</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">
                At Perleybrook, a deployment counted as done only when the client's team relied on it.
              </p>
              <dl className="mt-6 grid grid-cols-2 border-[2.5px] border-ink">
                {[
                  ['100%', 'dashboard adoption after 10+ training sessions'],
                  ['−90%', 'manual reporting, via 100+ automated daily notifications'],
                  ['99%', 'uptime while integrating with legacy plant systems'],
                  ['5+', 'enterprise accounts where I turned floor needs into tasks'],
                ].map(([v, l], i) => (
                  <div key={l} className={`p-4 ${i % 2 ? 'border-l-[2.5px] border-ink' : ''} ${i > 1 ? 'border-t-[2.5px] border-ink' : ''}`}>
                    <dt className="sr-only">{l}</dt>
                    <dd className="display text-[40px]">{v}</dd>
                    <dd className="mt-1 text-[13.5px] leading-snug text-ink-2">{l}</dd>
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
