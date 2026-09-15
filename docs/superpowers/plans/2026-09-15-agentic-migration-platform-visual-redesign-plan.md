# Agentic Migration Platform Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the repetitive 18-slide PFE deck with a visually distinctive Migration Control Plane presentation that is factual, readable and verified in PowerPoint.

**Architecture:** Build each slide as a 1600×900 SVG composition using shared visual primitives, then place each composition as a full-slide image in a PPTX while retaining speaker notes and a clean slide structure. Keep narrative, architecture, evidence and review work on chained Git branches so every part has an auditable commit.

**Tech Stack:** Node.js ES modules, PptxGenJS already used by the repository, inline SVG composition, PowerPoint COM export for render verification, Git worktrees, Codex Slides project/brand system as the design workspace.

**Spec:** `docs/superpowers/specs/2026-09-15-agentic-migration-platform-visual-redesign-design.md`

## Global Constraints

- Exactly 18 slides, 16:9, with slide 2 immediately after the cover.
- Slides 3–18 show the seven-chapter progress route and highlight the active chapter.
- Visible copy is French except for the product name and technical identifiers.
- Use anonymised wording: “un grand client aérien” and “d’autres grands comptes”.
- Java evidence: Spring Boot 2.1 → 2.7 → 3.5 → 4.0, Java 11/17/21, Maven/OpenRewrite.
- Angular evidence: 18 → 19 and 19 → 20 sealed; 20 → 21 prepared/not started.
- Evidence must retain the scope: 607 backend tests passed, 4 skipped; frontend checks passed; baseline 12 → 11 failures after integration; no global benchmark claim.
- Do not claim delivered authentication/roles, common CI, complete Angular coverage or consolidated cost/duration.
- Use the existing demo screenshots only with the local/anonymised/prepared-state disclosure.
- Run `mark_artifact_operation_started.mjs` immediately before the first PPTX authoring build command.
- Render all 18 slides in PowerPoint and inspect visual output before claiming completion.

---

### Task 1: Establish the visual redesign foundation

**Branch:** `deck/redesign-foundation`

**Files:**
- Create: `docs/superpowers/specs/2026-09-15-agentic-migration-platform-visual-redesign-design.md`
- Create: `docs/superpowers/plans/2026-09-15-agentic-migration-platform-visual-redesign-plan.md`
- Modify: `DESIGN.md`
- Create: `docs/presentation/redesign-audit.md`

**Interfaces:**
- Produces the visual tokens, slide composition contract, content guardrails,
  QA gate and branch contract consumed by Tasks 2–5.

- [ ] **Step 1: Record the audit in `docs/presentation/redesign-audit.md`**

  Capture the current deck's verified weaknesses: repeated top-tracker plus
  card layout, underpowered story slides, box-and-arrow architecture, generic
  agent/results cards, weak evidence framing and repetitive footer treatment.
  Map each weakness to the new composition that replaces it.

- [ ] **Step 2: Replace `DESIGN.md` with the Migration Control Plane system**

  Include palette, type scale, grid, route indicator, diagram grammar, icon
  and screenshot rules, light evidence treatment and technical-slide rules.
  Explicitly ban decorative AI imagery, glow and card-grid repetition.

- [ ] **Step 3: Commit the foundation documents**

  Run `git add DESIGN.md docs/presentation/redesign-audit.md docs/superpowers`
  and commit with `docs: define migration control plane redesign`.

- [ ] **Step 4: Verify the foundation branch**

  Run `git status --short --branch` and `rg -n "2027|607|12.*11|20.*21|anonym|18.*19" DESIGN.md docs/superpowers docs/presentation`. Expected: the branch contains only the intended design documents and the guardrail terms are present.

### Task 2: Build the narrative foundation and slides 1–5

**Branch:** `deck/redesign-narrative` cut from `deck/redesign-foundation`

