import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'

const items = [
  { id: 'about', label: 'About' },
  { id: 'route', label: 'How I work' },
  { id: 'experience', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'product', label: 'Product' },
]
const observed = ['home', ...items.map((i) => i.id), 'powers', 'contact']
const aliases: Record<string, string> = { powers: 'about' }

export function Nav() {
  const raw = useActiveSection(observed)
  const active = aliases[raw] ?? raw
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${scrolled || open ? 'border-b-[2.5px] border-ink bg-paper' : 'border-b-[2.5px] border-transparent'}`}>
      <a href="#main" className="sr-only bg-ink px-4 py-2 text-sheet focus:not-sr-only focus:absolute focus:top-3 focus:left-3">Skip to content</a>
      <nav aria-label="Primary" className="page flex h-[64px] items-center justify-between">
        <a href="#home" className="group flex items-center gap-3" aria-label="Jithu J George, back to top">
          <span className="grid h-10 w-10 -rotate-6 place-items-center rounded-full border-[2.5px] border-ink bg-red font-display text-[15px] text-sheet transition-transform duration-300 group-hover:rotate-6">JJG</span>
          <span className="hidden font-display text-[20px] tracking-[0.02em] uppercase sm:block">Jithu J George</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {items.map((it, i) => (
            <li key={it.id} className="relative">
              <a href={`#${it.id}`} aria-current={active === it.id ? 'true' : undefined} className={`flex items-baseline gap-1.5 py-2 text-[15px] font-medium transition-colors ${active === it.id ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                {it.label}
              </a>
              {active === it.id && <motion.span layoutId="nav-ink" className="absolute -bottom-0.5 left-0 h-[3px] w-full bg-red" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-red hidden !h-11 !px-5 !text-[16px] sm:inline-flex">Join the crew</a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border-[2.5px] border-ink bg-sheet lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span className={`absolute left-0 h-[2.5px] w-5 bg-ink transition-transform duration-300 ${open ? 'top-[5px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-[2.5px] w-5 bg-ink transition-transform duration-300 ${open ? 'top-[5px] -rotate-45' : 'top-[10px]'}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-[calc(100dvh-64px)] overflow-y-auto border-t-[2.5px] border-ink bg-paper lg:hidden"
          >
            <ul className="page py-4">
              {[...items, { id: 'contact', label: 'Contact' }].map((it, i) => (
                <li key={it.id} className="border-b-2 border-ink/15">
                  <a href={`#${it.id}`} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-4">
                    <span className={`display text-[40px] ${active === it.id ? 'text-red' : ''}`}>{it.label}</span>
                    <span className="font-mono text-[12px] text-muted">CH.0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="page pb-10">
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-red w-full">Join the crew</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
