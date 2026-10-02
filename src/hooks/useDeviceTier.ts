import { useEffect, useState } from 'react'

export type Tier = 'full' | 'lite' | 'none'

function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

// Decides how much 3D a device gets. "none" falls back to a static illustration.
export function detectTier(): Tier {
  if (typeof window === 'undefined' || !supportsWebGL()) return 'none'
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return 'none'
  const small = window.matchMedia('(max-width: 767px)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const weakCpu = (nav.hardwareConcurrency ?? 8) <= 4
  const weakMem = (nav.deviceMemory ?? 8) <= 4
  if (small || coarse || weakCpu || weakMem) return 'lite'
  return 'full'
}

export function useDeviceTier() {
  const [tier, setTier] = useState<Tier | null>(null)
  useEffect(() => setTier(detectTier()), [])
  return tier
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}
