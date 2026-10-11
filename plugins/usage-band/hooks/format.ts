import type { Usage } from '../types'

export type Segment = { text: string; isHigh: boolean }

const LABELS: Record<string, string> = { five_hour: '5h', seven_day: '7d' }
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const pad = (n: number) => String(n).padStart(2, '0')

// 5h window: clock time it resets; 7d window: weekday plus time.
export function formatReset(kind: string, resetsAt: string | null): string {
  if (resetsAt === null) return ''
  const d = new Date(resetsAt)
  if (Number.isNaN(d.getTime())) return ''
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`
  return kind === 'five_hour' ? ` (resets ${time})` : ` (resets ${DAYS[d.getDay()]} ${time})`
}

export function segments(usage: Usage, highAt = 80): Segment[] {
  const out: Segment[] = []
  if (usage.contextPercent !== null) {
    out.push({ text: `Context ${usage.contextPercent}%`, isHigh: usage.contextPercent >= highAt })
  }
  for (const l of usage.limits) {
    const label = LABELS[l.kind] ?? l.kind
    out.push({
      text: `${label} ${l.percentUsed}%${formatReset(l.kind, l.resetsAt)}`,
      isHigh: l.percentUsed >= highAt,
    })
  }
  return out
}
