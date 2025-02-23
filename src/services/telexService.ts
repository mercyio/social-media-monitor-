import { TelexResponse, SocialMention } from "../types";
import { StorageService } from "./storageService";

export class TelexService {
  private storage: StorageService;
  private readonly TELEX_RETURN_URL = "https://ping.telex.im/v1/return";

  constructor(storage: StorageService) {
    this.storage = storage;
  }

  async sendTelexResponse(channelId: string, message: string): Promise<void> {
    const response: TelexResponse = {
      event_name: "message_formatted",
      message,
      status: "success",
      username: "Social Monitor"
    };

    const url = `${this.TELEX_RETURN_URL}/${channelId}`;
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });

    if (!result.ok) {
      throw new Error(`Failed to send response to Telex: ${result.statusText}`);
    }
  }

  formatMentionMessage(mention: SocialMention): string {
    return `🔔 New mention on ${mention.platform.toUpperCase()}!
From: ${mention.author}
Content: ${mention.content}
Link: ${mention.url}`;
  }
}