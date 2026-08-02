#!/usr/bin/env bash
# CCCLI — restore Taha's Claude Code setup on this machine.
#   ./install.sh          repo  -> machine
#   ./install.sh --pull   machine -> repo   (then git commit && git push)
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$HOME/.claude"
MEM_DIR="$CLAUDE_DIR/projects/$(echo "$HOME" | tr '/' '-')/memory"
STAMP="$(date +%Y%m%d%H%M%S)"

# ---------------------------------------------------------------- pull mode
if [ "${1:-}" = "--pull" ]; then
  cp "$CLAUDE_DIR/CLAUDE.md" "$REPO/claude/CLAUDE.md"
  sed "s|$HOME|__HOME__|g" "$CLAUDE_DIR/settings.json"       > "$REPO/claude/settings.json"
  sed "s|$HOME|__HOME__|g" "$CLAUDE_DIR/settings.local.json" > "$REPO/claude/settings.local.json"
  rsync -aL --delete --exclude 'gstack/' --exclude '.git/' --exclude 'node_modules/' \
    "$CLAUDE_DIR/skills/" "$REPO/claude/skills/"
  rsync -a --delete "$MEM_DIR/" "$REPO/memory/" 2>/dev/null || true
  echo "pulled into $REPO — review 'git diff' for secrets before pushing."
  exit 0
fi

# ------------------------------------------------------------- install mode
echo "==> config"
mkdir -p "$CLAUDE_DIR" "$MEM_DIR"
for f in CLAUDE.md settings.json settings.local.json; do
  [ -e "$CLAUDE_DIR/$f" ] && cp "$CLAUDE_DIR/$f" "$CLAUDE_DIR/$f.bak-$STAMP"
done
cp "$REPO/claude/CLAUDE.md" "$CLAUDE_DIR/CLAUDE.md"
sed "s|__HOME__|$HOME|g" "$REPO/claude/settings.json"       > "$CLAUDE_DIR/settings.json"
sed "s|__HOME__|$HOME|g" "$REPO/claude/settings.local.json" > "$CLAUDE_DIR/settings.local.json"

echo "==> skills"
rsync -a "$REPO/claude/skills/" "$CLAUDE_DIR/skills/"   # merge, never delete local extras

echo "==> memory"
rsync -a "$REPO/memory/" "$MEM_DIR/"

echo "==> usage hook"
mkdir -p "$HOME/.claude-usage"
cp "$REPO/claude-usage/collect.mjs" "$HOME/.claude-usage/collect.mjs"
[ -f "$HOME/.claude-usage/config.json" ] || cat > "$HOME/.claude-usage/config.json" <<JSON
{ "device": "$(hostname -s)", "dataRepoPath": "$HOME/.claude-usage/claude-usage-data", "pushIntervalMin": 5 }
JSON

echo "==> gstack"
if [ -d "$CLAUDE_DIR/skills/gstack/.git" ]; then
  git -C "$CLAUDE_DIR/skills/gstack" pull --ff-only || true
else
  git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git "$CLAUDE_DIR/skills/gstack"
fi
( cd "$CLAUDE_DIR/skills/gstack" && ./setup ) || echo "   gstack setup failed — needs bun (https://bun.sh). Re-run: cd ~/.claude/skills/gstack && ./setup"

echo "==> plugins"
python3 - "$REPO/claude/settings.json" <<'PY' | while read -r cmd; do eval "$cmd" || true; done
import json, sys, shlex
s = json.load(open(sys.argv[1]))
for name, m in s.get("extraKnownMarketplaces", {}).items():
    print("claude plugin marketplace add " + shlex.quote(m["source"]["repo"]))
for pid, on in s.get("enabledPlugins", {}).items():
    if on:
        print("claude plugin install " + shlex.quote(pid))
PY

# the statusline path is version-pinned in settings.json — repoint it at whatever ponytail just installed
python3 - "$CLAUDE_DIR" <<'PY'
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

echo "==> mcp servers"
if [ -f "$REPO/.env" ]; then set -a; . "$REPO/.env"; set +a; fi
# expandvars fills ${MAGIC_API_KEY} etc from the environment; unset ones stay literal and get skipped
servers="$(python3 -c '
import json, os, sys
for name, cfg in json.load(open(sys.argv[1])).items():
    print(name + "\t" + os.path.expandvars(json.dumps(cfg)))
' "$REPO/mcp/servers.json")"
while IFS=$'\t' read -r name cfg; do
  [ -z "$name" ] && continue
  case "$cfg" in
    *'${'*) echo "   skip $name — env var not set (see .env.example)"; continue ;;
  esac
  if claude mcp add-json -s user "$name" "$cfg" >/dev/null 2>&1; then
    echo "   added $name"
  else
    echo "   $name already configured (or add failed)"
  fi
done <<< "$servers"

echo
echo "done. restart Claude Code."
