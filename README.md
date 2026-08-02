# CCCLI

My entire Claude Code state, portable. Clone on any Mac, run the installer, Claude Code is exactly as it is on my machine.

```bash
git clone https://github.com/Taha-Mahmoodi/CCCLI.git ~/Documents/CCCLI
cd ~/Documents/CCCLI && ./install.sh
claude login
```

> ⚠️ **This repo contains live secrets.** API keys, bearer tokens, browser session cookies, full conversation transcripts. Keep it private. If it is ever exposed, rotate everything in `home/.claude.json` and clear `home/.gstack/chromium-profile/`.

## Layout

`home/` mirrors `$HOME` one-to-one. `install.sh` rsyncs it in; `./install.sh --pull` rsyncs it back.

| Path | What |
|---|---|
| `home/.claude/CLAUDE.md` | global instructions |
| `home/.claude/settings.json` | model `opus[1m]`, effort `xhigh`, dark-daltonized, fullscreen TUI, ponytail statusline, usage hook, 9 enabled plugins + marketplaces |
| `home/.claude/settings.local.json` | permission allowlist, impeccable PostToolUse hook |
| `home/.claude/skills/` | 84 skills (gstack's, higgsfield, impeccable, ui-ux-pro-max, brandkit, writing set, …) |
| `home/.claude/projects/-Users-taha/memory/` | 23 persistent memory files |
| `home/.claude/projects/` | every conversation transcript (~973 MB, 5.4k files) |
| `home/.claude/history.jsonl` | prompt history |
| `home/.claude/{tasks,jobs,plans,backups,telemetry,cache,file-history,shell-snapshots}/` | task queue, background jobs, saved plans, file-edit history |
| `home/.claude.json` | account id, per-project trust, **MCP servers with live API keys** |
| `home/.claude-usage/` | usage collector + its data repo |
| `home/.gstack/` | gstack config, browse audit logs, **Chromium profile with logged-in cookies** |
| `home/.agents/skills/` | the 14 skills symlinked into `.claude/skills` |
| `home/.zshrc`, `.gitconfig`, `.zprofile`, `.profile` | shell environment |

## What the installer does beyond copying

- Backs up existing `CLAUDE.md`, `settings*.json`, `.claude.json` to `*.bak-<timestamp>`.
- Clones [gstack](https://github.com/garrytan/gstack) (1.1 GB, not vendored) to `~/.claude/skills/gstack` and runs its `./setup`.
- Installs the 9 plugins from their marketplaces, then repoints the version-pinned ponytail statusline at whatever version landed.
- If the new machine's home isn't `/Users/taha`, rewrites baked-in absolute paths and renames the `-Users-taha` transcript/memory directory to match.

## Not included

The Claude Code OAuth token — it lives in the macOS Keychain, not on disk, and rotates anyway. `claude login` once after installing.

## Requirements

`git`, `python3`, `rsync`, `claude`, and [`bun`](https://bun.sh) for gstack.
