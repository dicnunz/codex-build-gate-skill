#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const SKILL_NAME = "build-gate";

function usage() {
  return `Codex Build Gate installer

Usage:
  npx github:dicnunz/codex-build-gate-skill
  codex-build-gate-skill --skills-dir ~/.codex/skills --force

Options:
  --skills-dir PATH  Install into a custom Codex skills directory
  --force            Replace an existing install after creating a backup
  --dry-run          Print the planned operation without writing
  --help             Show this help`;
}

function expandHome(value) {
  if (!value) return value;
  if (value === "~") return os.homedir();
  if (value.startsWith("~/")) return path.join(os.homedir(), value.slice(2));
  return value;
}

function parseArgs(argv) {
  const options = { force: false, dryRun: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--skills-dir") {
      const value = argv[index + 1];
      if (!value) throw new Error("--skills-dir requires a path");
      options.skillsDir = expandHome(value);
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return options;
}

function defaultSkillsDir() {
  const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
  return path.join(codexHome, "skills");
}

function defaultBackupDir() {
  const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
  return path.join(codexHome, "backups", `${SKILL_NAME}-installs`);
}

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

function backupPath(destination, backupDir = defaultBackupDir()) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..+$/, "Z");
  const baseName = path.basename(destination);
  let candidate = path.join(backupDir, `${baseName}.backup-${stamp}`);
  let suffix = 2;
  while (fs.existsSync(candidate)) {
    candidate = path.join(backupDir, `${baseName}.backup-${stamp}-${suffix}`);
    suffix += 1;
  }
  return candidate;
}

function install(rawOptions = {}) {
  const source = path.resolve(__dirname, "..", SKILL_NAME);
  const skillsDir = path.resolve(rawOptions.skillsDir || defaultSkillsDir());
  const destination = path.join(skillsDir, SKILL_NAME);

  if (!fs.existsSync(source)) {
    throw new Error(`Cannot find bundled skill at ${source}`);
  }

  const exists = fs.existsSync(destination);
  const plannedBackup = exists && rawOptions.force ? backupPath(destination) : null;
  if (rawOptions.dryRun) {
    return {
      source,
      destination,
      backup: plannedBackup,
      dryRun: true,
      exists,
      conflict: exists && !rawOptions.force,
    };
  }

  if (exists && !rawOptions.force) {
    throw new Error(`${destination} already exists. Re-run with --force to replace it with a timestamped backup.`);
  }

  fs.mkdirSync(skillsDir, { recursive: true });
  if (exists) {
    fs.mkdirSync(path.dirname(plannedBackup), { recursive: true });
    fs.renameSync(destination, plannedBackup);
  }
  copyDirectory(source, destination);
  return { source, destination, backup: plannedBackup, dryRun: false };
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) {
    console.log(usage());
    return;
  }

  const result = install(options);
  if (result.dryRun) {
    if (result.conflict) {
      console.log(`${SKILL_NAME} already exists at ${result.destination}`);
      console.log("Would leave the existing install unchanged. Re-run with --force to preview replacement.");
      return;
    }
    console.log(`Would install ${SKILL_NAME} to ${result.destination}`);
    if (result.backup) console.log(`Would back up existing install to ${result.backup}`);
    return;
  }

  console.log(`Installed ${SKILL_NAME}.`);
  console.log(`Location: ${result.destination}`);
  if (result.backup) console.log(`Previous install backed up to: ${result.backup}`);
  console.log("");
  console.log("Restart Codex, then run:");
  console.log("  Use $build-gate before building this startup idea: ...");
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { parseArgs, install, backupPath, copyDirectory, usage };
