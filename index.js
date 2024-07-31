import { main } from "./scraper.js";
import cron from "node-cron";
// Schedule the task to run every week at 3:00 AM on Sunday
cron.schedule("0 3 * * 0", async () => {
  await main();
});

// Run the task immediately
// main();
