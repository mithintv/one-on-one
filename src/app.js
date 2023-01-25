import app from "./lib/slackConfig.js";
import mongo from "./lib/mongo.js";
// slack listeners
import registerListeners from "./listeners/index.js";

await mongo.connect();
console.log('Successfully connected to database');

// registers commands for bot
registerListeners(app);

(async () => {
  await app.start(process.env.PORT || 3080);
  console.log('Bolt app is running');
})();
