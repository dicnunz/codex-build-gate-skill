# Example: AI Bookkeeping Cleanup

This is the kind of output Build Gate is meant to force before Codex starts building.

## Prompt

```text
Use $build-gate before building this:

Idea: AI bookkeeping cleanup for solo founders.
Customer: US solo founders using QuickBooks.
Desired behavior: pay $49 for a one-time cleanup.
```

## Build Gate Output

**Gate**

Hold

Do not build the app yet. The buyer and pain are plausible, but willingness to pay and workflow access are still unproven.

**Why**

- The customer is specific enough to test manually: solo founders using QuickBooks.
- The desired behavior is concrete, but no evidence yet shows founders will pay for cleanup instead of waiting for tax season, asking an accountant, or ignoring the mess.

**Proof Ledger**

| Claim | Status | Why It Matters | Proof Needed |
|---|---|---|---|
| Solo founders have messy QuickBooks records | Assumed | Pain intensity decides whether this is urgent or merely annoying | 10 conversations about recent bookkeeping cleanup behavior |
| They already spend time or money on cleanup | Unknown | Current behavior reveals whether the problem is real | Screenshots, accountant invoices, late-night cleanup stories, or manual workflow notes |
| They will pay $49 for a one-time cleanup | Unknown | Payment is the business model, not a feature preference | 3 paid manual cleanup reviews or deposits |
| The founder can reach this customer manually | Unknown | No reachable buyer means no useful validation loop | A list of 30 specific founders with a visible bookkeeping/tax trigger |

**Scorecard**

| Area | Score | Read |
|---|---:|---|
| Pain intensity | 3 | Plausible but not proven urgent outside deadlines |
| Buyer clarity | 4 | Solo founder using QuickBooks is narrow enough |
| Urgency | 2 | Needs a trigger such as tax filing, investor diligence, or cash reconciliation |
| Current workaround | 3 | Likely accountant, spreadsheet, or manual cleanup |
| Differentiation | 2 | AI cleanup alone is easy to copy unless workflow access or speed is unique |
| Reachability | 3 | Reachable through founder communities, bookkeeping posts, and QuickBooks pain searches |
| Validation speed | 5 | Manual $49 cleanup can be tested this week |
| Founder edge | 2 | Unknown until access, credibility, or bookkeeping skill is shown |

**Locked Door**

Will 3 real solo founders pay for a manual cleanup before software exists?

**No-Build Clause**

Do not implement dashboards, QuickBooks OAuth, billing, account management, or automated cleanup until 3 of 15 target founders either pay $49 or share real bookkeeping workflow access for a manual cleanup.

**Next 10 Buyer Moves**

1. Find 10 solo founders publicly complaining about tax cleanup, messy QuickBooks, cash reconciliation, or accountant handoff.
2. Send one short message offering a $49 manual cleanup review with a before/after summary.
3. Ask what they did last time their books were messy, how long it took, and whether they paid anyone.
4. Offer to inspect one exported report or anonymized screenshot before building anything.
5. Count only payment, deposit, or workflow access as positive signal.
6. Track refusal reasons: no urgency, accountant owns it, privacy concern, price too high, problem not real.
7. If privacy blocks sharing, offer a screen-share/manual walkthrough instead.
8. If founders love the idea but will not pay, test accountants/bookkeepers as the buyer.
9. If tax-season urgency is the only trigger, narrow the wedge to deadline cleanup.
10. If 3 pay, build only the repeated manual steps from those cleanups.

**Two-Week Contract**

- Test: Offer 15 solo founders a $49 manual cleanup review.
- Manual/concierge: Founder reviews exports/screenshots by hand and returns a cleanup summary.
- Cut: No dashboard, no OAuth, no automated categorization, no subscriptions.
- Pass: 3 paid cleanups or 5 serious workflow-access commitments from the target segment.
- Fail: Fewer than 2 paid/manual commitments after 15 direct asks.
- Pivot: If founders refuse but bookkeepers want faster cleanup, pivot buyer to bookkeepers handling messy client files.

**Decision**

Build a paid manual cleanup service first. Product code starts only after repeated manual cleanup reveals the workflow worth automating.
