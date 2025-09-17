// .github/actions/js-hello/src/index.js
const core = require("@actions/core");

async function run() {
  try {
    const name = core.getInput("name") || "world";
    const msg = `👋 Hello, ${name} (from JS action)!`;
    console.log(msg);
    core.setOutput("message", msg);
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
