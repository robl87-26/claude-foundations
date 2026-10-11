export type Usage = {
  contextPercent: number | null
  limits: { kind: string; percentUsed: number; resetsAt: string | null }[]
}

declare module 'claude-code' {
  interface PluginState {
    'usage-band': { usage: Usage | null }
  }
}
