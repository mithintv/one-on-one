require("dotenv").config()

const { App, LogLevel } = require('@slack/bolt');
const { FileInstallationStore } = require('@slack/oauth');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // clientId: process.env.SLACK_CLIENT_ID,
  // clientSecret: process.env.SLACK_CLIENT_SECRET,
  // stateSecret: 'my-state-secret',
  // scopes: ['channels:history', 'chat:write', 'commands'],
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // installationStore: new FileInstallationStore(),
});

// /** Register Listeners */
// registerListeners(app);

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  console.log(message)
  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  // Start your app
  let port = 3080;
  await app.start();

  console.log(`⚡️ Bolt app is running on port ${port}!`);
})();
