---
name: venture-surgeon
description: Evidence-first startup and product-idea triage. Use when Codex is asked to pressure-test a startup idea, decide whether something deserves build time, validate a problem, map competition/current behavior, find first customers, define a 2-week MVP, create kill criteria, assess founder-market fit, or give a direct build/validate/pivot/kill verdict.
---

# Venture Surgeon

Use this skill to decide whether an idea deserves build time. The job is not to sound harsh; the job is to prevent fake progress by tying every recommendation to evidence, buyer behavior, and the smallest validation move that can change the decision.

## First Move

If the idea, target buyer/user, or desired behavior/payment is missing, ask one short question:

```text
Send the idea, target customer, and what they should do or pay for.
```

If those are present, start immediately.

## Mode Selection

Choose the mode from the user's wording:

- `triage`: fast build/validate/pivot/kill decision.
- `evidence-map`: riskiest assumptions, required proof, disconfirming signals.
- `competition`: current behavior, direct competitors, indirect substitutes, switching cost.
- `customer-route`: first 10 customers, manual channels, outreach angle, conversion test.
- `mvp-contract`: 2-week MVP that tests one assumption, with explicit cuts.
- `positioning`: wedge, buyer language, category, proof needed for credibility.
- `full`: compact all-in-one diagnosis. Use this when the user asks generally, says "brutal", or wants a better pressure test.

For `full`, `deep`, unfamiliar markets, or any market/pricing/competitor claim that matters, read `references/operating-manual.md`.

## Evidence Boundary

Separate what is known from what is guessed:

- `Provided`: facts from the user.
- `Verified`: current facts checked from sources or live surfaces.
- `Assumed`: plausible but unverified claims.
- `Unknown`: facts that could flip the verdict.

Browse or inspect live sources when current competitors, pricing, platform rules, funding, regulations, or recent market changes materially affect the answer. Do not invent TAM, revenue, customers, endorsements, benchmark results, or market size.

## Default Output

Keep the default compact. Use this shape unless the user asks for more detail:

```markdown
**Decision**
Build / Validate first / Pivot / Kill

2 direct sentences.

**Evidence Ledger**
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
| Distribution access | 1-5 | ... |
| Validation speed | 1-5 | ... |
| Founder edge | 1-5 | ... |

**Riskiest Assumption**
One sentence.

**Failure Modes**
| Risk | Severity | Fast Test |
|---|---|---|
| ... | High/Med/Low | ... |

**Customer Route**
1. ...
2. ...
3. ...

**MVP Contract**
- Build:
- Cut:
- 2-week pass/fail:
```

## Decision Rules

- Say `Build` only when the buyer, pain, timing, and reachable proof path are strong enough to justify implementation.
- Say `Validate first` when the idea might work but one assumption should be tested before serious build time.
- Say `Pivot` when the customer/problem/wedge is adjacent but the stated version is pointed at the wrong behavior.
- Say `Kill` when there is no urgent buyer, no reachable early adopter, no credible wedge, or no falsifiable path within 2 weeks.

## Operating Rules

- Be specific to the idea. No generic startup advice.
- Treat current behavior as the real competition.
- Treat compliments, waitlists, and "I'd use this" as weak evidence.
- Prefer paid commitments, repeated manual pain, switching behavior, or real workflow access.
- Keep first customers manual before ads, automation, or growth tricks.
- Cut features that do not test the riskiest assumption.
- Include exact kill criteria. A test without a kill line is theater.
- If the idea is weak, say so and name the closest viable pivot.

## Optional Packet Script

Use `scripts/make-validation-packet.js` when the user wants a reusable Markdown packet for an idea:

```bash
node venture-surgeon/scripts/make-validation-packet.js \
  --idea "AI bookkeeping cleanup for solo founders" \
  --customer "US solo founders using QuickBooks" \
  --outcome "pay $49 for a one-time cleanup"
```
