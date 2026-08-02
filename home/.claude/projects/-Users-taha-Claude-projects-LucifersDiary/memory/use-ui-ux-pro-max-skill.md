---
name: use-ui-ux-pro-max-skill
description: "User wants the ui-ux-pro-max skill used for all UI/UX design work, every session"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0bcbe018-c6a7-478a-b559-bb1f0f8e7dac
---

The user installed the `ui-ux-pro-max` skill (from github.com/nextlevelbuilder/ui-ux-pro-max-skill) as a personal skill at `~/.claude/skills/ui-ux-pro-max/` and wants it used by default for any UI/UX design, layout, color, typography, or visual review work — in this and all sessions/projects.

**Why:** Explicit standing request ("use it from now on, previous and new sessions").

**How to apply:** When a task touches how something looks/feels/moves (new pages, components, color/font/spacing choices, UI review), invoke the skill. Its search CLI lives at `~/.claude/skills/ui-ux-pro-max/scripts/search.py` (e.g. `python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`). Requires python3.
