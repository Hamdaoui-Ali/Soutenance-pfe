# Agentic Migration Platform — Visual Redesign Design Spec

## Objective

Rebuild the 18-slide PFE defense deck as a premium, technical and academic
visual narrative. The redesign must feel intentionally composed rather than
template-generated and must make the governing idea visible: migration is a
controlled route from legacy state to modern, evidenced state.

The deck replaces the current repeated card layout. It keeps the approved
story, the factual guardrails and the 18-slide limit. It may use full-slide
vector artwork and rasterized composition when that materially improves the
rendered result; visual quality has priority over editability for this pass.

## Audience and language

- Jury mixte: software engineers, cloud/architecture reviewers and non-
  specialist academic examiners.
- Visible slide copy: French, concise, with English product name and technical
  identifiers preserved exactly.
- Speaker notes: source pages, demo disclosure and factual caveats.

## Narrative spine

1. Start with the anonymous airline-client story and the 2027 cloud horizon.
2. Make the operational tension visible: production continuity and migration
   compete for the same engineering capacity.
3. Show why prompts and individual practices do not scale, then introduce the
   Migration Factory.
4. Explain the separation between agents, deterministic tools, human gates and
   evidence before showing implementation tracks.
5. Use the demo as a decision-and-proof moment, not as a product tour.
6. Close with point-in-time evidence, explicit limits and the principle that
   agents propose while people and deterministic controls retain authority.

## Slide-level composition contract

| Slide | Composition | Dominant visual | Focal message |
|---:|---|---|---|
| 1 | Minimal dark hero with route rail | Legacy → control plane → evidence → modern | A migration becomes a governed, verifiable route |
| 2 | Large chapter route map | Seven-stop metro line | The defense follows a single narrative path |
| 3 | Story timeline with oversized year | Airline objective → Azure → legacy portfolio | Cloud ambition creates a migration-scale problem |
| 4 | Split operational rails | Run / Migrate competing for one team | Availability pressure leaves little migration capacity |
| 5 | Stepped transformation | Prompts → practices → Migration Factory | Industrialization is the response to scale |
| 6 | Layered functional architecture | Human gates across orchestration, agents, tools, evidence | Responsibility boundaries make automation governable |
| 7 | Dual technical pipelines | Java and Angular tracks on a common spine | Toolchains differ; governance contracts remain shared |
| 8 | Full-width workflow | States, gates and proof checkpoints | Every transition is inspectable and revalidated |
| 9 | Technical evolution line | Spring Boot and Java versions | Java is the reference migration path |
| 10 | Evidence line with status language | Angular 18→19→20 and prepared 20→21 | Angular coverage is progressive, not complete |
| 11 | Agent constellation | Specialised agents around an orchestrator | Agents produce bounded artefacts and proposals |
| 12 | Human-centred repair loop | Failure → proposal → review → isolated apply → revalidation | Repair stays controlled and reversible |
| 13 | Demo proof board | One dominant annotated screenshot | The user decides from visible evidence |
| 14 | Evidence wall, light background | Exact result snippets with scope labels | Evidence exists without an invented benchmark |
| 15 | Causal matrix | Difficulty → architectural response | Constraints became engineering invariants |
| 16 | Horizon map | Current boundary → next industrialisation steps | The prototype is governed but not production-complete |
| 17 | Dark synthesis hero | Reasoning / control / evidence chain | Governance is the product principle |
| 18 | Minimal Q&A canvas | Quiet continuation of the migration rail | Leave visual space for discussion |

## Visual identity

### Migration Control Plane

The deck uses a dark graphite field for story, architecture and synthesis, with
three quiet light evidence slides for contrast. A continuous migration rail
appears as a hairline, route or checkpoint motif. It is structural, not
decorative: it represents state, gate and proof.

- Cyan: agent reasoning, proposed action or active route.
- Electric blue: deterministic service, toolchain or execution.
- Amber: human gate, review or decision.
- Mint: validated evidence and sealed artefact.
- Coral: blocked validation or repair request only.
- Warm ivory: evidence-board background, never a third competing theme.

Use flat geometry, thin rules, careful scale and whitespace. Avoid glow,
heavy gradients, robot imagery, stock photos and decorative code walls.

## Navigation

Slide 2 shows all seven chapters as a route map. Slides 3–18 show the same
small top route: `Contexte → Solution → Architecture → Réalisation → Démo →
Résultats → Conclusion`. The active chapter uses the accent and a thin active
rule; completed chapters are muted/mint; remaining chapters are desaturated.
The indicator must stay under 8% of slide height and never compete with the
main composition.

## Content guardrails

- Say “un grand client aérien” and “d’autres grands comptes”; do not expose
  client names or confidential CGI details.
- Present the deck/demo as an anonymised fictional representation of the
  general logic of the confidential project.
- Show Java/Spring Boot as the most mature path: Spring Boot 2.1 → 2.7 → 3.5
  → 4.0 with Java 11/17/21, Maven and OpenRewrite.
- Show Angular 18 → 19 and 19 → 20 as sealed; 20 → 21 as prepared/not started.
  Never claim an Angular 11 → 21 migration.
- Keep exact evidence scoped: 607 backend tests passed, 4 skipped; frontend
  type/static/conformance/build checks passed; frontend baseline 12 → 11
  failures after integration. Label these point-in-time evidence, not a
  benchmark or global speedup.
- Keep missing authentication/roles, manual benchmark, common CI and
  consolidated cost/duration as limits or perspectives.

## Rendering and QA requirements

- 16:9, 13.333 × 7.5 inches, 1600 × 900 design canvas.
- Main title at least 32 pt equivalent; body text at least 17 pt equivalent;
  slide titles should normally fit on one line or two short lines.
- One focal point per slide and one dominant composition, not a grid of equal
  cards.
- Every structural diagram has one reading direction, no crossed connectors,
  and at most seven primary nodes.
- Render every slide through PowerPoint after generation and inspect a contact
  sheet plus representative full-size slides. Fix overflow, weak contrast,
  tiny labels, repetitive composition and misleading status language before
  delivery.
- Deliver one final PPTX with presenter notes and keep the previous deck
  recoverable in Git history.

## Branch and commit contract

The work is implemented through these branches, each cut from the previous
branch and pushed for review when the deck is ready:

1. `deck/redesign-foundation`: this spec, plan and DESIGN.md.
2. `deck/redesign-narrative`: shared SVG/PPTX helpers and slides 1–5.
3. `deck/redesign-architecture`: slides 6–12 and architecture diagrams.
4. `deck/redesign-evidence`: slides 13–18, notes and final output assembly.
5. `deck/redesign-review`: rendered QA fixes and final verification record.

Each branch ends with focused commits. No unrelated files from `tmp/` are
removed or rewritten.
