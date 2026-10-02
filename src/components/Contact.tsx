import { useState } from 'react'
import { profile } from '../data/content'
import { ArrowUpRight, Check, Download, GitHub, LinkedIn, Mail } from './Icons'
import { Reveal } from './Reveal'

const ways = [
  { title: 'Freelance & contract', text: 'You have a problem and need someone to scope it, build it and ship it.' },
  { title: 'Forward-deployed engineering', text: 'Your product has to work inside real customer environments.' },
  { title: 'Backend engineering', text: 'Go services, APIs and data that need to be reliable in production.' },
  { title: 'Product roles', text: 'You want a PM who can talk to engineers and users in their own terms.' },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked; mailto link still works */ }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section pb-16">
      <div className="container-x">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[32px] border border-line bg-white px-6 py-14 shadow-lift sm:px-12 sm:py-20 lg:px-16">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-32 -left-24 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,#e4ebff,transparent)]" />
              <div className="absolute -right-24 -bottom-40 h-[460px] w-[560px] rounded-full bg-[radial-gradient(closest-side,#efeaff,transparent)]" />
              <div className="grid-bg absolute inset-0 opacity-70" />
            </div>

            <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
              <div>
                <p className="eyebrow"><span className="text-blue">08</span> · Contact</p>
                <h2 id="contact-title" className="mt-5 text-[38px] leading-[1.04] font-semibold sm:text-[54px] lg:text-[60px]">
                  Have a problem worth <span className="font-serif font-normal italic text-gradient pr-1">building?</span>
                </h2>
                <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted">
                  I'm open to freelance projects, forward-deployed engineering, backend roles and product-focused work. Tell me what
                  you're trying to solve.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={`mailto:${profile.email}?subject=Let's%20talk`} className="btn btn-primary"><Mail /> Let's talk</a>
                  <a href={profile.resume} download className="btn btn-secondary"><Download /> Download resume</a>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a className="link-quiet" href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn</a>
                  <a className="link-quiet" href={profile.github} target="_blank" rel="noreferrer"><GitHub /> GitHub</a>
                  <a className="link-quiet" href={profile.resumeFde} download>FDE-focused resume <ArrowUpRight width={14} height={14} /></a>
                </div>
                <button type="button" onClick={copy} className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3.5 py-2 font-mono text-[13px] text-ink-2 transition-colors hover:border-line-strong" aria-live="polite">
                  {copied ? <><Check width={15} height={15} className="text-teal" /> Copied</> : profile.email}
                </button>
              </div>

              <ul className="grid content-start gap-3">
                {ways.map((w, i) => (
                  <Reveal key={w.title} as="li" delay={0.06 * i}>
                    <div className="rounded-2xl border border-line bg-white/75 p-5 backdrop-blur">
                      <p className="font-medium">{w.title}</p>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{w.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-[13.5px] text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Jithu J George · {profile.location}</p>
          <p className="font-mono text-[12px]">Built with React, Three.js and Motion</p>
          <a href="#home" className="link-quiet !text-[13.5px]">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}
