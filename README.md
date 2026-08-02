# CCCLI

My Claude Code setup, portable. Clone it on any Mac and Claude Code behaves like it does on my machine.

```bash
git clone https://github.com/Taha-Mahmoodi/CCCLI.git ~/Documents/CCCLI
cd ~/Documents/CCCLI
cp .env.example .env      # fill in the two MCP keys (optional — unset servers are skipped)
./install.sh
```

Restart Claude Code. Done.

## What it installs

| Path | Goes to | What it is |
|---|---|---|
| `claude/CLAUDE.md` | `~/.claude/CLAUDE.md` | global instructions (gstack routing, skill list) |
| `claude/settings.json` | `~/.claude/settings.json` | model `opus[1m]`, effort `xhigh`, dark-daltonized, fullscreen TUI, ponytail statusline, usage hook, enabled plugins + marketplaces |
| `claude/settings.local.json` | `~/.claude/settings.local.json` | permission allowlist + impeccable PostToolUse hook |
| `claude/skills/` | `~/.claude/skills/` | 84 skills (gstack's, higgsfield, impeccable, ui-ux-pro-max, brandkit, the writing set, …) |
| `memory/` | `~/.claude/projects/<home-slug>/memory/` | persistent memory — projects, preferences, GitHub account rules |
| `mcp/servers.json` | `claude mcp add-json -s user` | magic, n8n, shadcn, pollinations-images |
| `claude-usage/collect.mjs` | `~/.claude-usage/` | the Stop hook that logs usage |

Plus: clones [gstack](https://github.com/garrytan/gstack) to `~/.claude/skills/gstack` and runs its `./setup`, and installs the nine enabled plugins (ponytail, superpowers, diagram-design, gsap-skills, frontend-design, swift-lsp, legalzoom, git-a-profile, portfolio.me) from their marketplaces.

Existing `CLAUDE.md` / `settings*.json` are backed up to `*.bak-<timestamp>` first. Skills are merged, never deleted.

## Keeping it current

```bash
./install.sh --pull       # machine -> repo
git diff                  # check for secrets
git commit -am "sync" && git push
```

## Not in here (on purpose)

Secrets and machine state: `~/.claude.json` (OAuth account, per-project trust), `.credentials.json`, `history.jsonl`, `projects/` transcripts, `shell-snapshots/`, `file-history/`, the gstack clone (1.1 GB — `install.sh` clones it).

MCP API keys live in `.env`, which is gitignored. `mcp/servers.json` ships with `${MAGIC_API_KEY}` / `${N8N_MCP_TOKEN}` placeholders.

## Requirements

`git`, `python3`, `rsync`, `claude`, and [`bun`](https://bun.sh) (gstack only). All present on a stock Mac except bun.
