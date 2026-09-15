# Agentic Migration Platform Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce an editable, source-grounded PowerPoint presentation of exactly 18 slides for the Agentic Migration Platform PFE defense.

**Architecture:** Use a Browser-first Codex Slides project as the durable presentation workspace. Feed it the approved storyboard, design system, report and evidence map; use native PowerPoint objects for diagrams, workflows and progress indicators, and verified screenshots only for the demo evidence. Keep a local exported .pptx in the repository and version every content or visual correction in its own commit.

**Tech Stack:** Codex Slides Browser workspace, Codex Slides MCP tools, PowerPoint editable shapes and speaker notes, PDF report, local demo frontend, Git.

**Spec:** docs/superpowers/specs/2026-09-15-agentic-migration-platform-deck-design.md

## Global Constraints

- The final deck contains exactly 18 slides; no appendix is added without explicit approval.
- Slide 1 is the title and slide 2 is immediately the plan.
- Slides 3–18 show Contexte → Solution → Architecture → Réalisation → Démo → Résultats → Conclusion at the top, with the current chapter highlighted and remaining chapters visible.
- The opening is a story: cloud-scale migration need → production/migration tension → manual practices and prompts do not scale → Migration Factory.
- Use “un grand client aérien” and “d’autres grands comptes” on slides by default; do not expose client names or precise program details without explicit authorization.
- Present Java/Spring Boot as the most mature reference path: Spring Boot 2.1→2.7→3.5→4.0 with Java 11/17/21.
- Present Angular accurately: 18→19 and 19→20 are sealed proofs; 20→21 is prepared but not started; 11→21 is not demonstrated.
- Present the Java test campaign as 607 backend tests passed and 4 skipped, and frontend baseline evidence as 12→11 failures after integration; label these point-in-time evidence, not a benchmark.
- The demo is local, deterministic, anonymized and based on prepared states; it is not the protected CGI backend and does not execute Maven, npm, Azure or protected source code.
- Agents propose and reason; deterministic services execute and verify; human gates authorize sensitive changes.
- Use the palette, typography, spacing, diagram, icon and screenshot rules in DESIGN.md.
- Keep body text at 17 pt or larger, titles at 32 pt or larger, and use no more than three visual groups per slide.
- Do not invent metrics, security capabilities, authentication, roles, CI coverage, benchmark results or completed future work.
- Do not commit files from tmp/ or other disposable audit/render directories.

---

## File and workspace map

| Path or workspace | Responsibility | Change policy |
|---|---|---|
| DESIGN.md | Visual system and technical-slide rules. | Existing source of truth; modify only when a verified deck issue requires a rule change. |
| docs/presentation/storyboard-18-slides.md | Slide order, messages, visuals, risks and narrative guardrails. | Update when the approved story changes; commit each update separately. |
| docs/presentation/source-map.md | Slide-by-slide evidence, claim status and presenter-note sources. | Create before deck generation; commit separately. |
| docs/superpowers/specs/2026-09-15-agentic-migration-platform-deck-design.md | Approved architecture, privacy rules and verification contract. | Update only when a design decision changes; commit separately. |
| Codex Slides project | Durable outline, design files, brand system, slides and speaker notes. | Keep Browser workspace open; use the project as the canonical editing surface. |
| tmp/presentation-assets/ | Disposable normalized screenshots and render previews. | Never commit. |
| Agentic-Migration-Platform-Soutenance.pptx | Final editable export in the repository root. | Commit the first complete export and each later export separately. |

## Slide production contract

The following content is fixed before generation:

1. Agentic Migration Platform — governed migration from legacy to modern.
2. Plan de présentation — seven narrative chapters.
3. Le déclencheur : une migration cloud à grande échelle — an anonymized large-airline cloud context creates the need.
4. La réalité opérationnelle : maintenir et migrer en parallèle — production continuity competes with manual migration work.
5. Du besoin à la Migration Factory : objectifs et vision — individual prompts evolve into a multi-agent platform; future stacks are labeled vision cible.
6. Architecture fonctionnelle — agents, deterministic services, human gates and evidence.
7. Architecture technique — shared governance contracts with separate Java and Angular toolchains.
8. Workflow complet de migration — qualification through sealing and revalidation.
9. Axe 1 — Java / Spring Boot — reference maturity and toolchain.
10. Axe 2 — Angular — sealed 18→19 and 19→20 proofs, 20→21 prepared.
11. Gouvernance et rôles des agents IA — specialized agents do not hold final authority.
12. Réparation gouvernée — failure, proposal, review, human decision, isolated application and revalidation.
13. Démo : scénario utilisateur — inspect an Angular G10 repair proposal and decision; disclose prepared local state.
14. Résultats et preuves — verified point-in-time evidence without a global speed claim.
15. Difficultés rencontrées et apports techniques — representative problems mapped to architectural corrections.
16. Limites et perspectives — current limits separated from target improvements.
17. Conclusion — Reasoning · Control · Evidence.
18. Questions / Discussion — no new claims.

