import { useEffect, useState } from 'react'
import { profile } from '../data/content'
import { ArrowUpRight, GitHub, Star } from './Icons'
import { Reveal } from './Reveal'

type Repo = { name: string; description: string | null; language: string | null; stargazers_count: number; pushed_at: string; html_url: string; fork: boolean }
type Summary = { repos: Repo[]; total: number; languages: [string, number][] }

const SKIP = new Set(['jithu2001', 'jithu2001.github.io'])
const CACHE_KEY = 'gh-activity-v2'

// Better one-liners for repos whose GitHub description is empty.
const DESCRIPTIONS: Record<string, string> = {
  'Credit-track': 'WholeFlow: TallyPrime → Supabase sync with an owner/staff mobile app',
  'Econ-billing': 'Lodge management and GST billing desktop app (Go + React)',
}

// Snapshot from Oct 2026, used when the API is unreachable or rate-limited.
const fallback: Summary = {
  total: 28,
  languages: [['Go', 9], ['Dart', 5], ['TypeScript', 3], ['Python', 2]],
  repos: [
    { name: 'NL-chatbot-FAQ', description: 'Facts-only mutual fund FAQ assistant (RAG)', language: 'Python', stargazers_count: 0, pushed_at: '2026-09-29T00:00:00Z', html_url: 'https://github.com/jithu2001/NL-chatbot-FAQ', fork: false },
    { name: 'Credit-track', description: 'TallyPrime → Supabase sync and owner mobile app', language: 'Go', stargazers_count: 0, pushed_at: '2026-09-29T00:00:00Z', html_url: 'https://github.com/jithu2001/Credit-track', fork: false },
    { name: 'RoomEase', description: 'Offline-first hotel check-in and guest manager for Android', language: 'Dart', stargazers_count: 0, pushed_at: '2026-09-19T00:00:00Z', html_url: 'https://github.com/jithu2001/RoomEase', fork: false },
    { name: 'Attic', description: 'Your photos, music, and movies, streamed from your own home', language: 'Go', stargazers_count: 0, pushed_at: '2026-09-13T00:00:00Z', html_url: 'https://github.com/jithu2001/Attic', fork: false },
  ],
}

function summarise(all: Repo[]): Summary {
  const own = all.filter((r) => !r.fork && !SKIP.has(r.name))
  const counts = new Map<string, number>()
  own.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1))
  return {
    total: all.length,
    languages: [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4),
    repos: own.map((r) => ({ ...r, description: r.description || DESCRIPTIONS[r.name] || null })).sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at)).slice(0, 4),
  }
}

function ago(iso: string) {
  const days = Math.max(0, Math.round((Date.now() - +new Date(iso)) / 86_400_000))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.round(days / 30)
  return months < 12 ? `${months} mo ago` : `${Math.round(months / 12)} yr ago`
}

export function GitHubActivity() {
  const [data, setData] = useState<Summary>(fallback)

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) return setData(JSON.parse(cached))
    } catch { /* storage unavailable */ }
    const ctrl = new AbortController()
    fetch('https://api.github.com/users/jithu2001/repos?per_page=100&sort=pushed', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((repos: Repo[]) => {
        const s = summarise(repos)
        setData(s)
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(s)) } catch { /* ignore */ }
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])

  return (
    <Reveal className="mt-16">
      <div className="glass rounded-3xl p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white"><GitHub /></span>
            <div>
              <p className="font-medium">Recently on GitHub</p>
              <p className="text-[13.5px] text-muted">
                {data.total} public repositories · mostly {data.languages.map(([l]) => l).join(', ')}
              </p>
            </div>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" className="link-quiet">@jithu2001 <ArrowUpRight width={15} height={15} /></a>
        </div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {data.repos.map((r) => (
            <li key={r.name}>
              <a href={r.html_url} target="_blank" rel="noreferrer" className="group block h-full rounded-2xl border border-line bg-white/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-card">
                <p className="flex items-center justify-between gap-2 font-mono text-[13px] font-medium text-ink">
                  <span className="truncate">{r.name}</span>
                  <ArrowUpRight width={14} height={14} className="shrink-0 text-faint transition-colors group-hover:text-ink" />
                </p>
                {r.description && <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-muted">{r.description}</p>}
                <p className="mt-3 flex items-center gap-3 font-mono text-[11px] text-faint">
                  {r.language && <span>{r.language}</span>}
                  {r.stargazers_count > 0 && <span className="flex items-center gap-1"><Star width={12} height={12} />{r.stargazers_count}</span>}
                  <span>{ago(r.pushed_at)}</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