**Files:**
- Create: `scripts/redesign/theme.mjs`
- Create: `scripts/redesign/svg.mjs`
- Create: `scripts/redesign/notes.mjs`
- Create: `scripts/build-redesign-deck.mjs`
- Modify: `docs/presentation/storyboard-18-slides.md` only if a wording correction is needed

**Interfaces:**
- `theme.mjs` exports `COLORS`, `FONTS`, `W`, `H`, `chapters`, `chapterIndex`.
- `svg.mjs` exports `svgDocument`, `text`, `line`, `rect`, `circle`, `path`,
  `image`, `routeHeader`, `footer`, `wrapText` and `escapeXml`.
- `notes.mjs` exports `speakerNotes(slideNumber)` with source and disclosure
  strings for every slide.
- `build-redesign-deck.mjs` consumes the shared helpers and emits exactly 18
  slides, with slides 1–5 implemented in this task and explicit placeholders
  for slides 6–18 until later branches complete them.

- [ ] **Step 1: Add a testable token and SVG helper module**

  Keep all geometry in 1600×900 coordinates. Make text wrapping deterministic,
  escape XML, support embedded PNG data URIs, and ensure every dark/light slide
  can render the route header with a distinct active chapter.

- [ ] **Step 2: Implement slides 1–2 as non-repetitive hero compositions**

  Slide 1 uses the large title left and a migration rail on the right. Slide 2
  uses a seven-stop chapter route map and does not repeat the full 18-slide
  agenda.

- [ ] **Step 3: Implement slides 3–5 as story compositions**

  Slide 3 makes `2027` the focal point in a five-stage story route. Slide 4
  shows Run and Migrate rails converging on one team and a continuity gate.
  Slide 5 turns prompts → practices → factory into a stepped transformation,
  then separates demonstrated scope from target vision.

- [ ] **Step 4: Add notes and build a private draft**

  Before the first PPTX authoring command, run from the presentations skill
  directory:

  ```powershell
  node container_tools/mark_artifact_operation_started.mjs --operation-kind edit --expected-output-count 1 --output-format pptx
  ```

  Then run `node scripts/build-redesign-deck.mjs` and confirm the output is an
  18-slide PPTX with no missing assets.

- [ ] **Step 5: Commit narrative work**

  Run `git add scripts docs/presentation` and commit with
  `feat: rebuild narrative slides with migration rail`.

### Task 3: Build architecture and realization slides 6–12

**Branch:** `deck/redesign-architecture` cut from `deck/redesign-narrative`

**Files:**
- Modify: `scripts/build-redesign-deck.mjs`
- Modify: `scripts/redesign/svg.mjs` only for reusable diagram primitives
- Create: `docs/presentation/architecture-redesign-review.md`

**Interfaces:**
- Consumes the shared theme/SVG/note helpers from Task 2.
- Produces the final slide compositions for slides 6–12 without changing the
  public slide count or source guardrails.

- [ ] **Step 1: Replace functional architecture with a layered control diagram**

  Show human gates and evidence boundary explicitly. Keep the primary flow to
  at most seven nodes and distinguish agents from deterministic services.

- [ ] **Step 2: Replace technical architecture with dual pipelines**

  Show Java/Maven/OpenRewrite and Angular/Node/npm/CLI/TypeScript tracks on a
  common governance spine; retain differences in status and toolchain.

- [ ] **Step 3: Replace the workflow with a state/gate/proof rail**

  Use qualification, analysis, plan, transformation, validation, repair and
  sealing as a single readable route; show gates as checkpoint diamonds or
  vertical cuts, not as random arrow-connected boxes.

- [ ] **Step 4: Build Java, Angular and agent slides with status language**

  Use a large Java version line, a sealed/prepared Angular evidence line and a
  constellation around the orchestrator. Keep “réalisé”, “partiel” and “prévu” visible as labels, not color-only signals.

- [ ] **Step 5: Build the human-centred repair loop**

  Separate proposal, review, decision, isolated application and revalidation;
  make the human decision the focal point and show bounded attempts.

