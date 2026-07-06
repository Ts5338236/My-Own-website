const { spawn } = require("child_process");
const path = require("path");

console.log("[Launcher]: Starting Aetheric AI Platform...");

// Start Express Backend
const backend = spawn("npm", ["run", "dev"], {
  cwd: path.join(__dirname, "backend"),
  stdio: "inherit",
  shell: true,
});

// Start Next.js Frontend
const frontend = spawn("npm", ["run", "dev"], {
  cwd: path.join(__dirname, "frontend"),
  stdio: "inherit",
  shell: true,
});

// Graceful shutdown handler
function shutdown() {
  console.log("\n[Launcher]: Terminating child services...");
  backend.kill("SIGTERM");
  frontend.kill("SIGTERM");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
