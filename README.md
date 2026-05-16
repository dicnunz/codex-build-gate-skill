# Codex Build Gate Skill

`build-gate` is a Codex skill that stops Codex from building a startup idea before the idea clears a proof gate.

It is built for the moment right before implementation: buyer clarity, current behavior, proof gaps, first buyers, a two-week validation contract, and a hard no-build clause.

## Why this exists

Most startup validators produce confident theater: big-market language, generic scorecards, and a verdict that still lets the agent go build the wrong thing.

Build Gate is stricter. It makes the agent say what proof is missing and what must happen before build time is allowed.

## Why use this one

Simple pressure-test skills are useful if you want a harsh opinion.

Build Gate is for when you want an operating constraint:

- `Pass / Hold / Pivot / Kill`, not just "strong" or "weak".
- Proof ledger with `Provided`, `Verified`, `Assumed`, and `Unknown` claims.
- No-build clause that blocks implementation until the riskiest proof exists.
- Current-behavior map, because the real competitor is often a spreadsheet, agency, internal process, or doing nothing.
- Next-10-buyer moves instead of vague "talk to users" advice.
- Two-week validation contract with pass/fail/kill criteria.
- Non-destructive installer that refuses to overwrite an existing skill unless `--force` creates a backup.

## What it does

- Gives a direct `Pass`, `Hold`, `Pivot`, or `Kill` gate result.
- Builds a proof ledger instead of pretending weak signals are proof.
- Scores pain, buyer clarity, urgency, current workaround, differentiation, reachability, validation speed, and founder edge.
- Maps current behavior as the real competition.
- Designs next-10-buyer moves before ads or launch theater.
- Defines a two-week validation contract with test/cut/pass/fail lines.
- Browses or asks for source proof when current market facts matter.

## Install from GitHub

```bash
npx --yes github:dicnunz/codex-build-gate-skill
```

Then restart Codex so it discovers the new skill.

Use:

```text
Use $build-gate before building this:

Idea: AI bookkeeping cleanup for solo founders.
Customer: US solo founders using QuickBooks.
Desired behavior: pay $49 for a one-time cleanup.
```

## Safer installer behavior

The installer copies `build-gate/` into:

```text
~/.codex/skills/build-gate
```

It refuses to overwrite an existing install unless you pass `--force`. With `--force`, it first renames the old folder to a timestamped backup.

```bash
npx --yes github:dicnunz/codex-build-gate-skill --force
```

Preview without writing:

```bash
npx --yes github:dicnunz/codex-build-gate-skill --dry-run
```

Install somewhere else:

```bash
npx --yes github:dicnunz/codex-build-gate-skill --skills-dir ./skills
```

## Manual install

```bash
git clone https://github.com/dicnunz/codex-build-gate-skill.git
mkdir -p ~/.codex/skills
cp -R codex-build-gate-skill/build-gate ~/.codex/skills/build-gate
```

Restart Codex.

## Modes

- `gate`: fast Pass/Hold/Pivot/Kill decision.
- `proof`: assumptions, proof, disconfirming signals.
- `behavior`: current behavior, competitors, substitutes, switching cost.
- `first-buyers`: next 10 reachable buyers and manual conversion route.
- `validation-contract`: two-week validation plan with explicit cuts and pass/fail.
- `wedge`: switching reason, buyer language, category, credibility proof.
- `full`: compact all-in-one diagnosis.

## Validation packet helper

Create a reusable Markdown packet:

```bash
node build-gate/scripts/make-validation-packet.js \
  --idea "AI bookkeeping cleanup for solo founders" \
  --customer "US solo founders using QuickBooks" \
  --outcome "pay $49 for a one-time cleanup" \
  --out packet.md
```

## Development

```bash
npm test
npm run pack:check
python3 /path/to/quick_validate.py build-gate
```

## Security notes

- No runtime dependencies.
- The installer only copies the bundled skill folder.
- Existing installs are not replaced unless `--force` is provided.
- `--force` creates a timestamped backup before replacement.

## License

MIT
