import { FacebookAdsApi } from "facebook-nodejs-business-sdk";
import { FacebookPost, SocialMention } from "../types";

export class FacebookService {
  private accessToken: string;
  private api: FacebookAdsApi;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.api = FacebookAdsApi.init(this.accessToken);
  }

  async getMentions(pageId: string): Promise<SocialMention[]> {
    const fields = ["message", "created_time", "from", "id"];
    const response = await this.api.call("GET", `/${pageId}/posts`, {
      fields: fields.join(","),
      limit: 100,
    });

    return response.data.map((post: FacebookPost) => ({
      platform: "facebook",
      content: post.message,
      author: post.from.name,
      timestamp: new Date(post.created_time).getTime(),
      url: `https://facebook.com/${post.id}`,
    }));
  }
}
