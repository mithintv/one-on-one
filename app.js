import mongo from "./src/lib/mongo.js";
import app from "./src/lib/slackConfig.js";

// slack events
import registerListeners from "./src/listeners/index.js";

await mongo.connect();
console.log('Successfully connected to database');

// registers commands for bot
registerListeners(app);

(async () => {
  await app.start(3080);
  console.log('Express app is running');
})();
