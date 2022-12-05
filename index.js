require("dotenv").config()

const { App } = require('@slack/bolt');
const { FileInstallationStore } = require('@slack/oauth');
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  scopes: ['channels:history', 'chat:write', 'commands'],
  installationStore: new FileInstallationStore(),
});

(async () => {
  // Start your app
  let port = 3080;
  await app.start(process.env.PORT || port);

  console.log(`⚡️ Bolt app is running on port ${port}!`);
})();
