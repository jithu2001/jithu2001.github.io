import { profile } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const facts = [
  { k: 'Based in', v: 'Kerala, India · works remote' },
  { k: 'Now', v: 'Freelance product developer at Krisko' },
  { k: 'Learning', v: 'NextLeap Product Management Fellowship' },
  { k: 'Education', v: 'B.E. Computer Science, CGPA 8.57' },
  { k: 'Speaks', v: 'English · Malayalam · Hindi' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div>
          <SectionHeader
            id="about-title"
            index="01"
            eyebrow="About"
            title={<>An engineer who keeps asking <span className="font-serif font-normal italic">why</span>.</>}
          />
          <div className="mt-8 max-w-2xl space-y-5 text-[17px] leading-[1.75] text-ink-2 sm:text-[18px]">
            <Reveal delay={0.1}>
              <p>
                I started at Perleybrook Labs building the Go services and YOLOv5 models behind AI monitoring systems. Then I took
                them on-site. Every plant, whether Coca-Cola, Unilever or Hyundai, had different PLCs, different networks and
                different people who would have to live with the software.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Some of my most useful lessons came from watching people on a shop floor ignore a feature we were sure they needed.
                That's what pulled me toward product. I care as much about <em>whether</em> something should be built as about
                building it well.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="text-muted">
                Today I freelance, owning client products from the first call to the installed binary. I'm also doing the
                NextLeap PM Fellowship. The problems I like best are messy ones: real users, real constraints, and nothing working
                yet.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className="lg:pt-24">
          <aside className="glass rounded-3xl p-6 sm:p-7" aria-label="Quick facts">
            <p className="eyebrow">At a glance</p>
            <dl className="mt-5 divide-y divide-line">
              {facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[96px_1fr] gap-4 py-3.5 text-[15px]">
                  <dt className="text-faint">{f.k}</dt>
                  <dd className="text-ink-2">{f.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 border-t border-line pt-5">
              <p className="text-[13px] text-faint">Open to</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {profile.openTo.map((o) => (
                  <li key={o} className="chip">{o}</li>
                ))}
              </ul>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