## Task 1: Create the evidence map

**Files:**
- Create: docs/presentation/source-map.md
- Read: Rapport_Pfe_2026_main__3_.pdf
- Read: docs/presentation/storyboard-18-slides.md
- Read: DESIGN.md

**Interfaces:**
- Consumes: the approved 18-slide storyboard and the report/demo audit.
- Produces: one source-of-truth table used when writing slide text and speaker notes.

- [ ] **Step 1: Write the source map with one row per slide.**

Use these source assignments and claim statuses:

| Slides | Primary source | Evidence status to record |
|---|---|---|
| 1–2 | Approved storyboard and title context | Narrative framing; no quantitative claim. |
| 3–4 | Report pp. 14–22 plus the approved project-owner narrative | Context supplied for the defense; anonymize client and program details. |
| 5 | Report pp. 22, 41–51, 84–85 | Current demonstrated scope versus target vision. |
| 6–8 | Report pp. 41–51 and pp. 52–65 | Hybrid architecture, separate toolchains, governed workflow. |
| 9 | Report pp. 52–64 and 70–79 | Java reference path; label maturity and planned items accurately. |
| 10 | Report pp. 53–55, 65–66 and 70–79; demo source-reference matrix | 18→19 and 19→20 sealed; 20→21 prepared/not started. |
| 11–12 | Report pp. 43–51 and 61–65; demo source-reference matrix | Agent boundaries, gates, checksum and governed repair. |
| 13 | docs/DEMO-RECORDING.md, demo routes and docs/architecture/source-reference-matrix.md | Local presenter state, prepared evidence, not protected backend execution. |
| 14 | Report pp. 66 and 70–81 | 607 passed/4 skipped, frontend checks, Angular seals; point-in-time evidence. |
| 15 | Report pp. 65 and 81–84 | Four representative problem→correction pairs. |
| 16 | Report pp. 82–85 | No auth/roles, no common CI, incomplete Angular, incomplete metrics/benchmark. |
| 17–18 | Report pp. 84–85 and approved narrative | Principle and discussion only; no new claim. |

For every row, include: slide number, message, source page/file, claim status, visible disclosure, and speaker-note detail. Mark each item Réalisé, Partiel, Prévu, Non mesuré or Narratif.

- [ ] **Step 2: Run the source-map checks.**

Run:

~~~powershell
rg -n "607|4 ignor|12.*11|18.*19|19.*20|20.*21|Prévu|Partiel|Non mesuré|anonym" docs/presentation/source-map.md
~~~

Expected: every evidence guardrail appears in the map and no row claims a completed Angular 11→21 migration or a global speedup.

- [ ] **Step 3: Commit the evidence map.**

~~~powershell
git add -- docs/presentation/source-map.md
git commit -m "docs: add presentation evidence map"
~~~

## Task 2: Stage verified visual assets

**Files:**
- Create temporarily: tmp/presentation-assets/angular-g10-repair.png
- Create temporarily: tmp/presentation-assets/java-repair-review.png
- Create temporarily: tmp/presentation-assets/report-java-cockpit.png
- Read: docs/DEMO-RECORDING.md

**Interfaces:**
- Consumes: local demo routes and the report screenshots.
- Produces: cropped, readable PNGs for slide 13 and optional evidence callouts; no committed assets.

- [ ] **Step 1: Capture the Angular G10 route in the Browser.**

Open http://127.0.0.1:3000/angular/migrations/run-angular-action?mode=recording, select the Angular Pipeline or Evidence view as appropriate, and capture the prepared repair-review state showing the action-required gate, source-grounded diff and human decision controls.

- [ ] **Step 2: Capture the Java repair route in the Browser.**

Open http://127.0.0.1:3000/java/migrations/java-repair-service?mode=recording and capture the Stage 2 repair_review state. Use this only as a small supporting image; the demo slide has one primary scenario.