- [ ] **Step 6: Commit architecture work**

  Run the slide-count and source-string checks, then commit with
  `feat: rebuild architecture and governed repair visuals`.

### Task 4: Build demo, evidence, limits and close slides 13–18

**Branch:** `deck/redesign-evidence` cut from `deck/redesign-architecture`

**Files:**
- Modify: `scripts/build-redesign-deck.mjs`
- Modify: `scripts/redesign/notes.mjs`
- Create: `docs/presentation/evidence-redesign-review.md`
- Create or replace: `dist/Agentic-Migration-Platform-Soutenance-Redesigned.pptx`

**Interfaces:**
- Consumes the slide renderer and notes interfaces from prior tasks.
- Produces the named redesigned PPTX and a source-backed evidence composition.

- [ ] **Step 1: Build the demo proof board**

  Use `assets/presentation/angular-g10-repair.png` as the dominant image, with
  no more than two annotations and the required anonymised/prepared-state
  disclosure. Mention the Java repair route only as a secondary cue.

- [ ] **Step 2: Build the evidence wall**

  Use the light evidence background and exact scope labels. Show 607 passed / 4
  skipped, frontend validation checks, and 12 → 11 baseline failures without
  turning them into a benchmark dashboard.

- [ ] **Step 3: Build difficulties, limits, conclusion and Q&A**

  Use a causal difficulty→response matrix, a now→next horizon map, a strong
  conclusion synthesis and a minimal Q&A canvas. Do not add new claims.

- [ ] **Step 4: Build the complete private PPTX**

  Run the build once all slides are implemented. Verify exactly 18 slides, the
  presence of speaker notes, both demo screenshot assets and the redesigned
  output path.

- [ ] **Step 5: Commit evidence and the draft artifact**

  Commit with `feat: complete demo evidence and conclusion slides`.

### Task 5: Render, inspect and refine the final deck

**Branch:** `deck/redesign-review` cut from `deck/redesign-evidence`

**Files:**
- Modify: `scripts/build-redesign-deck.mjs` or `scripts/redesign/*.mjs` only for
  verified visual issues
- Create: `docs/presentation/redesign-qa.md`
- Modify: `dist/Agentic-Migration-Platform-Soutenance-Redesigned.pptx`

**Interfaces:**
- Consumes the complete draft artifact from Task 4.
- Produces a verified 18-slide PPTX and a QA record with render evidence.

- [ ] **Step 1: Run syntax and package checks**

  Run `node --check scripts/build-redesign-deck.mjs`,
  `node --check scripts/redesign/theme.mjs`,
  `node --check scripts/redesign/svg.mjs`, and the presentation package
  integrity/layout inspection scripts available in the presentations skill.

- [ ] **Step 2: Render every slide through PowerPoint**

  Open the exact PPTX with PowerPoint COM, assert 18 slides, export every slide
  as PNG to a temporary directory and create a contact sheet. Do not use the
  contact sheet as the only check: inspect slides 1, 3, 4, 6, 8, 9, 10, 12,
  13, 14, 16, 17 and 18 at full size.

- [ ] **Step 3: Apply a focused visual refinement pass**

  Fix only observed issues: clipped text, insufficient contrast, tiny labels,
  awkward route spacing, screenshot crop, repeated focal hierarchy or status
  ambiguity. Rebuild and rerender after every group of related fixes.

- [ ] **Step 4: Complete the QA record**

  Record slide count, render directory, checked slide numbers, source guardrail
  checks and any remaining limitation. Confirm the deck contains no client
  names, invented metrics or false Angular completion claim.

- [ ] **Step 5: Commit final visual QA**

  Commit with `fix: refine redesigned deck after PowerPoint review`.

## Final handoff

After all tasks pass, push `deck/redesign-review`, create a PR against `main`,
and report the final PPTX path, branch, commit list and any Codex Slides
Browser-verification limitation. Do not delete the previous deck or the
untracked `tmp/` source clone.
