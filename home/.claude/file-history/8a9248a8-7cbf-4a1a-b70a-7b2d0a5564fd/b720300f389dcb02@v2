#!/usr/bin/env python3
"""Pre-flight check for a forged portfolio, before Gate C.

Turns the mechanical half of the hard rules into a gate you can run. It does not
judge design, prose, or strategy — a human does that at the gate. It catches the
things that are true or false: a missing alt, a hotlinked CDN, an image that does
not resolve, a claim with no source.

    python3 scripts/preflight.py path/to/site           # a built directory
    python3 scripts/preflight.py path/to/index.html     # one file
    python3 scripts/preflight.py https://example.com    # a live URL
    python3 scripts/preflight.py <target> --check-urls  # also resolve every asset
    python3 scripts/preflight.py <target> --evidence runs/<slug>/EVIDENCE.md

Exit 0 = no failures (warnings allowed). Exit 1 = at least one failure.
"""
import sys, re, os, glob

# §9: a public endpoint going down should never take the site with it.
CDN_HOSTS = [
    "cdn.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com", "esm.sh",
    "skypack.dev", "fonts.googleapis.com", "fonts.gstatic.com",
    "ajax.googleapis.com", "code.jquery.com", "stackpath.bootstrapcdn.com",
]
# §10: generate your visuals. Never hotlink someone else's photograph.
STOCK_HOSTS = [
    "images.unsplash.com", "unsplash.com/photos", "pexels.com",
    "istockphoto.com", "shutterstock.com", "gettyimages.",
]
# §9 again, in its analytics form.
TRACKERS = [
    "google-analytics.com", "googletagmanager.com", "connect.facebook.net",
    "hotjar.com", "segment.com", "mixpanel.com",
]

SHELL_BUDGET = 100 * 1024   # §13


def load(src):
    if src.startswith("http"):
        from urllib.request import urlopen
        return urlopen(src, timeout=20).read().decode("utf-8", "replace")
    with open(src, encoding="utf-8") as f:
        return f.read()


def targets(src):
    """One (name, html) per page to check."""
    if src.startswith("http") or os.path.isfile(src):
        return [(src, load(src))]
    pages = sorted(glob.glob(os.path.join(src, "**", "*.html"), recursive=True))
    if not pages:
        print(f"no .html found under {src}")
        sys.exit(2)
    return [(p, load(p)) for p in pages]


def images(html):
    """(src, alt) for every image. alt=None means the attribute is absent."""
    out = []
    for m in re.finditer(r"<img\b[^>]*>", html, re.I):
        tag = m.group(0)
        s = (re.search(r'src\s*=\s*["\']([^"\']*)', tag, re.I) or [None, ""])[1]
        a = re.search(r'alt\s*=\s*["\']([^"\']*)', tag, re.I)
        out.append((s, a.group(1) if a else None))
    return out


def externals(html):
    """Every off-origin URL the page pulls at runtime."""
    pat = r'(?:src|href)\s*=\s*["\'](https?://[^"\']+)'
    return re.findall(pat, html, re.I)


