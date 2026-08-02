<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=PIIIX&fontSize=68&fontAlignY=36&fontColor=ffffff&desc=Open-source%20company%20finding%20the%20gaps%20left%20in%20finished%20markets&descAlignY=58&descSize=17&animation=fadeIn" width="100%"/>

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=20&pause=1200&center=true&vCenter=true&width=720&color=6C63FF&lines=We+find+the+gap+a+finished+market+left+behind.;We+ship+the+fix+in+the+open.;Built+by+our+team+and+contributors+who+earn+it." alt="Typing SVG" />

Named for Earth's own coordinates, Planet III of star X, chosen so the
target stays bigger than next quarter.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/PIIIX-org/chapters/blob/main/LICENSE)
[![Contributing](https://img.shields.io/badge/contributing-guide-brightgreen.svg)](https://github.com/PIIIX-org/.github/blob/main/CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://github.com/PIIIX-org/chapters)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://github.com/PIIIX-org/chapters)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://github.com/PIIIX-org/chapters)

</div>

---

## What we do

We find where a mature category still has a real gap, then ship the fix in
the open, in code, with AI built into how the product works. Our own team
builds it. So do outside contributors who earn the access.

Note-taking, design tooling, knowledge management: categories most people
treat as solved. We keep finding the part incumbents leave broken, and
ship the fix as a real, running product.

## Products

### Chapters
A self-hostable knowledge base: markdown notes, a knowledge graph AI
agents can query and edit through MCP with full tool parity. Real-time
multiplayer editing runs on Yjs, with per-operation permission checks and
instant revocation. Hybrid keyword and semantic search runs permission-
filtered, in-query. Export is a first-class feature: zip exports, expiring
share links, full-instance backup and restore.

**Why we built it.** Most knowledge tools bolt AI on top, a chat window
pointed at your notes after the fact. We wanted AI access built into the
data layer itself, so an agent navigates the actual graph instead of
guessing from a prompt. That became the single governing criterion for
every stack decision that followed: how well it serves AI navigability.

**How we build it.** TypeScript end to end: one language, one runtime, one
deployable unit. Fastify for the API. Yjs and Hocuspocus run the realtime
CRDT relay in the same process as the API, because MCP writes need to
flow through that relay as first-class participants with per-operation
permission checks. Postgres holds accounts, sessions, and the search
index; notes stay plain markdown files on disk. Embeddings run locally
through Transformers.js, so note content never leaves the instance. We
seriously considered a Python/FastAPI backend for its graph and embedding
libraries, then rejected it: those advantages are batch-shaped and
invisible to an AI reading the graph, and the cost was two runtimes to
deploy plus a security-critical CRDT relay rebuilt on a less mature
library. The UI is next.
→ [github.com/PIIIX-org/chapters](https://github.com/PIIIX-org/chapters)

### Vectory
A canvas you design on that writes real, production-ready HTML and CSS as
you build, with a live preview and an inspectable code panel over the
output. Built for designers who want to ship a real site without becoming
developers, and for developers who want a faster prototyping loop.

**Why we're investigating it.** The AI design-tool market looks crowded
at a glance: Onlook covers canvas UX and AI codegen for React, Anthropic
ships its own code-powered prototyping tool on its flagship model,
Lovable raised $330M proving how large the category already is. Static
marketing-site HTML and CSS, built from a Figma-style canvas as the entry
point, was still open. Before writing a line of product code, we ran the
research to check whether that gap was real.

**How we build it.** Research first: a multi-agent research harness ran
five parallel search angles across fifteen sources, with every claim
adversarially re-verified across three independent passes before it
counted as fact. Twelve architecture diagrams map the full system ahead
of implementation: the client/server split, the codegen pipeline, the
data model, real-time sync. The plan underneath it: a designer places
shapes, text, and images on a canvas, and an LLM turns that canvas state
into semantic, exportable HTML and CSS as they work, with a live preview
pane that keeps the generated code visible and editable throughout.

Currently in the architecture and competitive-research stage.
→ [github.com/PIIIX-org/vectory](https://github.com/PIIIX-org/vectory)

### Yildizim
A closed-source, gamified 3D visualization layer for hosted Chapters: a
galaxy where every star is a note, built so a personal knowledge graph
feels explorable. Shipped and running today, inside Chapters.

**Why we built it.** A knowledge graph with hundreds of thousands of
notes is hard to browse as a list or a flat map. We wanted exploring your
own notes to feel like discovery: a 3D space you fly through, gamified
enough that returning to your own knowledge base is something you want
to do, not a chore.

**How we build it.** A real-time 3D renderer holding 60 frames per second
at 371,000 notes. Development runs in research-backed phases rather than
one large redesign: audio, color palette, camera rotation, depth of
field, minimap, polish, each phase shipped and merged as its own reviewed
pull request. 37 pull requests in, and running live inside Chapters
today.

## How we're organized

Every role maps to real GitHub access, not a title:

| Role | Access | What they do |
|---|---|---|
| Manager | Maintain | Repo settings, branch protection, merges |
| Developer | Write | Pushes code, opens and merges pull requests |
| Reviewer | Triage | Reviews pull requests, triages issues |
| Designer | Write | Pushes UI and asset pull requests |
| Docs/Content | Write | Pushes docs and README changes |
| Community/Support | Triage | Labels and triages issues, helps other contributors |

These roles aren't handed out at the start. A contributor forks the repo,
opens a pull request, and earns a role from there.

## How we work

Fork a repo. Open a pull request. Sign the CLA in a comment on that PR.
Contribute well and you earn write access, with the exact bar for each
role spelled out in
[CONTRIBUTING.md](https://github.com/PIIIX-org/.github/blob/main/CONTRIBUTING.md).
A pull request doesn't merge without a passing CLA check.

## Hiring and partnerships

Look at Chapters and Vectory directly before you take our word for
anything. The architecture choices and the commit history say what this
team can do.

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer" width="100%"/>
</div>
