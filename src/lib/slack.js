import "dotenv/config";

import mongo from "../lib/mongo.js";


import { WebClient, LogLevel } from "@slack/web-api";

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const slack = new WebClient(process.env.OAUTH_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});

export default slack;

// const app = new App({
//   clientId: process.env.SLACK_CLIENT_ID,
//   clientSecret: process.env.SLACK_CLIENT_SECRET,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   stateSecret: 'my-state-secret',
//   scopes: ['channels:history', 'channels:join', 'channels:manage', 'channels:read', 'chat:write', 'groups:history', 'groups:read', 'groups:write', 'im:history', 'im:read', 'im:write', 'mpim:history', 'mpim:read', 'mpim:write', 'commands'],
//   // socketMode: true,
//   installationStore: {
//     storeInstallation: async (installation) => {
//       // Bolt will pass your handler an installation object
//       // Change the lines below so they save to your database
//       let id;
//       await mongo.connect()
//       const database = mongo.db("one-on-one");
//       const workspaces = database.collection("workspaces");
//       const enterprises = database.collection('enterprise');

//       if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
//         // handle storing org-wide app installation
//         const result = await enterprises.insertOne(installation);
//         console.log(`A new enterprise was inserted with the _id: ${result.insertedId}`);
//         return
//       }

//       if (installation.team !== undefined) {
//         // single team app installation
//         const result = await workspaces.insertOne(installation);
//         console.log(`A new workspace was inserted with the _id: ${result.insertedId}`);
//         id = result.insertedId;

//         initialization(installation.bot.token)
//         return
//       }


//       throw new Error('Failed saving installation data to installationStore');
//     }
//   },
//   fetchInstallation: async (installQuery) => {
//     console.log('fetching: ' + installQuery)
//     // Bolt will pass your handler an installQuery object
//     // Change the lines below so they fetch from your database
//     if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
//       // handle org wide app installation lookup
//       // return await database.get(installQuery.enterpriseId);
//     }
//     if (installQuery.teamId !== undefined) {
//       // single team app installation lookup
//       await mongo.connect()
//       const database = mongo.db("one-on-one");
//       const workspaces = database.collection("workspaces");
//       const query = { team: { id: installQuery.teamId } }
//       const team = await workspaces.findOne(query);

//       return team;
//     }
//     throw new Error('Failed fetching installation');
//   },
//   deleteInstallation: async (installQuery) => {
//     // Bolt will pass your handler  an installQuery object
//     // Change the lines below so they delete from your database
//     if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
//       // org wide app installation deletion
//       // return await database.delete(installQuery.enterpriseId);
//     }
//     if (installQuery.teamId !== undefined) {
//       // single team app installation deletion
//       await mongo.connect()
//       const database = mongo.db("one-on-one");
//       const workspaces = database.collection("workspaces");
//       const query = { team: { id: installQuery.teamId } }
//       const team = await workspaces.deleteOne(query);
//       return team;
//     }
//     throw new Error('Failed to delete installation');
//   },
// });




// export default app
