# Codex Venture Surgeon Skill

`venture-surgeon` is a Codex skill for deciding whether a startup or product idea deserves build time.

It is built for evidence-first triage: buyer clarity, current behavior, first customers, competition, founder edge, a 2-week MVP contract, and explicit kill criteria.

## Why this exists

Most startup validators produce confident theater: big-market language, generic scorecards, and no hard stop line.

This skill is stricter. It forces the agent to separate provided facts, verified facts, assumptions, and unknowns before recommending build/validate/pivot/kill.

## What it does

- Gives a direct `Build`, `Validate first`, `Pivot`, or `Kill` decision.
- Builds an evidence ledger instead of pretending weak signals are proof.
- Scores pain, buyer clarity, urgency, current workaround, differentiation, distribution, validation speed, and founder edge.
- Maps current behavior as the real competition.
- Designs a first-10-customer route before ads or launch theater.
- Defines a 2-week MVP contract with build/cut/pass/fail lines.
- Browses or asks for source proof when current market facts matter.

## Install from GitHub

```bash
npx --yes github:dicnunz/codex-venture-surgeon-skill
```

Then restart Codex so it discovers the new skill.

Use:

```text
Use $venture-surgeon to decide whether this deserves build time:

Idea: AI bookkeeping cleanup for solo founders.
Customer: US solo founders using QuickBooks.
Desired behavior: pay $49 for a one-time cleanup.
```

## Safer installer behavior

The installer copies `venture-surgeon/` into:

```text
~/.codex/skills/venture-surgeon
```

It refuses to overwrite an existing install unless you pass `--force`. With `--force`, it first renames the old folder to a timestamped backup.

```bash
npx --yes github:dicnunz/codex-venture-surgeon-skill --force
```

Preview without writing:

```bash
npx --yes github:dicnunz/codex-venture-surgeon-skill --dry-run
```

Install somewhere else:

```bash
npx --yes github:dicnunz/codex-venture-surgeon-skill --skills-dir ./skills
```

## Manual install

```bash
git clone https://github.com/dicnunz/codex-venture-surgeon-skill.git
mkdir -p ~/.codex/skills
cp -R codex-venture-surgeon-skill/venture-surgeon ~/.codex/skills/venture-surgeon
```

Restart Codex.

## Modes

- `triage`: fast build/validate/pivot/kill decision.
- `evidence-map`: assumptions, proof, disconfirming signals.
- `competition`: current behavior, competitors, substitutes, switching cost.
- `customer-route`: first 10 customers and manual conversion route.
- `mvp-contract`: 2-week MVP with explicit cuts and pass/fail.
- `positioning`: wedge, category, buyer language, credibility proof.
- `full`: compact all-in-one diagnosis.

## Validation packet helper

Create a reusable Markdown packet:

```bash
node venture-surgeon/scripts/make-validation-packet.js \
  --idea "AI bookkeeping cleanup for solo founders" \
  --customer "US solo founders using QuickBooks" \
  --outcome "pay $49 for a one-time cleanup" \
  --out packet.md
```

## Development

```bash
npm test
npm run pack:check
python3 /path/to/quick_validate.py venture-surgeon
```

## Security notes

- No runtime dependencies.
- The installer only copies the bundled skill folder.
- Existing installs are not replaced unless `--force` is provided.
- `--force` creates a timestamped backup before replacement.

## License

MIT
