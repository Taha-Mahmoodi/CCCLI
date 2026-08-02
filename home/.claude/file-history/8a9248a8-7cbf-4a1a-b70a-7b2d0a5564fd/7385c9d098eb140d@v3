#!/usr/bin/env python3
"""Generate the README artwork: the refusal hero, the rule plates, the pipeline.

Every asset here is a committed SVG built from the repo's own numbers. No badge
service, no external endpoint, nothing hotlinked — the same rules the pipeline
enforces on the sites it builds (PRINCIPLES.md §9, §10).

    python3 scripts/readme_art.py            # write
    python3 scripts/readme_art.py --check    # fail if stale (CI)
"""
import os, sys, re, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets")

INK = "#0F0E13"
EDGE = "#FF5C39"
DIM = "#6B6E7D"
TEXT = "#B4B7C4"
BRIGHT = "#FFFFFF"
FONT = "SFMono-Regular, Menlo, Consolas, monospace"


def counts():
    """Read the repo. Never type a number that the repo already knows (§5)."""
    p = open(os.path.join(ROOT, "PRINCIPLES.md"), encoding="utf-8").read()
    s = open(os.path.join(ROOT, "STYLES.md"), encoding="utf-8").read()
    c = open(os.path.join(ROOT, "CRAFT.md"), encoding="utf-8").read()
    arsenal = c.split("## Prototype")[0]
    rows = [l for l in arsenal.split("\n")
            if l.startswith("|") and "---" not in l
            and "What it is" not in l and "Technique" not in l and "Library" not in l]
    md = glob.glob(os.path.join(ROOT, "**", "*.md"), recursive=True)
    return {
        "rules": len(re.findall(r"^## \d+\.", p, re.M)),
        # only rule headings count — the prose mentions [HARD] too
        "hard": len(re.findall(r"^## \d+\..*\[HARD", p, re.M)),
        "loops": len(glob.glob(os.path.join(ROOT, "loops", "*.md"))),
        "gates": 4,
        "agents": len(glob.glob(os.path.join(ROOT, "agents", "*.md"))),
        "targets": len(glob.glob(os.path.join(ROOT, "deploy", "*.md"))),
        "styles": len(re.findall(r"^\*\*[A-Z]", s.split("## Collision")[0], re.M)),
        "techniques": len(rows),
        "lines": sum(len(open(f, encoding="utf-8").read().split("\n")) for f in md),
    }


def hero(n):
    """The refusal list. What it will not do, stated before what it does."""
    W, H = 880, 340
    refusals = [
        ("no template", "every run reinvents the components"),
        ("no stock photography", "the visuals are generated, or they are not used"),
        ("no badge service", "a dead endpoint should not kill a site"),
        ("no fabricated metric", "every claim traces to a source"),
        ("no CDN in production", "vendored, committed, self-hosted"),
        ("no silent degradation", "skip anything, but the cost is recorded"),
    ]
    rows = []
    x1, x2 = 56, 470
    y0, dy = 132, 34
    for i, (what, why) in enumerate(refusals):
        col, row = i % 2, i // 2
        x = x1 if col == 0 else x2
        y = y0 + row * dy
        rows.append(
            f'<g transform="translate({x},{y})">'
            f'<path d="M0,-4 l7,7 M7,-4 l-7,7" stroke="{EDGE}" stroke-width="1.6" stroke-linecap="round"/>'
            f'<text x="16" y="0" font-family="{FONT}" font-size="13.5" font-weight="600" fill="{BRIGHT}">{what}</text>'
            f'<text x="16" y="15" font-family="{FONT}" font-size="10.5" fill="{DIM}">{why}</text>'
            f"</g>"
        )
    body = "\n".join(rows)
    sub = f"{n['rules']} binding rules. {n['hard']} of them cannot be skipped."

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="portfolio.me. What it refuses to do: no template, no stock photography, no badge service, no fabricated metric, no CDN in production, no silent degradation. {sub}">
<title>portfolio.me — the refusal list</title>
<style>
  .fil {{ animation: heat 4s ease-in-out infinite }}
  @keyframes heat {{ 0%,100% {{ opacity:.30 }} 50% {{ opacity:.85 }} }}
  @media (prefers-reduced-motion: reduce) {{ .fil {{ animation:none; opacity:.55 }} }}
</style>
<rect width="{W}" height="{H}" rx="14" fill="{INK}"/>
<rect x=".5" y=".5" width="{W-1}" height="{H-1}" rx="14" fill="none" stroke="{EDGE}" stroke-opacity=".28"/>

<text x="56" y="62" font-family="{FONT}" font-size="27" font-weight="700" fill="{BRIGHT}">portfolio<tspan fill="{EDGE}">.</tspan>me</text>
<text x="56" y="86" font-family="{FONT}" font-size="12.5" fill="{TEXT}">a person, interviewed and positioned, into a portfolio that is live</text>

<line class="fil" x1="56" y1="106" x2="{W-56}" y2="106" stroke="{EDGE}" stroke-width="1"/>

{body}

