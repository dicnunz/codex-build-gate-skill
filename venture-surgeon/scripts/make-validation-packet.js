#!/usr/bin/env node

const fs = require("fs");

function usage() {
  return `Usage:
  node make-validation-packet.js --idea IDEA --customer CUSTOMER --outcome OUTCOME [--out FILE]

Creates a Markdown validation packet for Venture Surgeon workflows.`;
}

function parseArgs(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (["--idea", "--customer", "--outcome", "--out"].includes(arg)) {
      const value = argv[i + 1];
      if (!value) throw new Error(`${arg} requires a value`);
      options[arg.slice(2)] = value;
      i += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return options;
}

function requireField(options, field) {
  if (!options[field] || !String(options[field]).trim()) {
    throw new Error(`Missing --${field}`);
  }
}

function renderPacket({ idea, customer, outcome }) {
  return `# Venture Validation Packet

## Inputs

- Idea: ${idea}
- Target customer: ${customer}
- Desired behavior/payment: ${outcome}

## Decision

- Current verdict:
- Why:

## Evidence Ledger

| Claim | Status | Why It Matters | Proof Needed |
|---|---|---|---|
| Target customer has urgent pain | Unknown | No urgency means no sale | 10 customer conversations about past behavior |
| Customer already uses a workaround | Unknown | Current behavior reveals willingness to switch | Screenshots, workflow notes, or paid workaround proof |
| Customer will change behavior/pay | Unknown | This is the business, not the feature | Paid pilot, deposit, or workflow access |

## Scorecard

| Area | Score | Read |
|---|---:|---|
| Pain intensity | TBD |  |
| Buyer clarity | TBD |  |
| Urgency | TBD |  |
| Current workaround | TBD |  |
| Differentiation | TBD |  |
| Distribution access | TBD |  |
| Validation speed | TBD |  |
| Founder edge | TBD |  |

## Riskiest Assumption

The customer will ${outcome} because the pain is urgent enough to change current behavior.

## First 10 Customers

| Prospect | Source | Trigger | Ask | Result |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

## 2-Week MVP Contract

- Build:
- Concierge/manual:
- Cut:
- Pass:
- Fail:

## Kill Criteria

- Kill if:
- Pivot if:
- Continue if:
`;
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) {
    console.log(usage());
    return;
  }
  requireField(options, "idea");
  requireField(options, "customer");
  requireField(options, "outcome");

  const output = renderPacket(options);
  if (options.out) {
    fs.writeFileSync(options.out, output);
    console.log(`Wrote ${options.out}`);
  } else {
    process.stdout.write(output);
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { parseArgs, renderPacket, main };