def check(name, html, opts):
    fails, warns, oks = [], [], []
    imgs = images(html)

    # §12 — alt text on every image
    missing = [s for s, a in imgs if a is None]
    empty_alt = [s for s, a in imgs if a is not None and not a.strip()]
    if missing:
        fails.append(f"{len(missing)} image(s) with no alt attribute: "
                     + ", ".join(os.path.basename(s or "?") for s in missing[:4]))
    elif imgs:
        note = f" ({len(empty_alt)} decorative)" if empty_alt else ""
        oks.append(f"alt text on all {len(imgs)} images{note}")

    # §12 — a designed reduced-motion state, not `animation: none`
    if re.search(r"@keyframes|animation\s*:|transition\s*:", html, re.I):
        if "prefers-reduced-motion" in html:
            oks.append("animation carries a prefers-reduced-motion state")
        else:
            fails.append("animation with no prefers-reduced-motion state (§12)")

    # §12 — language, and RTL where §17 applies
    if not re.search(r"<html[^>]*\blang\s*=", html, re.I):
        fails.append("<html> has no lang attribute (§12)")
    else:
        oks.append("lang declared")

    # §9 — nothing loaded from a CDN in production
    ext = externals(html)
    cdn = [u for u in ext if any(h in u for h in CDN_HOSTS)]
    if cdn:
        fails.append(f"{len(cdn)} CDN asset(s) — vendor and self-host (§9): "
                     + ", ".join(sorted({u.split('/')[2] for u in cdn})[:3]))
    else:
        oks.append("no CDN assets — everything self-hosted")

    # §10 — no hotlinked stock
    stock = [u for u in ext if any(h in u for h in STOCK_HOSTS)]
    if stock:
        fails.append(f"{len(stock)} hotlinked stock image(s) (§10)")

    # §9 — no third-party analytics by default
    track = [u for u in ext if any(h in u for h in TRACKERS)]
    if track:
        warns.append(f"{len(track)} third-party tracker(s) — confirm the subject "
                     f"asked for this (§9): "
                     + ", ".join(sorted({u.split('/')[2] for u in track})[:3]))

    # §5 — share layer, since an unfurl is the first impression
    if not re.search(r'property\s*=\s*["\']og:image', html, re.I):
        warns.append("no og:image — the link unfurls as a gray box (loop 5)")
    else:
        og = re.search(r'property\s*=\s*["\']og:image["\'][^>]*content\s*=\s*["\']([^"\']+)', html, re.I)
        if og and not og.group(1).startswith("http"):
            fails.append("og:image is a relative URL — unfurls fail silently")
        else:
            oks.append("og:image present and absolute")

    # §19 — attribution marker (informational; removable by design)
    if "forged-with: portfolio.me" in html:
        oks.append("attribution marker present")
    else:
        warns.append("no 'forged-with: portfolio.me' marker (fine if the human "
                     "removed the credit by hand)")

    # §13 — shell budget, local files only
    if not name.startswith("http") and os.path.isfile(name):
        size = os.path.getsize(name)
        css = sum(os.path.getsize(f) for f in
                  glob.glob(os.path.join(os.path.dirname(name), "**", "*.css"),
                            recursive=True))
        shell = size + css
        if shell > SHELL_BUDGET:
            warns.append(f"shell is {shell/1024:.0f}KB over the 100KB budget "
                         f"(§13) — confirm the heavy layer is deferred")
        else:
            oks.append(f"shell {shell/1024:.0f}KB, inside the 100KB budget")

    # --check-urls: every asset actually resolves
    if opts["check_urls"]:
        from urllib.request import Request, urlopen
        bad = []
        for u in {u for u in ext}:
            try:
                urlopen(Request(u, method="HEAD"), timeout=15)
            except Exception:
                bad.append(u)
        if bad:
            fails.append(f"{len(bad)} URL(s) did not resolve: "
                         + ", ".join(b.split("/")[2] for b in bad[:4]))
        elif ext:
            oks.append(f"all {len(ext)} external URLs resolve")

    return fails, warns, oks


def evidence_check(path, pages):
    """§5 — every number on the site should appear in EVIDENCE.md."""
    if not os.path.exists(path):
        return [f"evidence file not found: {path}"], [], []
    ev = load(path)
    text = " ".join(re.sub(r"<[^>]+>", " ", h) for _, h in pages)
    nums = set(re.findall(r"\b\d[\d,]*(?:\.\d+)?\s*(?:%|x|K|M|B)?\b", text))
    nums = {n.strip() for n in nums if len(n.strip()) > 2}   # skip 1-2 digit noise
    unsourced = sorted(n for n in nums if n not in ev)[:6]
    if unsourced:
        return [], [f"{len(unsourced)} figure(s) on the site not found in "
                    f"EVIDENCE.md — verify each traces to a source (§5): "
                    + ", ".join(unsourced)], []
    return [], [], ["every figure on the site appears in EVIDENCE.md"]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        print(__doc__)
        sys.exit(2)
    opts = {"check_urls": "--check-urls" in sys.argv}
    ev_path = None
    if "--evidence" in sys.argv:
        ev_path = sys.argv[sys.argv.index("--evidence") + 1]

    pages = targets(args[0])
    total_f, total_w = 0, 0

    for name, html in pages:
        label = name if len(pages) == 1 else os.path.relpath(name, args[0])
        f, w, o = check(name, html, opts)
        if len(pages) > 1:
            print(f"\n{label}")
        for x in o:
            print(f"  ok    {x}")
        for x in w:
            print(f"  warn  {x}")
        for x in f:
            print(f"  FAIL  {x}")
        total_f += len(f)
        total_w += len(w)

    if ev_path:
        f, w, o = evidence_check(ev_path, pages)
        print()
        for x in o:
            print(f"  ok    {x}")
        for x in w:
            print(f"  warn  {x}")
        for x in f:
            print(f"  FAIL  {x}")
        total_f += len(f)
        total_w += len(w)

    print()
    if total_f:
        print(f"pre-flight: {total_f} failure(s), {total_w} warning(s). "
              f"Fix before Gate C.")
        sys.exit(1)
    print(f"pre-flight: passed ({total_w} warning(s)).")
    print("This checks what a machine can check. The design, the prose, and "
          "whether it is true are the human's call at the gate.")


if __name__ == "__main__":
    main()
