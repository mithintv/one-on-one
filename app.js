import app from "./src/lib/slackConfig";
import mongo from "./src/lib/mongo";
// slack listeners
import registerListeners from "./src/listeners/index";

await mongo.connect();
console.log('Successfully connected to database');

// registers commands for bot
registerListeners(app);

(async () => {
  await app.start(3080);
  console.log('Express app is running');
})();
