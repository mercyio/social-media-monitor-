import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { config } from "dotenv";
import { TelexService } from "./services/telexService";
import { TwitterService } from "./services/twitterService";
import { FacebookService } from "./services/facebookService";
import { SocialMention } from "./types";
import { cors } from "hono/cors";
import { InMemoryStorage } from "./services/storageService";
import { integrationConfig } from "./data/integrationConfig";

// Load environment variables
config();

const app = new Hono();

// Initialize services
const storage = new InMemoryStorage();
const telexService = new TelexService(storage);
const twitterService = new TwitterService(
  process.env.TWITTER_API_KEY || "",
  process.env.TWITTER_API_SECRET || ""
);
const facebookService = new FacebookService(
  process.env.FACEBOOK_ACCESS_TOKEN || ""
);

// Message queue for social mentions
const mentionQueue: Array<SocialMention> = [];

// Worker function to process social mentions
const processMentionQueue = async () => {
  console.log("Processing mentions queue, total:", mentionQueue.length);
  while (mentionQueue.length > 0) {
    const mention = mentionQueue.shift()!;
    try {
      const message = telexService.formatMentionMessage(mention);
      await telexService.sendTelexResponse(
        process.env.CHANNEL_ID || "",
        message
      );
    } catch (error) {
      console.error("Error processing mention:", error);
    }
  }
};

// Process queue interval
setInterval(processMentionQueue, 1000);

// CORS middleware
app.use(
  "*",
  cors({
    origin: "*",
    maxAge: 600,
  })
);

// Monitoring settings schema
const monitoringSettingsSchema = z.object({
  companyHandle: z.string(),
  pageId: z.string(),
  interval: z.number(),
  platforms: z.array(z.enum(["twitter", "facebook"])),
});

// API Routes
app.get("/health", (c) => {
  return c.json({ status: "healthy" }, 200);
});

app.get("/integration-config", (c) => {
  return c.json(integrationConfig, 200);
});

app.post(
  "/monitor/tick",
  zValidator("json", monitoringSettingsSchema),
  async (c) => {
    const settings = c.req.valid("json");
    try {
      const mentions = [];

      if (settings.platforms.includes("twitter")) {
        const twitterMentions = await twitterService.getMentions(
          settings.companyHandle
        );
        mentions.push(...twitterMentions);
      }

      if (settings.platforms.includes("facebook")) {
        const facebookMentions = await facebookService.getMentions(
          settings.pageId
        );
        mentions.push(...facebookMentions);
      }

      // Add mentions to queue for processing
      mentionQueue.push(...mentions);

      return c.json({
        status: "success",
        mentionsFound: mentions.length,
      });
    } catch (error) {
      console.error("Error checking mentions:", error);
      return c.json(
        {
          status: "error",
          message: "Failed to check mentions",
        },
        500
      );
    }
  }
);

// Server startup
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
console.log(`Server is starting on port ${port}...`);
serve({
  fetch: app.fetch,
  port,
});
console.log("Server started");

// Graceful shutdown handlers
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});
