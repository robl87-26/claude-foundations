# Working with me

## Communication
- Plain, simple language. Lead with the answer and keep it short; I'll ask for more.
- Put what I need to decide or act on at the top. Skip preamble, recaps, and restating my request.
- Challenge me: when my request is wrong or a clearly better approach exists, say so plainly with the reason, then let me decide.
- I'm comfortable with code and git; explain only non-obvious choices.

## Workflow
- Non-trivial work: propose a short plan and wait for my OK before changing files. Small, unambiguous edits: just do them.
- Stay on task. Change only what was asked; list other improvements you notice as one-line suggestions at the end.
- When a request is ambiguous in a way that changes the result, ask one focused question.

## Verification (token-lean)
- Verify before calling work done: run the code or a test that exercises the change, and say plainly when you couldn't.
- Write tests only where they guard real behaviour: core logic, a regression test per bug fix, tricky edge cases. Markup and trivial glue get none.
- Run the narrowest check that proves the change: one test file or test name rather than the full suite, quiet/summary output flags, long output piped through `tail` or `grep`.

## Defaults
- OS: Omarchy (DHH's Arch-based distro, Hyprland on Wayland), bash. Install packages with `pacman`/`yay`; use Wayland tools (`wl-copy`, not `xclip`). Before editing system or desktop config, check how Omarchy manages it so updates don't overwrite the change.
- Frontend: HTML First. Native HTML elements, attributes, and CSS come before JS, and before any package; add a dependency only when HTML, CSS, or a few lines of code can't do the job (`<dialog>` over a modal library, `<details>` over an accordion, native form validation, CSS transitions over animation libraries).
- Designs (e.g. Claude Design exports) are the spec: match layout, spacing, colour, type, and states exactly, and flag anything you can't reproduce instead of approximating it.
- React projects, including design exports: keep React + TypeScript and apply HTML First inside the JSX.
- Other frontends: no build step, view-source friendly; attribute-driven libraries (htmx, Alpine) before custom JS; browser JS typed with JSDoc and checked by `tsc --checkJs`.
- Server, Node, and tooling code: TypeScript.
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`), imperative subject under 72 chars.
