import { TwitterApi } from "twitter-api-v2";
import { SocialMention } from "../types";

export class TwitterService {
  private twitterClient: TwitterApi;

  constructor(apiKey: string, apiSecret: string) {
    this.twitterClient = new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret,
    });
  }

  async initialize() {
    this.twitterClient = await this.twitterClient.appLogin();
  }

  async getMentions(query: string): Promise<SocialMention[]> {
    const tweets = await this.twitterClient.v2.search(query);

    return tweets.data.data.map((tweet) => ({
      platform: "twitter",
      content: tweet.text,
      author: tweet.author_id ?? "",
      timestamp: tweet.created_at
        ? new Date(tweet.created_at).getTime()
        : Date.now(),
      url: `https://twitter.com/user/status/${tweet.id}`,
    }));
  }
}
