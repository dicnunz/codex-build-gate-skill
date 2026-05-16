---
name: build-gate
description: Pre-build evidence gate for startup and product ideas. Use when Codex is asked whether to build an idea, stop before implementation, require proof before coding, validate demand, inspect current customer behavior, choose first-customer moves, define a two-week validation contract, set kill criteria, or decide Pass/Hold/Pivot/Kill before writing product code.
---

# Build Gate

Use this skill as a gate before Codex starts building. The job is to decide whether implementation is allowed yet, what proof is missing, and what smallest customer-facing move can open or close the gate.

## First Move

If the idea, target buyer/user, or desired behavior/payment is missing, ask one short question:

```text
Send the idea, target customer, and what they should do or pay for.
```

If those are present, start immediately.

## Gate Modes

Choose the mode from the user's wording:

- `gate`: fast Pass/Hold/Pivot/Kill decision.
- `proof`: claim ledger, proof needed, disconfirming evidence.
- `behavior`: what customers do today, including manual workarounds and substitutes.
- `first-buyers`: where to find 10 reachable buyers and what to ask them for.
- `validation-contract`: a two-week test with build/cut/pass/fail lines.
- `wedge`: buyer language, switching reason, category, credibility proof.
- `full`: compact all-in-one gate review. Use this when the user asks generally or wants a serious pre-build review.

For `full`, `deep`, unfamiliar markets, or any market/pricing/competitor claim that matters, read `references/operating-manual.md`.

## Proof Standard

Separate what is known from what is guessed:

- `Provided`: facts from the user.
- `Verified`: current facts checked from sources or live surfaces.
- `Assumed`: plausible but unverified claims.
- `Unknown`: facts that could flip the verdict.

Browse or inspect live sources when current competitors, pricing, platform rules, funding, regulations, or recent market changes materially affect the decision. Do not invent market size, revenue, customers, endorsements, benchmark results, or private access.

Default stance: the gate is closed until real behavior justifies build time.

## Default Output

Keep the default compact. Use this shape unless the user asks for more detail:

```markdown
**Gate**
Pass / Hold / Pivot / Kill

One sentence on whether Codex should build now.

**Why**
2 bullets, tied to evidence.

**Proof Ledger**
| Claim | Status | Why It Matters | Proof Needed |
|---|---|---|---|
| ... | Provided/Verified/Assumed/Unknown | ... | ... |

**Scorecard**
| Area | Score | Read |
|---|---:|---|
| Pain intensity | 1-5 | ... |
| Buyer clarity | 1-5 | ... |
| Urgency | 1-5 | ... |
| Current workaround | 1-5 | ... |
| Differentiation | 1-5 | ... |
| Reachability | 1-5 | ... |
| Validation speed | 1-5 | ... |
| Founder edge | 1-5 | ... |

**Locked Door**
One sentence.

**No-Build Clause**
Do not implement beyond [scope] until [proof].

**Next 10 Buyer Moves**
1. ...
2. ...
3. ...

**Two-Week Contract**
- Test:
- Manual/concierge:
- Cut:
- Pass:
- Fail:
```

## Decision Rules

- `Pass`: implementation is allowed because buyer, pain, current behavior, and a reachable path are credible.
- `Hold`: the idea might work, but one proof item must be collected before serious build time.
- `Pivot`: the nearby problem is real, but the stated buyer, wedge, or behavior is wrong.
- `Kill`: no urgent buyer, no reachable early adopter, no credible switch reason, or no falsifiable two-week path.

## Operating Rules

- Be specific to the idea. No generic startup advice.
- Treat current behavior as the real competition.
- Treat compliments, waitlists, and "I'd use this" as weak evidence.
- Prefer paid commitments, repeated manual pain, switching behavior, or real workflow access.
- Keep first customers manual before ads, automation, or growth tricks.
- Cut features that do not test the riskiest assumption.
- Include exact kill criteria. A test without a kill line is theater.
- If the idea is weak, say so and name the closest viable pivot.
- If the user asks Codex to build after a `Hold`, define the smallest fake/manual surface that can gather proof without becoming the product.

## Optional Packet Script

Use `scripts/make-validation-packet.js` when the user wants a reusable Markdown packet for an idea:

```bash
node build-gate/scripts/make-validation-packet.js \
  --idea "AI bookkeeping cleanup for solo founders" \
  --customer "US solo founders using QuickBooks" \
  --outcome "pay $49 for a one-time cleanup"
```
