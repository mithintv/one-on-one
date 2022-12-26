import mongo from "./src/lib/mongo.mjs";
import app from "./src/lib/slackConfig.mjs";
// slack listeners
import registerListeners from "./src/listeners/index.mjs";

await mongo.connect();
console.log('Successfully connected to database');

// registers commands for bot
registerListeners(app);

(async () => {
  await app.start(3080);
  console.log('Express app is running');
})();