- [ ] **Step 3: Normalize and crop the images.**

Keep the right evidence panel and the current-action/gate area visible. Remove browser chrome and unrelated whitespace. Do not add or alter statuses, metrics or logs. Store only the normalized files under tmp/presentation-assets/.

- [ ] **Step 4: Inspect readability.**

Use view_image at high detail for each PNG. Expected: UI text remains legible at slide scale, the gate and decision controls are recognizable, and no protected CGI information is visible.

## Task 3: Create the Codex Slides project and upload sources

**Files/workspaces:**
- Codex Slides project created through the Browser.
- Upload: Rapport_Pfe_2026_main__3_.pdf
- Upload: docs/presentation/storyboard-18-slides.md
- Upload: docs/presentation/source-map.md
- Upload as Design Files: DESIGN.md, docs/presentation/storyboard-18-slides.md, docs/presentation/source-map.md

**Interfaces:**
- Consumes: the approved source files and visual assets.
- Produces: a durable Codex Slides project with the report and design files attached.

- [ ] **Step 1: Open Codex Slides in the Browser first.**

Call mcp__codex_slides__open_codex_slides without a project id. Immediately navigate the returned resource link in the in-editor Browser, confirm the create-project surface, and keep that Browser visible for the entire project lifecycle.

- [ ] **Step 2: Create the project through the Browser UI.**

Set the project title to Agentic Migration Platform — Soutenance PFE, choose a 16:9 presentation, and instruct the workspace to produce French slide copy with the English project title. Include the full 18-slide contract from this plan and the privacy disclosure.

- [ ] **Step 3: Upload the approved source materials.**

Use the Browser upload flow for the report and the three Markdown sources. If deterministic recovery is required after the Browser confirms the project id, use mcp__codex_slides__upload_material for the PDF and mcp__codex_slides__upload_design_file for each Design File. Do not call headless deck creation.

- [ ] **Step 4: Confirm material roles.**

Set the report as the primary source, the storyboard as the outline source, DESIGN.md as the visual system, and source-map.md as the evidence constraint. Confirm that the demo images are local visual references, not factual sources.

## Task 4: Configure the visual system and progress tracker

**Files/workspaces:**
- Codex Slides project brand system.
- Existing source: DESIGN.md.

**Interfaces:**
- Consumes: DESIGN.md and the project material ids.
- Produces: an always-on project design system and a reusable top progress component.

- [ ] **Step 1: Read the project brand state before changing it.**

Call mcp__codex_slides__get_brand_design_system with the project id. Confirm whether a default template or logo is already active. Remove no user asset; use no logo unless it is explicitly approved.

- [ ] **Step 2: Apply the approved palette and typography.**

Set the project system to:

~~~text
background: #07131E
surface: #0F2433
surfaceSecondary: #153447
primaryText: #F5F8FA
secondaryText: #A7BBC7
line: #2B485A
agent: #6CD7F2
deterministic: #4FA3FF
humanGate: #F7B955
evidence: #39D7B5
failure: #FF6B70
headingFont: Aptos Display
bodyFont: Aptos
monoFont: Aptos Mono
~~~

Use the deterministic brand-system update tool only after reading the current system. Do not redraw existing slides at this stage because the deck has not been generated.

- [ ] **Step 3: Specify the reusable progress tracker.**

For slides 3–18, create one top component with seven labels in this exact order:

Contexte → Solution → Architecture → Réalisation → Démo → Résultats → Conclusion

Use Cyan plus a subtle underline for the current chapter, Mist/Teal for completed chapters and Steel/Mist for remaining chapters. Keep the component under 8% of slide height and do not use it on slides 1–2.

- [ ] **Step 4: Verify the design system in the Browser.**

Inspect a representative dark slide surface and confirm the accent colors, title size, body size, margins and tracker contrast before outline generation.

## Task 5: Create and approve the 18-slide outline

**Files/workspaces:**
- Codex Slides project outline.
- Source: docs/presentation/storyboard-18-slides.md.

**Interfaces:**
- Consumes: the approved storyboard, source map and design system.
- Produces: an 18-entry outline with slide messages, visual types, chapter metadata and factual constraints.

- [ ] **Step 1: Submit the outline through the Browser.**

Use this outline instruction:

~~~text
Create exactly 18 slides in French for an engineering PFE defense titled "Agentic Migration Platform". Keep slide 1 as title and slide 2 as Plan de présentation. Start slides 3–5 with the approved story: anonymized large-airline cloud migration context, production continuity versus manual migration, then prompts-to-Migration-Factory. Show the top seven-chapter progress tracker on slides 3–18. Use the storyboard and source map as hard content constraints. Mark demonstrated, partial, prepared and target-vision scope explicitly. Do not invent metrics or present the local demo as protected CGI execution. Use one dominant message per slide and native editable diagrams.
~~~

- [ ] **Step 2: Check the outline count and order.**

Expected order: title, plan, trigger, operational reality, need-to-factory, functional architecture, technical architecture, workflow, Java, Angular, governance/agents, repair, demo, results, difficulties/apports, limits/perspectives, conclusion, Q&A.

- [ ] **Step 3: Check the opening narrative.**

Expected: slide 3 names only “un grand client aérien” and cloud/Azure context; slide 4 shows maintain/migrate/availability tension; slide 5 separates demonstrated Java/Angular scope from target .NET/PHP/Python/React and cloud/refactoring vision.

- [ ] **Step 4: Check the mini-plan metadata.**

Expected active chapters: 3–4 Contexte, 5 Solution, 6–8 Architecture, 9–12 Réalisation, 13 Démo, 14–16 Résultats, 17–18 Conclusion.

- [ ] **Step 5: Save the outline checkpoint.**

Use the Browser's outline save/continue action. If the UI does not persist, use the Codex Slides outline mutation tool with the same 18 entries, then reopen the Browser project and verify the saved outline visually.

## Task 6: Generate the first editable deck

**Files/workspaces:**
- Codex Slides project slides.
- Temporary visual references under tmp/presentation-assets/.

**Interfaces:**
- Consumes: approved outline, brand system, report, source map, storyboard and visual references.
- Produces: first rendered 18-slide deck with editable text, shapes, connectors and notes-ready slide structure.

- [ ] **Step 1: Submit the generation brief.**

Use the Browser generation flow with these non-negotiable instructions:

~~~text
Generate the approved 18-slide deck with a sober premium enterprise software design. Use a dark navy foundation, restrained Cyan/Blue/Amber/Teal/Coral accents, Aptos typography, generous margins and one clear idea per slide. Build architecture, workflow, gate, repair-loop and timeline visuals with native editable PowerPoint shapes. Use the Angular G10 screenshot only on the demo slide, with the visible disclosure "Démo locale — scénario anonymisé, états préparés". Keep future platform scope clearly labeled "Vision cible". Put sources and talk track in speaker notes, not dense footers.
~~~

- [ ] **Step 2: Verify editable construction.**

Open representative slides in the Browser and confirm that titles, labels, tracker, nodes, connectors, cards and status pills are editable objects. Any flattened architecture or workflow visual is regenerated before export.

- [ ] **Step 3: Verify slide-level content.**

Check slides 3, 5, 9, 10, 12, 13, 14 and 16 against the source map. Expected: no client names, no Angular 11→21 completion claim, no global speedup, no auth/roles claim and no protected backend claim.

- [ ] **Step 4: Save the first generated project checkpoint.**

Use the Browser checkpoint/save action. Do not export yet; first add notes and complete the visual review.

## Task 7: Add presenter notes and disclosures

**Files/workspaces:**
- Codex Slides project speaker notes for slides 1–18.

**Interfaces:**
- Consumes: source map and approved slide messages.
- Produces: concise French talk tracks with page/file references and confidentiality disclosures embedded in the exported deck.

- [ ] **Step 1: Add the opening talk track.**

Slides 3–5 must explain, in order: cloud-scale business need; simultaneous production support and migration; prompts/practices failing to scale; multi-agent Migration Factory; demonstrated scope versus target vision.

- [ ] **Step 2: Add technical talk tracks.**

Slides 6–12 must explain the separation of agents, deterministic services, human gates, Java/Angular toolchains, checksums, isolated workspace, repair proposal, review, decision and revalidation.

- [ ] **Step 3: Add evidence notes.**

Slide 13 notes must say the demo is local, deterministic, anonymized and prepared. Slide 14 notes must say 607/4 and 12→11 are point-in-time evidence, not a benchmark. Slide 10 notes must say Angular 20→21 is prepared but not started.

- [ ] **Step 4: Add source references.**

