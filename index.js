import { main } from "./scraper.js";
import cron from "node-cron";

// From node-cron documentation. In our case we will not use seconds.
//  ┌────────────── second (optional)
//  │ ┌──────────── minute
//  │ │ ┌────────── hour
//  │ │ │ ┌──────── day of month
//  │ │ │ │ ┌────── month
//  │ │ │ │ │ ┌──── day of week
//  │ │ │ │ │ │
//  │ │ │ │ │ │
//  * * * * * *

//  Schedule the task to run every week at 3:00 AM on Sunday (WEEKLY)
cron.schedule("0 3 * * 1", async () => {
  await main();
});

// // RUN CRON JOB EVERY 2 MINUTES FOR TESTING
// cron.schedule("*/2 * * * *", async () => {
//   await main();
// });

// Run the task immediately, For Testing
// main();
