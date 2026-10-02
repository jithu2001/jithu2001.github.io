import { profile } from '../data/content'
import { Brush, Chapter, Reveal } from './ui'

const facts = [
  ['Home port', 'Kerala, India · remote-friendly'],
  ['Now', 'Freelance product developer, Krisko'],
  ['Training', 'NextLeap Product Management Fellowship'],
  ['Studied', 'B.E. Computer Science · CGPA 8.57'],
  ['Speaks', 'English · Malayalam · Hindi'],
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="page">
        <Chapter
          id="about-title"
          no="01"
          name="The captain"
          jp="第一話 · 船長"
          title={<>An engineer who keeps asking <Brush>why</Brush>.</>}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Story panel */}
          <Reveal className="panel panel-shadow p-6 sm:p-10 lg:col-span-7">
            <div className="space-y-5 text-[18px] leading-[1.7] text-ink-2">
              <p>
                I started at Perleybrook Labs building the Go services and YOLOv5 models behind AI monitoring systems. Then I took
                them on-site. Every plant, whether Coca-Cola, Unilever or Hyundai, had different PLCs, different networks and
                different people who would have to live with the software.
              </p>
              <p>
                That's what pulled me toward product. I care as much about <em>whether</em> something should be built as about
                building it well.
              </p>
              <p>
                Today I freelance, owning client products from the first call to the installed binary, and I'm doing the NextLeap
                PM Fellowship. My favourite problems are messy ones: real users, real constraints, and nothing working yet.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:col-span-5">
            {/* Speech bubble panel */}
            <Reveal delay={0.08} className="panel halftone-wrap relative overflow-hidden bg-red p-6 text-sheet sm:p-8">
              <div aria-hidden className="halftone absolute inset-0 opacity-25 fade-br" />
              <div className="relative">
                <div className="relative rounded-[50%/46%] border-[2.5px] border-ink bg-sheet px-8 py-7 text-center text-ink">
                  <p className="display text-[26px] leading-[1.05] sm:text-[30px]">
                    Some of my best lessons came from watching people ignore a feature we were sure they needed.
                  </p>
                  <svg aria-hidden viewBox="0 0 40 30" className="absolute -bottom-[26px] left-[22%] h-[30px] w-[40px]">
                    <path d="M2 0 L14 28 L30 0" fill="var(--color-sheet)" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M3 -2 H29" stroke="var(--color-sheet)" strokeWidth="5" />
                  </svg>
                </div>
                <p className="label mt-9 text-sheet/90">— On the shop floor, Perleybrook Labs</p>
              </div>
            </Reveal>

            {/* Crew card */}
            <Reveal delay={0.14} className="panel p-6 sm:p-8">
              <p className="label text-red">Crew card</p>
              <dl className="mt-4">
                {facts.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[104px_1fr] gap-3 border-b-2 border-dotted border-ink/25 py-2.5 text-[15px] last:border-0">
                    <dt className="font-mono text-[12.5px] tracking-wide text-muted uppercase">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.openTo.map((o) => (
                  <span key={o} className="border-2 border-ink px-2.5 py-1 font-mono text-[12px] tracking-wide uppercase">{o}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
