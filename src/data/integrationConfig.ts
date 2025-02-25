export const integrationConfig = {
  data: {
    date: {
      created_at: "2023-10-01",
      updated_at: "2023-10-01",
    },
    descriptions: {
      app_description:
        "Real-time social media monitoring system that tracks mentions across Twitter and Facebook, delivering instant notifications through Telex.",
      app_logo: "https://i.postimg.cc/X7fDTwSx/website-template-3335753-1280.jpg",
      app_name: "Social Media Monitor",
      app_url: "https://social-media-monitor.onrender.com/integration-config",
      background_color: "#1DA1F2",
    },
    integration_category: "Monitoring & Logging",
    integration_type: "interval",
    is_active: true,
    output: [
      {
        label: "twitter_mentions",
        value: true,
      },
      {
        label: "facebook_mentions",
        value: true,
      },
    ],
    key_features: [
      "Real-time Twitter mention tracking",
      "Facebook page mention monitoring",
      "Instant Telex notifications",
    ],
    permissions: {
      monitoring_user: {
        always_online: true,
        display_name: "Social Media Monitor",
      },
    },
    settings: [
      {
        label: "Monitoring Interval",
        type: "text",
        required: true,
        default: "*/5 * * * *",
      },
      {
        label: "Twitter API Key",
        type: "text",
        required: true,
        default: "",
      },
      {
        label: "Facebook Access Token",
        type: "text",
        required: true,
        default: "",
      },
      {
        label: "Mention Alert Priority",
        type: "dropdown",
        required: true,
        default: "High",
        options: ["High", "Low"],
      },
      {
        label: "Monitor Platforms",
        type: "multi-checkbox",
        required: true,
        default: "Twitter",
        options: ["Twitter", "Facebook"],
      },
    ],
    tick_url: "https://social-media-monitor.onrender.com/monitor/tick",
    target_url: "https://social-media-monitor.onrender.com/monitor/target",
  },
};
