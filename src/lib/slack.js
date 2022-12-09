import "dotenv/config"
import bolt from '@slack/bolt'
const { App, LogLevel } = bolt
import oauth from '@slack/oauth'
const { FileInstallationStore } = oauth

export default new App({
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
