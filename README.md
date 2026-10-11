# claude-foundations

My personal, user-level `CLAUDE.md`: how I want Claude to work with me in every project.

## Install

```bash
mkdir -p ~/.claude && cp CLAUDE.md ~/.claude/CLAUDE.md
```

Claude Code loads `~/.claude/CLAUDE.md` in every session. Project-specific details (build commands, architecture, conventions) belong in that project's own `CLAUDE.md`, not here.

## Plugins

This repo is also a Claude Code plugin marketplace (`.claude-plugin/marketplace.json`). Plugins live in `plugins/`.

| Plugin | What it does |
| --- | --- |
| [`usage-band`](plugins/usage-band) | Shows live context-window and 5-hour/7-day rate-limit usage above the prompt; turns yellow at 80%. |

Install (from a terminal `claude` session; the desktop app's Code tab can't run `/plugin`):

```bash
claude plugin marketplace add robl87-26/claude-foundations
claude plugin install usage-band@claude-foundations --scope user
```

User scope loads it in every session, including the desktop app.
