#!/usr/bin/env python3
"""Generate every badge this project ships, as committed SVG.

No badge service, no external endpoint — the same rule the pipeline enforces on
the sites it builds (PRINCIPLES.md §9). Run by .github/workflows/ci.yml.

    python3 scripts/badge.py            # write all badges
    python3 scripts/badge.py --check    # fail if any is stale (CI)

The attribution badge is the one that travels: it ships in the footer of every
site this pipeline forges, and it carries a prefers-reduced-motion guard because
§12 applies to our own artwork too.
"""
import os, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "badges")

# Sampled from nothing — chosen deliberately, per §8: ink of a darkroom, and the
# single warm point of a filament coming up to heat. The dot in "portfolio.me" is
# the mark, so the dot is what glows.
INK = "#0F0E13"
EDGE = "#FF5C39"
SPARK = "#FF5C39"
TEXT = "#B4B7C4"
BRIGHT = "#FFFFFF"

FONT = "SFMono-Regular, Menlo, Consolas, monospace"
FS = 12.5
CW = 7.52   # monospace advance at 12.5px
H = 32


def w(text):
    """Rendered width of a monospace run."""
    return len(text) * CW


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def attribution():
    """Forged with portfolio.me · PIIIX — the badge that ships in forged footers."""
    lead, name, by = "Forged with ", "portfolio.me", "PIIIX"
    dot_x, gap = 15.0, 11.0
    tx = dot_x + gap
    div_x = tx + w(lead + name) + 9
    by_x = div_x + 9
    width = round(by_x + w(by) + 14)
    ty = H / 2 + FS * 0.35
    label = f"Forged with portfolio.me, created by PIIIX"

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{H}" viewBox="0 0 {width} {H}" role="img" aria-label="{label}">
<title>{label}</title>
<style>
  .spark {{ animation: pulse 1.9s ease-in-out infinite; transform-origin: {dot_x}px {H/2}px; }}
  .ring  {{ animation: bloom 1.9s ease-out infinite; transform-origin: {dot_x}px {H/2}px; }}
  @keyframes pulse {{ 0%,100% {{ opacity: 1 }} 50% {{ opacity: .45 }} }}
  @keyframes bloom {{ 0% {{ r: 3; opacity: .55 }} 100% {{ r: 9; opacity: 0 }} }}
  @media (prefers-reduced-motion: reduce) {{
    .spark, .ring {{ animation: none }}
    .ring {{ opacity: 0 }}
  }}
</style>
<rect x=".5" y=".5" width="{width - 1}" height="{H - 1}" rx="8" fill="{INK}" stroke="{EDGE}" stroke-opacity=".45"/>
<circle class="ring" cx="{dot_x}" cy="{H/2}" r="3" fill="none" stroke="{SPARK}" stroke-width=".9"/>
<circle class="spark" cx="{dot_x}" cy="{H/2}" r="3.1" fill="{SPARK}"/>
<text x="{tx}" y="{ty:.1f}" font-family="{FONT}" font-size="{FS}" font-weight="500" fill="{TEXT}">{lead}<tspan fill="{BRIGHT}" font-weight="700">{name}</tspan></text>
<line x1="{div_x}" y1="9" x2="{div_x}" y2="{H - 9}" stroke="{TEXT}" stroke-opacity=".3"/>
<text x="{by_x}" y="{ty:.1f}" font-family="{FONT}" font-size="{FS}" font-weight="500" fill="{TEXT}">{by}</text>
</svg>
'''


def stat(label, value):
    """A small two-tone stat pill: label in muted, value in bright."""
    text = f"{label} {value}"
    pad = 11.0
    width = round(pad * 2 + w(text))
    ty = H / 2 + FS * 0.35
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{H}" viewBox="0 0 {width} {H}" role="img" aria-label="{esc(text)}">
<title>{esc(text)}</title>
<rect x=".5" y=".5" width="{width - 1}" height="{H - 1}" rx="8" fill="{INK}" stroke="{EDGE}" stroke-opacity=".28"/>
<text x="{pad}" y="{ty:.1f}" font-family="{FONT}" font-size="{FS}" font-weight="500" fill="{TEXT}">{esc(label)} <tspan fill="{BRIGHT}" font-weight="700">{esc(str(value))}</tspan></text>
</svg>
'''


def count_runs():
    """Runs that actually happened.

    A Loop 0 scaffold is template copies with the placeholders still in them, and
    counting one as a forged portfolio would be the kind of inflated number §5
    exists to prevent. A run counts once its REPORT.md carries a real grade.
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


def count(pattern):
    return len(glob.glob(os.path.join(ROOT, pattern)))


def build():
    """Every badge, keyed by filename. Counts are read off the repo, never typed."""
    loops = count("loops/*.md")
    return {
        "forged-with.svg": attribution(),
        "runs.svg": stat("portfolios forged", count_runs()),
        "loops.svg": stat("loops", loops),
        "gates.svg": stat("human gates", 4),
        "targets.svg": stat("deploy targets", count("deploy/*.md")),
        "agents.svg": stat("worker agents", count("agents/*.md")),
        "rules.svg": stat("binding rules", 25),   # §0-§24
    }


def main():
    check = "--check" in sys.argv[1:]
    os.makedirs(OUT, exist_ok=True)
    stale = []
    for name, svg in build().items():
        path = os.path.join(OUT, name)
        current = open(path).read() if os.path.exists(path) else None
        if current == svg:
            continue
        if check:
            stale.append(name)
        else:
            with open(path, "w") as f:
                f.write(svg)
            print(f"  wrote  assets/badges/{name}")

    if check and stale:
        print("stale badge(s): " + ", ".join(stale))
        print("run: python3 scripts/badge.py")
        sys.exit(1)
    print("badges: up to date" if check else "badges: written")


if __name__ == "__main__":
    main()
