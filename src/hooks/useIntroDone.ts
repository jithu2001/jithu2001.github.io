import { useEffect, useState } from 'react'

declare global {
  interface Window {
    __introDone?: boolean
    __appReady?: () => void
  }
}

// True once the inline intro screen (index.html) starts its exit, or immediately if it was skipped.
export function useIntroDone() {
  const [done, setDone] = useState(() => typeof window === 'undefined' || window.__introDone !== false)
  useEffect(() => {
    if (window.__introDone !== false) return setDone(true)
    const on = () => setDone(true)
    window.addEventListener('intro:done', on)
    return () => window.removeEventListener('intro:done', on)
  }, [])
  return done
}
