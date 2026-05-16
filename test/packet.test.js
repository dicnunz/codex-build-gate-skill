const assert = require("assert");
const test = require("node:test");

const { parseArgs, renderPacket } = require("../build-gate/scripts/make-validation-packet");

test("packet parser accepts required fields and output path", () => {
  const options = parseArgs([
    "--idea",
    "AI cleanup",
    "--customer",
    "solo founders",
    "--outcome",
    "pay $49",
    "--out",
    "packet.md",
  ]);

  assert.equal(options.idea, "AI cleanup");
  assert.equal(options.customer, "solo founders");
  assert.equal(options.outcome, "pay $49");
  assert.equal(options.out, "packet.md");
});

test("packet renderer includes the Build Gate contract sections", () => {
  const packet = renderPacket({
    idea: "AI cleanup",
    customer: "solo founders",
    outcome: "pay $49",
  });

  assert.match(packet, /# Build Gate Packet/);
  assert.match(packet, /## Proof Ledger/);
  assert.match(packet, /## No-Build Clause/);
  assert.match(packet, /## Next 10 Buyer Moves/);
  assert.match(packet, /## Two-Week Validation Contract/);
});
