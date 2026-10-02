import { skillGroups } from '../data/content'
import { Chapter, Reveal } from './ui'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section !pt-0">
      <div className="page">
        <Chapter
          id="skills-title"
          no="06"
          name="The arsenal"
          jp="第六話 · 武器庫"
          title="A toolkit shaped by the job."
          lede="I picked up every tool here on a real project. Each group is where I reach for it."
        />

        <Reveal className="mt-14">
          <ul className="border-t-[3px] border-ink">
            {skillGroups.map((g, i) => (
              <li key={g.id} className="group relative border-b-[2.5px] border-ink">
                <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-400 ease-[var(--ease-out-quint)] group-hover:scale-y-100" />
                <div className="relative grid gap-3 py-6 transition-colors duration-300 group-hover:text-sheet md:grid-cols-[64px_minmax(0,300px)_1fr] md:items-baseline md:gap-6 md:px-4 lg:py-7">
                  <span className="font-mono text-[13px] text-red">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="display text-[34px] sm:text-[40px]">{g.label}</h3>
                    <p className="mt-1 text-[14.5px] text-muted transition-colors group-hover:text-paper-3">{g.blurb}</p>
                  </div>
                  <ul className="flex flex-wrap gap-x-1 gap-y-2" aria-label={`${g.label} tools`}>
                    {g.items.map((it, k) => (
                      <li key={it} className="text-[17px] font-medium">
                        {it}
                        {k < g.items.length - 1 && <span aria-hidden className="mx-2 text-red">✕</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
