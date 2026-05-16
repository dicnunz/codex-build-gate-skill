const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const test = require("node:test");

const { install, parseArgs } = require("../scripts/install");

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "build-gate-test-"));
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
  assert.equal(result.destination, path.join(dir, "build-gate"));
  assert.ok(fs.existsSync(path.join(dir, "build-gate", "SKILL.md")));
  assert.ok(fs.existsSync(path.join(dir, "build-gate", "references", "operating-manual.md")));
});

test("install refuses to overwrite without force", () => {
  const dir = tempDir();
  install({ skillsDir: dir });
  assert.throws(() => install({ skillsDir: dir }), /already exists/);
});

test("dry run reports an existing install without throwing", () => {
  const dir = tempDir();
  install({ skillsDir: dir });
  const result = install({ skillsDir: dir, dryRun: true });
  assert.equal(result.dryRun, true);
  assert.equal(result.exists, true);
  assert.equal(result.conflict, true);
  assert.equal(result.backup, null);
});

test("force install creates a timestamped backup", () => {
  const dir = tempDir();
  install({ skillsDir: dir });
  fs.writeFileSync(path.join(dir, "build-gate", "marker.txt"), "old");
  const result = install({ skillsDir: dir, force: true });
  assert.ok(result.backup);
  assert.ok(result.backup.includes(path.join(".codex", "backups", "build-gate-installs")));
  assert.ok(fs.existsSync(path.join(result.backup, "marker.txt")));
  assert.ok(fs.existsSync(path.join(dir, "build-gate", "SKILL.md")));
  assert.equal(fs.existsSync(path.join(dir, "build-gate", "marker.txt")), false);
});
