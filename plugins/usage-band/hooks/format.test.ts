import { expect, test } from 'claude-code/testing'

import { segments } from './format'

test('shows context and both limits, flags high usage, ignores nothing else', () => {
  const reset5h = new Date(2026, 9, 10, 15, 5).toISOString()
  const reset7d = new Date(2026, 9, 13, 9, 0).toISOString() // a Tuesday
  const out = segments({
    contextPercent: 42,
    limits: [
      { kind: 'five_hour', percentUsed: 85.5, resetsAt: reset5h },
      { kind: 'seven_day', percentUsed: 12, resetsAt: reset7d },
    ],
  })
  expect(out).toEqual([
    { text: 'Context 42%', isHigh: false },
    { text: '5h 85.5% (resets 15:05)', isHigh: true },
    { text: '7d 12% (resets Tue 09:00)', isHigh: false },
  ])
})

test('missing figures drop out instead of showing blanks', () => {
  expect(segments({ contextPercent: null, limits: [{ kind: 'five_hour', percentUsed: 3, resetsAt: null }] }))
    .toEqual([{ text: '5h 3%', isHigh: false }])
})
