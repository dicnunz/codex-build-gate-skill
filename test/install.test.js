const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const test = require("node:test");

const { install, parseArgs } = require("../scripts/install");

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "venture-surgeon-test-"));
}

test("parseArgs supports safe installer options", () => {
  const options = parseArgs(["--skills-dir", "~/x", "--force", "--dry-run"]);
  assert.equal(options.skillsDir, path.join(os.homedir(), "x"));
  assert.equal(options.force, true);
  assert.equal(options.dryRun, true);
});

test("install copies the bundled skill", () => {
  const dir = tempDir();
  const result = install({ skillsDir: dir });
  assert.equal(result.destination, path.join(dir, "venture-surgeon"));
  assert.ok(fs.existsSync(path.join(dir, "venture-surgeon", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(dir, "venture-surgeon", "references", "operating-manual.md")));
});

test("install refuses to overwrite without force", () => {
  const dir = tempDir();
  install({ skillsDir: dir });
  assert.throws(() => install({ skillsDir: dir }), /already exists/);
});

test("force install creates a timestamped backup", () => {
  const dir = tempDir();
  install({ skillsDir: dir });
  fs.writeFileSync(path.join(dir, "venture-surgeon", "marker.txt"), "old");
  const result = install({ skillsDir: dir, force: true });
  assert.ok(result.backup);
  assert.ok(fs.existsSync(path.join(result.backup, "marker.txt")));
  assert.ok(fs.existsSync(path.join(dir, "venture-surgeon", "SKILL.md")));
  assert.equal(fs.existsSync(path.join(dir, "venture-surgeon", "marker.txt")), false);
});
