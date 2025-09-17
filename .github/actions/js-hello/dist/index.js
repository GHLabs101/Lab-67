// Minimal self-contained JS Action runtime (no external deps needed)
// Implements tiny equivalents of core.getInput, core.setOutput, core.setFailed.

const fs = require("fs");
const path = require("path");

function toEnvKey(name) {
  return "INPUT_" + String(name).replace(/ /g, "_").toUpperCase();
}

function getInput(name) {
  return process.env[toEnvKey(name)] ?? "";
}

function escapeNewlines(str) {
  return String(str).replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}

function setOutput(name, value) {
  const outPath = process.env["GITHUB_OUTPUT"];
  const line = `${name}=${escapeNewlines(value)}\n`;

  if (outPath) {
    try {
      fs.appendFileSync(outPath, line, { encoding: "utf8" });
    } catch (e) {
      // fallback to old (deprecated) workflow command
      process.stdout.write(`::set-output name=${name}::${value}\n`);
    }
  } else {
    // fallback if not on GitHub runner
    process.stdout.write(`::set-output name=${name}::${value}\n`);
  }
}

function setFailed(message) {
  process.stderr.write(`::error::${message}\n`);
  // don't hard-exit; set exit code so post steps can still run if needed
  process.exitCode = 1;
}

async function run() {
  try {
    const name = getInput("name") || "world";
    const msg = `👋 Hello, ${name} (from JS action)!`;
    console.log(msg);
    setOutput("message", msg);
  } catch (err) {
    setFailed(err && err.message ? err.message : String(err));
  }
}

run();
