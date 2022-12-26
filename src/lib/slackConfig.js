import "dotenv/config";

import { App, ExpressReceiver, LogLevel } from "@slack/bolt";
import { deleteInstallation, fetchInstallation, saveInstallation } from "./mongo";

export const receiver = new ExpressReceiver({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  stateSecret: process.env.SLACK_STATE,
  scopes: ['channels:history', 'channels:read', 'chat:write', 'commands', 'groups:history', 'groups:read', 'im:history', 'im:read', 'mpim:history', 'mpim:read', 'app_mentions:read'],
  installerOptions: {
    // If below is true, /slack/install redirects installers to the Slack authorize URL
    // without rendering the web page with "Add to Slack" button.
    // This flag is available in @slack/bolt v3.7 or higher
    // directInstall: true,
  },
  installationStore: {
    storeInstallation: async (installation) => {

      // Bolt will pass your handler an installation object
      // if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
      //   // handle storing org-wide app installation
      //   const result = await enterprises.insertOne(installation);
      //   console.log(`A new enterprise was inserted with the _id: ${result.insertedId}`);
      //   return;
      // }

      if (installation.team !== undefined) {
        // single team app installation
        const result = await saveInstallation(installation);
        if (result.insertedId) {
          console.log(`A new workspace named ${installation.team.name} was installed with the id: ${result.insertedId} `);
        }
      }


      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      // Bolt will pass your handler an installQuery object
      // if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
      //   // handle org wide app installation lookup
      //   // return await database.get(installQuery.enterpriseId);
      // }

      if (installQuery.teamId !== undefined) {
        // single team app installation lookup
        return await fetchInstallation(installQuery);
      }

      throw new Error('Failed fetching installation');
    },
    deleteInstallation: async (installQuery) => {
      // Bolt will pass your handler  an installQuery object
      // if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
      //   // org wide app installation deletion
      //   // return await database.delete(installQuery.enterpriseId);
      // }

      if (installQuery.teamId !== undefined) {
        // single team app installation deletion
        return await deleteInstallation(installQuery.teamId);
      }
      throw new Error('Failed to delete installation');
    }
  },
});

const app = new App({
  receiver,
  ignoreSelf: false,
  // logLevel: LogLevel.DEBUG
});


export default app;
