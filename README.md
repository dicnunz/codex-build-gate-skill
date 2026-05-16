# Build Gate for Codex

[![CI](https://github.com/dicnunz/codex-build-gate-skill/actions/workflows/ci.yml/badge.svg)](https://github.com/dicnunz/codex-build-gate-skill/actions/workflows/ci.yml)

Codex is fast enough to build the wrong product in one sitting.

`build-gate` is the missing pre-build guardrail: a Codex skill that forces a startup idea through buyer proof, current behavior, reachable first customers, and a two-week validation contract before implementation is allowed.

If the idea cannot clear the gate, Codex does not write product code. It gives you the smallest proof move instead.

## Install

```bash
npx --yes github:dicnunz/codex-build-gate-skill
```

Then restart Codex so it discovers the skill.

Use it before implementation:

```text
Use $build-gate before building this:

Idea: AI bookkeeping cleanup for solo founders.
Customer: US solo founders using QuickBooks.
Desired behavior: pay $49 for a one-time cleanup.
```

## What You Get

Build Gate returns a build/no-build packet:

- `Pass / Hold / Pivot / Kill` gate result
- proof ledger separating `Provided`, `Verified`, `Assumed`, and `Unknown`
- current-behavior map, because the real competitor is often a spreadsheet, agency, intern, script, or doing nothing
- locked door: the one assumption that decides whether the product deserves build time
- no-build clause that blocks implementation until the riskiest proof exists
- next 10 buyer moves instead of vague "talk to users" advice
- two-week validation contract with pass/fail/kill criteria

See a full example: [examples/ai-bookkeeping-cleanup.md](examples/ai-bookkeeping-cleanup.md).

## Why This Exists

Most startup validators produce confident theater: big-market language, generic scorecards, and a verdict that still lets the agent go build the wrong thing.

Build Gate is stricter. It makes the agent say what proof is missing and what must happen before build time is allowed.

## Why Use This One

Simple pressure-test skills are useful if you want a harsh opinion.

Build Gate is for when you want an operating constraint:

- `Pass / Hold / Pivot / Kill`, not just "strong" or "weak".
- Proof ledger with `Provided`, `Verified`, `Assumed`, and `Unknown` claims.
- No-build clause that blocks implementation until the riskiest proof exists.
- Current-behavior map, because the real competitor is often a spreadsheet, agency, internal process, or doing nothing.
- Next-10-buyer moves instead of vague "talk to users" advice.
- Two-week validation contract with pass/fail/kill criteria.
- Non-destructive installer that refuses to overwrite an existing skill unless `--force` creates a backup.

## 30-Second Demo

Prompt:

```text
Use $build-gate before building this:
AI bookkeeping cleanup for solo founders using QuickBooks.
I want them to pay $49 for a one-time cleanup.
```

Expected shape:

```markdown
**Gate**
Hold

Do not build the app yet. The buyer and pain are plausible, but willingness to pay is still unknown.

**No-Build Clause**
Do not implement dashboards, integrations, auth, or billing until 3 of 15 target founders either pay for a manual cleanup or share real bookkeeping workflow access.

**Next 10 Buyer Moves**
1. Find 10 solo founders posting about tax cleanup, QuickBooks pain, or messy books.
2. Offer a $49 manual cleanup review with a before/after summary.
3. Count only paid cleanup, workflow access, or a concrete refusal reason as signal.
```

## Safer Installer Behavior

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

## Validation Packet Helper

Create a reusable Markdown packet:

```bash
node build-gate/scripts/make-validation-packet.js \
  --idea "AI bookkeeping cleanup for solo founders" \
  --customer "US solo founders using QuickBooks" \
  --outcome "pay $49 for a one-time cleanup" \
  --out packet.md
```

## Manual Install

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

## How It Is Different

Build Gate is not trying to be the loudest startup critic. It is trying to change Codex's behavior.

The core primitive is the gate:

- weak proof means Codex must stop before product code
- missing buyer behavior becomes a named locked door
- validation is expressed as a contract with pass/fail/kill lines
- the next move is a customer-facing test, not another feature

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
