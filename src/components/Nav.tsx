import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { Close, Menu } from './Icons'

const items = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'product', label: 'Product' },
  { id: 'contact', label: 'Contact' },
]
const observed = [...items.map((i) => i.id), 'capabilities', 'process']

// "About" covers the capability + process sections that follow it.
const aliases: Record<string, string> = { capabilities: 'about', process: 'about' }

export function Nav() {
  const raw = useActiveSection(observed)
  const active = aliases[raw] ?? raw
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a href="#main" className="sr-only rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4">
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-[1180px] items-center justify-between rounded-full pr-2 pl-5 transition-all duration-500 ${scrolled || open ? 'glass' : 'border border-transparent'}`}
      >
        <a href="#home" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label="Jithu J George, back to top">
          <img src="/favicon.svg" alt="" width={26} height={26} className="rounded-[8px]" />
          <span>Jithu J George</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {items.slice(1).map((it) => (
            <li key={it.id} className="relative">
              <a
                href={`#${it.id}`}
                aria-current={active === it.id ? 'true' : undefined}
                className={`relative z-10 block rounded-full px-3.5 py-2 text-[14px] transition-colors duration-200 ${active === it.id ? 'text-ink' : 'text-muted hover:text-ink'}`}
              >
                {it.label}
              </a>
              {active === it.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_0_0_1px_var(--color-line),0_2px_8px_-2px_rgb(15_23_42/0.12)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn-primary hidden !h-10 !px-4 !text-[14px] sm:inline-flex">Let's talk</a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-white/70 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-auto mt-2 max-w-[1180px] origin-top rounded-3xl p-3 lg:hidden"
          >
            <ul className="grid gap-1">
              {items.map((it, i) => (
                <motion.li key={it.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i, duration: 0.3 }}>
                  <a
                    href={`#${it.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === it.id ? 'true' : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] ${active === it.id ? 'bg-white text-ink shadow-card' : 'text-ink-2'}`}
                  >
                    {it.label}
                    <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-2 w-full">Let's talk</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
