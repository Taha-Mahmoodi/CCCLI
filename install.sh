#!/usr/bin/env bash
# CCCLI — restore Taha's Claude Code setup on this machine.
#   ./install.sh          repo  -> machine
#   ./install.sh --pull   machine -> repo   (then git commit && git push)
#
# home/ mirrors $HOME exactly. Everything is here: config, skills, memory,
# transcripts, history, MCP servers with live keys, browser profile.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_HOME="/Users/taha"   # the home these files were captured from
STAMP="$(date +%Y%m%d%H%M%S)"

# gstack is a 1.1 GB public clone — cloned, not vendored
EXCL=(--exclude '.claude/skills/gstack/' --exclude 'node_modules/' --exclude '.DS_Store')

if [ "${1:-}" = "--pull" ]; then
  rsync -a --delete "${EXCL[@]}" \
    "$HOME/.claude/"       "$REPO/home/.claude/"
  rsync -aL --delete "$HOME/.agents/"      "$REPO/home/.agents/"
  rsync -a  --delete "$HOME/.claude-usage/" "$REPO/home/.claude-usage/"
  rsync -a  --delete "$HOME/.gstack/"       "$REPO/home/.gstack/"
  for f in .claude.json .claude.json.backup .claude.json.bak .zshrc .gitconfig .zprofile .profile; do
    [ -f "$HOME/$f" ] && cp "$HOME/$f" "$REPO/home/$f"
  done
  echo "pulled into $REPO — git commit && git push"
  exit 0
fi

echo "==> backing up existing config"
for f in .claude/CLAUDE.md .claude/settings.json .claude/settings.local.json .claude.json; do
  [ -e "$HOME/$f" ] && cp "$HOME/$f" "$HOME/$f.bak-$STAMP"
done

echo "==> restoring \$HOME state (config, skills, memory, transcripts, history, MCP, browser profile)"
rsync -a "${EXCL[@]}" "$REPO/home/" "$HOME/"

# absolute paths are baked into settings and transcript dir names; fix them if the username differs
if [ "$HOME" != "$SRC_HOME" ]; then
  echo "==> rewriting $SRC_HOME -> $HOME"
  for f in "$HOME/.claude/settings.json" "$HOME/.claude/settings.local.json" "$HOME/.claude.json" "$HOME/.claude-usage/config.json"; do
    [ -f "$f" ] && sed -i '' "s|$SRC_HOME|$HOME|g" "$f"
  done
  # memory + transcripts live under a dir named after the home path
  old="$HOME/.claude/projects/$(echo "$SRC_HOME" | tr '/' '-')"
  new="$HOME/.claude/projects/$(echo "$HOME"     | tr '/' '-')"
  [ -d "$old" ] && [ ! -d "$new" ] && mv "$old" "$new"
fi

echo "==> usage data repo"
[ -d "$HOME/.claude-usage/claude-usage-data/.git" ] || \
  git clone https://github.com/Taha-Mahmoodi/claude-usage-data.git "$HOME/.claude-usage/claude-usage-data" || \
  echo "   skipped (private repo — needs gh auth)"

echo "==> gstack"
if [ -d "$HOME/.claude/skills/gstack/.git" ]; then
  git -C "$HOME/.claude/skills/gstack" pull --ff-only || true
else
  git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git "$HOME/.claude/skills/gstack"
fi
( cd "$HOME/.claude/skills/gstack" && ./setup ) || echo "   gstack setup failed — needs bun (https://bun.sh). Re-run: cd ~/.claude/skills/gstack && ./setup"

echo "==> plugins"
python3 - "$HOME/.claude/settings.json" <<'PY' | while read -r cmd; do eval "$cmd" || true; done
import json, sys, shlex
s = json.load(open(sys.argv[1]))
for name, m in s.get("extraKnownMarketplaces", {}).items():
    print("claude plugin marketplace add " + shlex.quote(m["source"]["repo"]))
for pid, on in s.get("enabledPlugins", {}).items():
    if on:
        print("claude plugin install " + shlex.quote(pid))
PY

# the ponytail statusline path is version-pinned — repoint it at whatever just installed
python3 - "$HOME/.claude" <<'PY'
import glob, json, sys
d = sys.argv[1]
hits = sorted(glob.glob(d + "/plugins/cache/ponytail/ponytail/*/hooks/ponytail-statusline.sh"))
if hits:
    p = d + "/settings.json"
    s = json.load(open(p))
    if "statusLine" in s:
        s["statusLine"]["command"] = 'bash "%s"' % hits[-1]
        json.dump(s, open(p, "w"), indent=2)
        print("   statusline -> " + hits[-1])
PY

echo
echo "done — run 'claude login' once, then restart Claude Code."
