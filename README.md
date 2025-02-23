# Social Media Monitoring Integration with Telex

A Node.js application that monitors social media platforms (Facebook, Twitter) for company mentions and delivers real-time notifications through Telex. Built with Hono as a lightweight web framework for Node.js environments.

## Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install

   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
 PORT=3000
FACEBOOK_ACCESS_TOKEN=your-facebook-access-token
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-api-secret
CHANNEL_ID=your-telex-channel-id

   ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

### Production Mode

To build and run the application in production mode:

```bash
npm run build
npm start
```

The server will start on the port specified in the `.env` file (default is 3000).

## API Endpoints

### POST /monitor/tick

Triggers a check for new mentions across configured social platforms. Expects a JSON payload:

```json
{
  "companyHandle": "string",
  "pageId": "string",
  "interval": number,
  "platforms": ["twitter", "facebook"]
}

```

An incoming message is added to a background processing queue

### GET /health

Returns a JSON response confirming the server health:

```json
{ "status": "healthy" }
```

### GET /integration-config

Returns the integration configuration for Telex. Use this configuration to set up your integration in the Telex dashboard.

## Features

- **Real-time Social Media Monitoring:** Track mentions across Twitter and Facebook.
- **Queued Processing:** Reliable message processing through a queue system.
- **Platform Integration:**  Official SDK integration with Facebook and Twitter.
- **Instant Notifications:**  Real-time alerts through Telex.
- **Configurable Monitoring:**  Customizable tracking parameters.
- **CORS Support:** Allows cross-origin requests to ease integration.
- **Node.js Server:** Runs as a standalone Node.js application using Hono, making it easy to deploy on platforms like EC2.

## Development

To run the application locally with hot-reloading:

```bash
npm run dev
```

## License

This README provides clear instructions for setup, usage, and features of the social media monitoring system, making it easy for users to get started with the integration.

