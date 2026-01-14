# Task Flow Dashboard

Modern minimalistic React UI for personal task management: capture tasks, update their status, and visualize progress with a light blue palette that keeps focus on your to-dos.

## Real-world use case
Designed for individuals who want a lightweight daily dashboard to add, edit, complete, and delete personal tasks while keeping a quick snapshot of progress (total, completed, pending) through an at-a-glance summary.

## Features
- Add a task with title, description, and due date (validation guards missing title/due date).
- Edit existing task details inline.
- Toggle status between completed and pending.
- Delete tasks with immediate UI update.
- Summary dashboard with totals, completion rate bar, and pending indicator for quick health checks.

## Project structure
- [index.html](index.html): Entry page, pulls React via CDN and mounts the app.
- [src/style.css](src/style.css): Design tokens (color, spacing, typography) and layout styling.
- [src/app.jsx](src/app.jsx): React components and task logic.
- [server.js](server.js): Tiny Node static server for local hosting.
- [start.bat](start.bat): One-click startup on Windows, opens the browser automatically.
- [test/auto_test.js](test/auto_test.js): Playwright test suite covering all five requested features; writes logs to `logs/test_run.log`.

## Setup
1. Install Node.js (>= 18 recommended) and npm.
2. Install dependencies (only Playwright is needed):
   ```bash
   npm install
   ```

## Run the UI (Windows one-click)
- Double-click `start.bat` (or run it from a terminal). This will start the server and open `http://localhost:3000` in your default browser.
- To stop, close the server window or press `Ctrl+C` in the terminal that launched it.

## Run the UI (manual)
```bash
node server.js
# then open http://localhost:3000
```

## Automated tests
- Command: `npm test` (runs `node test/auto_test.js`).
- The script will spin up the local server, run Playwright against the live page, and write human-readable output to `logs/test_run.log`.
- Inspect `logs/test_run.log` after the run for a clear, timestamped trace of each feature check.

## Design notes
- Typography: Space Grotesk for a clean, contemporary tone.
- Colors: Light blue primary (#4da3ff) with white surfaces; subtle shadows for depth; green/orange accents for status.
- Spacing & layout: 16px base padding with 12–18px gaps; two-column layout collapses to single column on narrow viewports.
- Components: Cards with soft radius, chips for quick status cues, and bar indicators for completion rate.

## Maintenance tips
- UI logic is fully client-side with no build step; adjust components in `src/app.jsx` and styles in `src/style.css`.
- If you add dependencies for future work, record them in `package.json` and update this README with any new commands.
