import app from "./src/lib/slack.js"
import client from "./src/lib/mongo.js"

// slack functions
import { fetchGeneralChannelId, postToGeneral } from "./src/functions/general.js";
import { createChannel } from "./src/functions/ono.js";
import { getBotId } from './src/functions/bot.js';
import { fetchConversations } from "./src/functions/conversations.js";


await (async () => {
  // Start your app
  const port = process.env.PORT || 3080;
  await app.start(port);
  console.log(`⚡️ Bolt app is running on port ${port}!`);
  await client.connect()
  console.log('Successfully connected to database')

})();

export async function initialization(token) {
  try {
    const response = await createChannel(token)
    if (response.ok) {
      const success = await postToGeneral(token, response.onoChannelId)
      if (success.ok) {
        console.log('successfully posted introduction message in general channel')
      }
    }
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
    })
    return history;
  } catch (error) {
    console.error(error);
  }
}

async function getBotPosts(channelId) {
  try {
    const { messages } = await channelHistory(channelId);
    const botId = await getBotId()
    const botMessage = messages.find(message => message.user === botId);
    if (botMessage.subtype === 'channel_join') {
      throw new Error("can't find a message in the channel to delete")
    } else return botMessage;
  } catch (error) {
    console.error(error)
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
    const message = await getBotPosts(channelId)
    if (message) deleteRecentPost(message, channelId)
  } catch (error) {
    console.error(); (error.message);
  }
}


// deleteRecentMessage(process.env.DM)
// deleteRecentMessage(process.env.GENERAL)
