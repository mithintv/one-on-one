import "dotenv/config";
// import axios from 'axios';

import pkg from "@slack/bolt";
import mongo from "./mongo.js";

// custom routes
import slack from "../routes/slack.js";

// import { WebClient, LogLevel } from "@slack/web-api";

const { App, ExpressReceiver, LogLevel } = pkg;

export const receiver = new ExpressReceiver({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  stateSecret: process.env.SLACK_STATE,
  scopes: ['channels:history', 'channels:join', 'channels:manage', 'channels:read', 'chat:write', 'groups:history', 'groups:read', 'groups:write', 'im:history', 'im:read', 'im:write', 'mpim:history', 'mpim:read', 'mpim:write', 'commands'],
  installerOptions: {
    // If below is true, /slack/install redirects installers to the Slack authorize URL
    // without rendering the web page with "Add to Slack" button.
    // This flag is available in @slack/bolt v3.7 or higher
    // directInstall: true,
  },
  installationStore: {
    storeInstallation: async (installation) => {
      // Bolt will pass your handler an installation object
      // Change the lines below so they save to your database
      await mongo.connect();
      const database = mongo.db("one-on-one");
      const workspaces = database.collection("workspaces");
      const enterprises = database.collection('enterprise');

      if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
        // handle storing org-wide app installation
        const result = await enterprises.insertOne(installation);
        console.log(`A new enterprise was inserted with the _id: ${result.insertedId}`);
        return;
      }

      if (installation.team !== undefined) {
        // single team app installation
        const result = await workspaces.insertOne(installation);
        console.log(`A new workspace was inserted with the _id: ${result.insertedId}`);
        return;
      }


      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      // Bolt will pass your handler an installQuery object
      // Change the lines below so they fetch from your database
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        // handle org wide app installation lookup
        // return await database.get(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation lookup
        await mongo.connect();
        const workspaces = mongo.db("one-on-one").collection("workspaces");
        return await workspaces.findOne({ "team.id": installQuery.teamId });
      }
      throw new Error('Failed fetching installation');
    },
    deleteInstallation: async (installQuery) => {
      // Bolt will pass your handler  an installQuery object
      // Change the lines below so they delete from your database
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        // org wide app installation deletion
        // return await database.delete(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation deletion
        await mongo.connect();
        const workspaces = mongo.db("one-on-one").collection("workspaces");
        return await workspaces.deleteOne({ 'team.id': installQuery.teamId });
      }
      throw new Error('Failed to delete installation');
    }
  },
});

// group custom routes
receiver.app.use('/slack', slack);

const app = new App({
  receiver,
  logLevel: LogLevel.DEBUG
});



export default app;

// install function
export async function install(code) {
  const data = {
    code,
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET
  };
  const response = await axios.postForm('https://slack.com/api/oauth.v2.access', data,
    { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
  ).then(async function (response) {
    const { authed_user: { access_token } } = response.data;
    const result = await saveInstallation(response.data);
    const slack = getAuth(response.data.access_token);
    if (result.acknowledged) {
      console.log(`successfully installed new workspace with id: ${result.insertedId}`);
      return { slack, user_token: access_token, response: result.acknowledged };
    }
  }).catch(error => {
    console.log(error);
  });
  return response;
}

// uninstall function
export async function uninstall(req) {
  const { team_id } = await req.body;
  const result = await deleteInstallation(team_id);
  if (result.deletedCount === 1) {
    console.log(`successfully deleted workspace with team_id: ${team_id}`);
  };
}

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
export async function getAuth(token) {
  const slack = new WebClient(token, {
    // LogLevel can be imported and used to make debugging simpler
    // logLevel: LogLevel.DEBUG
  });
  return slack;
}
