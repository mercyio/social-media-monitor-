// New Telex webhook types
export interface TelexWebhookPayload {
  channel_id: string;
  settings: TelexSetting[];
  message: string;
}

export interface TelexSetting {
  label: string;
  type: string;
  description: string;
  default: any;
  required: boolean;
}

export interface TelexResponse {
  event_name: string;
  message: string;
  status: string;
  username: string;
}

export interface SocialMention {
  platform: "twitter" | "facebook";
  content: string;
  author: string;
  timestamp: number;
  url: string;
  metadata?: {
    pageId?: string;
    postId?: string;
    tweetId?: string;
  };
}

export interface FacebookPost {
  message: string;
  created_time: string;
  from: {
    name: string;
  };
  id: string;
}