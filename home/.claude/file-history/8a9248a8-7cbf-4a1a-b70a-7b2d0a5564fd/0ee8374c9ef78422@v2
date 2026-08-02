#!/usr/bin/env python3
"""Regenerate the "portfolios forged" badge — the one number in this repo that
depends on more than the repo itself.

Split from scripts/badge.py deliberately. This runs on its own daily schedule
(.github/workflows/forge-count.yml), which searches public GitHub for the
attribution marker and feeds the count in via FORGE_SEARCH_COUNT. If badge.py
also regenerated this file on every push — where that env var is never set —
it would silently overwrite the wild-adoption count back down to the
local-only number the next time anyone merged anything.

    python3 scripts/forge_count.py            # write assets/badges/runs.svg
    python3 scripts/forge_count.py --check    # fail if stale

The search is best-effort and never authoritative — it misses private repos,
forks, and anyone who removed the credit (§19 says that's fine). It can only
raise the count, never lower it: local runs/ is the floor.
"""
import os, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "badges", "runs.svg")

INK, EDGE, TEXT, BRIGHT = "#0F0E13", "#FF5C39", "#B4B7C4", "#FFFFFF"
FONT = "SFMono-Regular, Menlo, Consolas, monospace"
FS, CW, H = 12.5, 7.52, 32


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def stat(label, value):
    text = f"{label} {value}"
    pad = 11.0
    width = round(pad * 2 + len(text) * CW)
    ty = H / 2 + FS * 0.35
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{H}" viewBox="0 0 {width} {H}" role="img" aria-label="{esc(text)}">
<title>{esc(text)}</title>
<rect x=".5" y=".5" width="{width - 1}" height="{H - 1}" rx="8" fill="{INK}" stroke="{EDGE}" stroke-opacity=".28"/>
<text x="{pad}" y="{ty:.1f}" font-family="{FONT}" font-size="{FS}" font-weight="500" fill="{TEXT}">{esc(label)} <tspan fill="{BRIGHT}" font-weight="700">{esc(str(value))}</tspan></text>
</svg>
'''


def count_local_runs():
    """Runs that actually happened, in this repo's own runs/.

    A Loop 0 scaffold is template copies with the placeholders still in them,
    and counting one as a forged portfolio would be the kind of inflated
    number §5 exists to prevent. A run counts once its REPORT.md carries a
    real grade.
    """
    n = 0
    for d in glob.glob(os.path.join(ROOT, "runs", "*")):
        if not os.path.isdir(d) or os.path.basename(d) == "_template":
            continue
        report = os.path.join(d, "REPORT.md")
        if not os.path.exists(report):
            continue
        if "<A / B / C / D>" in open(report, encoding="utf-8").read():
            continue   # unfilled scaffold
        n += 1
    return n


def forged_count():
    """Local count, or the wild-adoption search count, whichever is larger.

    Almost every real run happens in someone else's repository, not this one
    — this repo's own runs/ is a near-total undercount by construction. The
    search closes that gap without ever being able to make the badge lie
    downward: a failed or empty search just leaves the local floor standing.
    """
    n = count_local_runs()
    try:
        n = max(n, int(os.environ.get("FORGE_SEARCH_COUNT", "0")))
    except ValueError:
        pass
    return n


def main():
    check = "--check" in sys.argv[1:]
    svg = stat("portfolios forged", forged_count())
    current = open(OUT, encoding="utf-8").read() if os.path.exists(OUT) else None
    if current == svg:
        print("forge count: up to date")
        return
    if check:
        print("stale: assets/badges/runs.svg")
        print("run: python3 scripts/forge_count.py")
        sys.exit(1)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(svg)
    print("  wrote  assets/badges/runs.svg")


if __name__ == "__main__":
    main()