Each slide's notes include the relevant report page range or demo document path from source-map.md. Use mcp__codex_slides__update_speaker_notes or generate_speaker_notes only after the slide content is stable.

- [ ] **Step 5: Reopen representative notes in presenter mode.**

Expected: notes are visible for slides 3, 9, 13, 14 and 16 and contain no unsupported claim or internal secret.

## Task 8: Render and review the complete deck

**Files/workspaces:**
- Codex Slides project render.
- Temporary render previews under tmp/.

**Interfaces:**
- Consumes: generated deck and speaker notes.
- Produces: reviewed project state ready for export, or one isolated correction at a time.

- [ ] **Step 1: Render the full deck in Codex Slides.**

Use the Browser render/review flow. If deterministic recovery is needed, use mcp__codex_slides__render_deck, then keep the Browser project open and inspect the returned render in the canonical workspace.

- [ ] **Step 2: Run the structural checklist.**

Confirm exactly 18 slides, title/plan order, two technical axes, demo, results, conclusion and Q&A. Confirm tracker on slides 3–18 and correct active chapter sequence.

- [ ] **Step 3: Run the visual checklist.**

Inspect the full contact sheet and each slide at projection scale. Check: no overflow, no overlap, no broken connectors, no unreadable screenshot, no dense paragraph, no inconsistent margin, no tracker collision, no color-only status and no generic decorative AI art.

- [ ] **Step 4: Run the evidence checklist.**

Check the visible claims against source-map.md: Java numbers, Angular proof boundaries, demo disclosure, current/partial/planned statuses, security limits and absence of benchmark claims.

- [ ] **Step 5: Apply the first isolated correction if required.**

Change only one identifiable issue per iteration. Use a descriptive commit category such as:

~~~text
fix: rebalance opening narrative
fix: clarify Angular proof status
fix: align chapter progress tracker
fix: improve repair-loop readability
fix: add demo disclosure
~~~

After each correction, rerender the affected slide and the full deck, then repeat the structural and visual checks before making another change.

## Task 9: Export, inspect and commit the PPTX

**Files:**
- Create: Agentic-Migration-Platform-Soutenance.pptx
- Do not commit: tmp/ render previews or browser captures.

**Interfaces:**
- Consumes: reviewed Codex Slides project.
- Produces: final editable PowerPoint and a clean repository commit.

- [ ] **Step 1: Export only after Browser review passes.**

Use the Codex Slides Browser export action or mcp__codex_slides__export_deck after canonical Browser verification. Export to C:/Users/aliha/Soutenance-pfe/Agentic-Migration-Platform-Soutenance.pptx.

- [ ] **Step 2: Inspect the exported file.**

Confirm the file exists, opens as a PowerPoint package, contains 18 slides and retains editable text/shape content. Reopen the exported deck in the supported presentation inspection surface and compare slides 3, 6, 9, 10, 12, 13, 14 and 17 to the Browser render.

- [ ] **Step 3: Run repository checks.**

~~~powershell
git diff --check
git status --short --branch
~~~

Expected: only the intended .pptx is uncommitted; tmp/ remains untracked and is not staged.

- [ ] **Step 4: Commit the first complete deck.**

~~~powershell
git add -- Agentic-Migration-Platform-Soutenance.pptx
git commit -m "feat: add editable Agentic Migration Platform deck"
~~~

## Task 10: Final verification and handoff

**Files/workspaces:**
- Agentic-Migration-Platform-Soutenance.pptx
- Codex Slides project and final Browser render.
- DESIGN.md, storyboard, source map and spec.

**Interfaces:**
- Consumes: final exported deck and all committed design artifacts.
- Produces: evidence-backed completion report with commit references.

- [ ] **Step 1: Run the Codex Slides verification workflow.**

Use the codex-slides-verification skill after the final render and export. Confirm durable project state, current slide version, checkpoint, Browser-visible render and export correspondence.

- [ ] **Step 2: Recheck the final deck against the user request.**

Confirm: professional enterprise design, exactly 18 slides, Plan directly after title, top chapter tracker with remaining chapters visible, CGI context anonymized, two technical axes, architecture, workflow, governance, agents, repair, demo, evidence, limits, perspectives, conclusion and Q&A.

- [ ] **Step 3: Report the handoff.**

Provide the clickable PPTX path, list the documentation commits and any correction commits, state the final slide count, and repeat the two material disclosures: demo is local/prepared; results are evidence, not a benchmark.
