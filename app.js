import mongo from "./src/lib/mongo.js";
import app from "./src/lib/slackConfig.js";


// slack events
import registerListeners from "./src/listeners/index.js";

// slack functions
import { fetchGeneralChannelId, postToGeneral } from "./src/functions/general.js";
import { createChannel, setTimer } from "./src/functions/ono.js";
import { getBotId } from './src/functions/bot.js';



await mongo.connect();
console.log('Successfully connected to database');

// registers commands for bot
registerListeners(app);

(async () => {
  await app.start(3080);
  console.log('Express app is running');
})();

export async function initialization(slack, user_token) {
  try {
    const { ok, onoChannelId } = await createChannel(slack);
    if (ok) {
      const success = await postToGeneral(slack, onoChannelId);
      if (success.ok) {
        console.log('successfully posted introduction message in general channel');
      }
    }
    const reminder = await setTimer(slack, user_token);
  } catch (error) {
    console.error(error);
  }
}




// Deleting a message
// 1. Find channel id
// 2. Find conversation history
// 3. Get specific message timestamp (ts)
// 4. Call delete with channel id & message ts

async function channelHistory(channelId) {
  try {
    const history = await app.client.conversations.history({
      channel: channelId
    });
    return history;
  } catch (error) {
    console.error(error);
  }
}

async function getBotPosts(channelId) {
  try {
    const { messages } = await channelHistory(channelId);
    const botId = await getBotId();
    const botMessage = messages.find(message => message.user === botId);
    if (botMessage.subtype === 'channel_join') {
      throw new Error("can't find a message in the channel to delete");
    } else return botMessage;
  } catch (error) {
    console.error(error);
  }
}

async function deleteRecentPost(message, channelId) {
  try {
    // Call the chat.delete method using the WebClient
    const response = await app.client.chat.delete({
      channel: channelId,
      ts: message.ts
    });
    if (response.ok) {
      console.log('successfully deleted most recent message in the channel');
    }
  }
  catch (error) {
    console.error(error);
  }
}

async function deleteRecentMessage(channelId) {
  try {
    const message = await getBotPosts(channelId);
    if (message) deleteRecentPost(message, channelId);
  } catch (error) {
    console.error(); (error.message);
  }
}


// deleteRecentMessage(process.env.DM)
// deleteRecentMessage(process.env.GENERAL)
