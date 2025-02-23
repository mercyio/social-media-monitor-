import { TwitterService } from "../services/twitterService";
import { config } from "dotenv";
config();

const twitterService = new TwitterService(
  process.env.TWITTER_API_KEY!,
  process.env.TWITTER_API_SECRET!,
);

const brandQueries = [
  "@infogateschools",
  "#infogateschools",
  '"Infogate Schools"',
].join(" OR ");

async function fetchMentions() {
  const mentions = await twitterService.getMentions(brandQueries);
  return mentions;
}

fetchMentions();
fetchMentions().then((mentions) => {
  mentions.forEach((mention) => {
    console.log(`
      Author: ${mention.author}
      Content: ${mention.content}
      Posted: ${new Date(mention.timestamp).toLocaleString()}
      Link: ${mention.url}
    `);
  });
});
