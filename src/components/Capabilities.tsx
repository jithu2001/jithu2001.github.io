import { capabilities } from '../data/content'
import { Chapter, Reveal } from './ui'

const glyph: Record<string, string> = { backend: '構', fde: '展', product: '策', ai: '智' }
const reading: Record<string, string> = { backend: 'kō · to build', fde: 'ten · to deploy', product: 'saku · strategy', ai: 'chi · intelligence' }

export function Capabilities() {
  return (
    <section id="powers" aria-labelledby="powers-title" className="section !pt-0">
      <div className="page">
        <Chapter
          id="powers-title"
          no="02"
          name="Four powers"
          jp="第二話 · 四つの力"
          title="Four hats. One job."
          lede="Products rarely fail on one hard problem. They fail in the gaps between engineering, deployment and product. I work in those gaps."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {capabilities.map((c, i) => (
            <Reveal key={c.id} delay={0.06 * (i % 2)}>
              <article className="panel group relative h-full overflow-hidden p-6 transition-transform duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 sm:p-9">
                <span aria-hidden className="jp pointer-events-none absolute -top-6 -right-4 text-[190px] leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:2px_var(--color-paper-3)] group-hover:[-webkit-text-stroke:2px_var(--color-red)] sm:text-[230px]">
                  {glyph[c.id]}
                </span>
                <div className="relative">
                  <p className="label flex items-center gap-3">
                    <span className="bg-ink px-2 py-0.5 text-sheet">Power 0{i + 1}</span>
                    <span className="text-muted">{c.kicker}</span>
                  </p>
                  <h3 className="display mt-6 max-w-[14ch] text-[40px] sm:text-[48px]">{c.title}</h3>
                  <p className="mt-4 max-w-md text-[16.5px] leading-relaxed text-ink-2">{c.body}</p>
                  <ul className="mt-7 space-y-3 border-t-2 border-ink pt-5">
                    {c.evidence.map((e) => (
                      <li key={e} className="grid grid-cols-[18px_1fr] gap-2 text-[15px] leading-snug">
                        <span aria-hidden className="mt-[7px] h-[3px] w-3 bg-red" />
                        {e}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-mono text-[12.5px] tracking-wide text-muted">{c.tags.join('  /  ')}</p>
                  <p aria-hidden className="mt-4 font-mono text-[11px] text-faint">{glyph[c.id]} {reading[c.id]}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
