import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, SessionContextUsage, SessionRateLimit } from 'claude-code'

import type { Usage } from '../types'
import { segments } from './format'

const usage = atom({ plugin: 'usage-band', key: 'usage' } as const, null)

function toUsage(context: SessionContextUsage, rateLimits: SessionRateLimit[]): Usage {
  return {
    contextPercent: context.percent ?? null,
    // Cost is dropped on purpose: irrelevant on a subscription.
    limits: rateLimits
      .filter(l => l.kind !== 'spend_limit')
      .map(l => ({ kind: l.kind, percentUsed: l.percentUsed, resetsAt: l.resetsAt ?? null })),
  }
}

async function store($: EngineInterface, context: SessionContextUsage, rateLimits: SessionRateLimit[]) {
  const next = toUsage(context, rateLimits)
  await update($, usage, () => next)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    const now = await $.session.usage()
    await store($, now.context, now.rateLimits)
    return result
  })

  on('session.measure', async ($, e, next) => {
    await store($, e.context, e.rateLimits)
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const current = await read($, usage)
    if (e.props.hasSurvey || current === null) return next(e)

    const parts = segments(current)
    if (parts.length === 0) return next(e)

    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box>
        {parts.map((p, i) => (
          <Text key={String(i)} dimColor={!p.isHigh} color={p.isHigh ? 'warning' : undefined}>
            {i > 0 ? ' · ' : ''}
            {p.text}
          </Text>
        ))}
      </Box>
    )
  })
}
