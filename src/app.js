import serverless from 'serverless-http';
import app from "./lib/slackConfig.js";
import mongo from "./lib/mongo.js";
// slack listeners
import registerListeners from "./listeners/index.js";


// connect to db
(async () => {
  await mongo.connect();
  console.log('Successfully connected to database');
})();


// registers commands for bot
registerListeners(app);

// set port
let port = process.env.PORT || 3080;

// (async () => {
//   await app.start(port);
//   console.log(`Bolt app is running on port ${port}`);
// })();

export const handler = serverless(app);
