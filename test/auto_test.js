const { chromium } = require("playwright");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "..", "logs");
const LOG_FILE = path.join(LOG_DIR, "test_run.log");

fs.mkdirSync(LOG_DIR, { recursive: true });
const logStream = fs.createWriteStream(LOG_FILE, { flags: "w" });

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}`;
  console.log(line);
  logStream.write(line + "\n");
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  log("Booting local server (node server.js)...");
  const server = spawn("node", ["server.js"], { cwd: path.join(__dirname, "..") });

  server.stdout?.on("data", (d) => log(`server: ${d.toString().trim()}`));
  server.stderr?.on("data", (d) => log(`server err: ${d.toString().trim()}`));

  // Wait briefly for the server to come online.
  await delay(1200);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    log("Opened dashboard");

    // Edge case: missing title should show validation error
    await page.fill('[data-testid="title-input"]', "");
    await page.fill('[data-testid="due-input"]', "");
    await page.click('[data-testid="submit-btn"]');
    await page.waitForTimeout(100);
    const errorVisible = await page.isVisible("text=Title and due date are required to create clarity.");
    if (!errorVisible) throw new Error("Validation message missing for empty title/due date");
    log("Validation check passed (empty title/due date)");

    // 1. Add task
    const newTitle = "Automated test task";
    const newDesc = "Added via Playwright";
    const newDate = "2026-02-01";
    await page.fill('[data-testid="title-input"]', newTitle);
    await page.fill('[data-testid="description-input"]', newDesc);
    await page.fill('[data-testid="due-input"]', newDate);
    await page.click('[data-testid="submit-btn"]');
    await page.waitForSelector(`text=${newTitle}`);
    log("Add task: rendered with title and description");

    // 2. Edit task
    const firstEditButton = (await page.$$('[data-testid="edit-task"]'))[0];
    await firstEditButton.click();
    await page.fill('[data-testid="title-input"]', "Edited test task");
    await page.click('[data-testid="submit-btn"]');
    await page.waitForSelector("text=Edited test task");
    log("Edit task: title updated");

    // 3. Mark completed
    const toggleButton = (await page.$$('[data-testid="toggle-status"]'))[0];
    await toggleButton.click();
    await page.waitForSelector("text=Done");
    log("Mark completed: status toggled to Done");

    // 4. Delete task
    const deleteButton = (await page.$$('[data-testid="delete-task"]'))[0];
    await deleteButton.click();
    await page.waitForTimeout(150);
    const stillThere = await page.isVisible("text=Edited test task");
    if (stillThere) throw new Error("Delete task failed to remove item");
    log("Delete task: removed successfully");

    // 5. Summary dashboard counts align
    const total = parseInt(await page.textContent('[data-testid="total-count"]'), 10);
    const completed = parseInt(await page.textContent('[data-testid="completed-count"]'), 10);
    const pending = parseInt(await page.textContent('[data-testid="pending-count"]'), 10);
    if (total !== completed + pending) {
      throw new Error(`Summary mismatch: total=${total}, completed+pending=${completed + pending}`);
    }
    log(`Summary check: total ${total}, completed ${completed}, pending ${pending}`);

    log("All feature tests passed. ✅");
  } catch (err) {
    log(`Test failure: ${err.message}`);
    throw err;
  } finally {
    await page.close();
    await browser.close();
    server.kill("SIGINT");
    logStream.end();
  }
}

run().catch((err) => {
  console.error("Test run failed:", err);
  process.exit(1);
});