<line x1="56" y1="262" x2="{W-56}" y2="262" stroke="{DIM}" stroke-opacity=".3" stroke-width="1"/>
<text x="56" y="288" font-family="{FONT}" font-size="13" font-weight="600" fill="{TEXT}">{sub}</text>
<text x="56" y="308" font-family="{FONT}" font-size="10.5" fill="{DIM}">evidence · accessibility · reversible deploys · the final gate · identity</text>
</svg>
'''


def plate(num, name, hard=False):
    """A numbered rule plate. Machined metal, not a rounded pill."""
    label = f"§{num} {name}"
    fs, cw, pad, h = 12, 7.22, 13, 30
    notch = 7
    w = round(pad * 2 + len(label) * cw + (14 if hard else 0))
    accent = EDGE if hard else DIM
    fill = BRIGHT if hard else TEXT
    # a corner-notched plate: chamfer top-left and bottom-right
    d = (f"M{notch},0 H{w} V{h-notch} L{w-notch},{h} H0 V{notch} Z")
    lock = (f'<g transform="translate({w-20},{h/2-5})">'
            f'<rect x="0" y="3.4" width="9" height="6.6" rx="1.2" fill="{EDGE}"/>'
            f'<path d="M1.8,3.4 V2.2 a2.7,2.7 0 0 1 5.4,0 V3.4" fill="none" stroke="{EDGE}" stroke-width="1.25"/>'
            f"</g>") if hard else ""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{label}{' (cannot be skipped)' if hard else ''}">
<title>{label}{' — cannot be skipped' if hard else ''}</title>
<path d="{d}" fill="{INK}" stroke="{accent}" stroke-opacity="{'.85' if hard else '.4'}"/>
<text x="{pad}" y="{h/2 + fs*0.35:.1f}" font-family="{FONT}" font-size="{fs}" font-weight="{600 if hard else 500}" fill="{fill}">§{num} <tspan fill="{fill}">{name}</tspan></text>
{lock}
</svg>
'''


def pipeline(n):
    """The eight loops as a heating filament, gates as hard stops that break it."""
    W, H = 880, 150
    loops = ["bootstrap", "substance", "design", "copy",
             "build", "share", "deploy", "verify"]
    gates = {1: "A", 2: "B1·B2", 6: "C"}
    x0, x1 = 60, W - 60
    step = (x1 - x0) / (len(loops) - 1)
    y = 74

    seg, marks = [], []
    for i, name in enumerate(loops):
        x = x0 + i * step
        t = i / (len(loops) - 1)
        # filament heats along its length: dim ink to full edge
        seg.append(f'<stop offset="{t:.3f}" stop-color="{EDGE}" stop-opacity="{0.22 + 0.78*t:.2f}"/>')
        r = 5.5 if i in gates else 3.4
        marks.append(
            f'<circle cx="{x:.1f}" cy="{y}" r="{r}" fill="{INK}" stroke="{EDGE}" stroke-width="{1.6 if i in gates else 1}"/>'
        )
        if i in gates:
            marks.append(f'<circle cx="{x:.1f}" cy="{y}" r="2" fill="{EDGE}"/>')
            marks.append(f'<text x="{x:.1f}" y="{y-16}" text-anchor="middle" font-family="{FONT}" font-size="11" font-weight="700" fill="{EDGE}">{gates[i]}</text>')
        marks.append(f'<text x="{x:.1f}" y="{y+24}" text-anchor="middle" font-family="{FONT}" font-size="10.5" fill="{TEXT}">{name}</text>')
        marks.append(f'<text x="{x:.1f}" y="{y+37}" text-anchor="middle" font-family="{FONT}" font-size="9" fill="{DIM}">{i}</text>')

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="The pipeline: eight loops from bootstrap to verify, heating left to right. Human gates at A after substance, B1 and B2 during design, and C before deploy.">
<title>The pipeline — eight loops, four gates</title>
<defs><linearGradient id="fil" x1="0" x2="1">{''.join(seg)}</linearGradient></defs>
<rect width="{W}" height="{H}" rx="14" fill="{INK}"/>
<rect x=".5" y=".5" width="{W-1}" height="{H-1}" rx="14" fill="none" stroke="{EDGE}" stroke-opacity=".2"/>
<text x="60" y="34" font-family="{FONT}" font-size="12" font-weight="600" fill="{TEXT}">the pipeline <tspan fill="{DIM}">— cold at intake, white-hot at the gate that ships</tspan></text>
<line x1="{x0}" y1="{y}" x2="{x1}" y2="{y}" stroke="url(#fil)" stroke-width="2.2" stroke-linecap="round"/>
{''.join(marks)}
<text x="60" y="{H-14}" font-family="{FONT}" font-size="9.5" fill="{DIM}">▲ human decides · loop 8 re-run enters instead of 0</text>
</svg>
'''


RULE_PLATES = [
    (5, "evidence", True), (12, "accessible", True), (15, "reversible", True),
    (16, "gate C", True), (20, "identity", True),
    (1, "creativity"), (3, "reinvent"), (7, "work is hero"),
    (9, "own it"), (10, "generate it"), (13, "budget"), (18, "no silent skip"),
]


def build():
    n = counts()
    out = {
        "hero.svg": hero(n),
        "pipeline.svg": pipeline(n),
    }
    for entry in RULE_PLATES:
        num, name = entry[0], entry[1]
        hard = len(entry) > 2 and entry[2]
        out[f"rules/{num}.svg"] = plate(num, name, hard)
    return out


def main():
    check = "--check" in sys.argv[1:]
    stale = []
    for name, svg in build().items():
        path = os.path.join(OUT, name)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        cur = open(path, encoding="utf-8").read() if os.path.exists(path) else None
        if cur == svg:
            continue
        if check:
            stale.append(name)
        else:
            open(path, "w", encoding="utf-8").write(svg)
            print(f"  wrote  assets/{name}")
    if check and stale:
        print("stale: " + ", ".join(stale))
        print("run: python3 scripts/readme_art.py")
        sys.exit(1)
    print("readme art: up to date" if check else "readme art: written")


if __name__ == "__main__":
    main()
