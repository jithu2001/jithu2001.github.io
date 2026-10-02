import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = { index: string; eyebrow: string; title: ReactNode; lede?: ReactNode; align?: 'left' | 'center'; id?: string }

export function SectionHeader({ index, eyebrow, title, lede, align = 'left', id }: Props) {
  const center = align === 'center'
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <p className={`eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          <span className="text-blue">{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={id} className="mt-5 text-[34px] leading-[1.08] font-semibold sm:text-[44px] lg:text-[52px]">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-[17px] leading-relaxed text-muted sm:text-lg">{lede}</p>
        </Reveal>
      )}
    </div>
  )
}
