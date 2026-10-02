import { useState } from 'react'
import { profile } from '../data/content'
import { ArrowUpRight, Check, Download, GitHub, LinkedIn, Mail } from './Icons'
import { JollyRoger, Reveal } from './ui'

const positions = [
  { role: 'Freelance & contract', text: 'You have a problem and need someone to scope it, build it and ship it.' },
  { role: 'Forward-deployed engineer', text: 'Your product has to work inside real customer environments.' },
  { role: 'Backend engineer', text: 'Go services, APIs and data that must hold up in production.' },
  { role: 'Product roles', text: 'A PM who speaks fluent engineer and fluent user.' },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked; mailto still works */ }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t-[2.5px] border-ink bg-red text-sheet">
      <div aria-hidden className="speedlines absolute inset-0 opacity-[0.07]" />
      <div aria-hidden className="halftone absolute inset-0 opacity-[0.14] fade-tl" />

      <div className="page relative py-24 lg:py-32">
        <div className="flex items-center gap-4 border-t-[3px] border-sheet pt-3">
          <span className="label">Final chapter</span>
          <span className="label opacity-80">Join the crew</span>
          <span className="jp-sm ml-auto text-[14px] opacity-90">最終話 · 仲間</span>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <Reveal>
              <h2 id="contact-title" className="display text-[60px] [text-shadow:4px_4px_0_var(--color-ink)] sm:text-[96px] lg:text-[120px]">
                Have a problem worth building?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-[19px] leading-relaxed">
                I'm open to freelance projects, forward-deployed engineering, backend roles and product-focused work. Tell me what
                you're trying to solve.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a href={`mailto:${profile.email}?subject=Let's%20talk`} className="btn !bg-ink text-sheet !shadow-[4px_4px_0_var(--color-sheet)] hover:!shadow-[6px_6px_0_var(--color-sheet)]"><Mail /> Let's talk</a>
                <a href={profile.resume} download className="btn btn-paper"><Download /> Download resume</a>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[15.5px] font-medium">
                <a className="flex items-center gap-2 underline decoration-2 underline-offset-[6px] hover:decoration-ink" href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn</a>
                <a className="flex items-center gap-2 underline decoration-2 underline-offset-[6px] hover:decoration-ink" href={profile.github} target="_blank" rel="noreferrer"><GitHub /> GitHub</a>
                <a className="flex items-center gap-2 underline decoration-2 underline-offset-[6px] hover:decoration-ink" href={profile.resumeFde} download>FDE resume <ArrowUpRight width={14} height={14} /></a>
              </div>
              <button type="button" onClick={copy} aria-live="polite" className="mt-7 inline-flex items-center gap-2 border-2 border-sheet px-4 py-2 font-mono text-[14px] transition-colors hover:bg-sheet hover:text-red">
                {copied ? <><Check width={15} height={15} /> Copied to clipboard</> : profile.email}
              </button>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="panel panel-shadow text-ink">
              <div className="flex items-center gap-4 border-b-[2.5px] border-ink p-5">
                <JollyRoger size={64} />
                <div>
                  <p className="label text-red">Crew positions open</p>
                  <p className="display text-[28px]">Pick your role for me</p>
                </div>
              </div>
              <ul>
                {positions.map((p, i) => (
                  <li key={p.role} className={`grid grid-cols-[34px_1fr] gap-2 p-5 ${i ? 'border-t-2 border-dotted border-ink/30' : ''}`}>
                    <span className="font-mono text-[13px] text-red">0{i + 1}</span>
                    <div>
                      <p className="display text-[22px]">{p.role}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="relative border-t-[2.5px] border-ink bg-ink text-paper-3">
        <div className="page flex flex-col items-center justify-between gap-3 py-6 text-[13.5px] sm:flex-row">
          <p>© {new Date().getFullYear()} Jithu J George · {profile.location}</p>
          <p className="font-mono text-[12px]">A fan-made, original design inspired by pirate-adventure manga.</p>
          <a href="#home" className="hover:text-sheet">Back to the top ↑</a>
        </div>
      </footer>
    </section>
  )
}
