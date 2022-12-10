import express from "express";
import axios from 'axios';

// import slack from "./src/lib/slack.js";
import mongo, { saveInstallation, deleteInstallation } from "./src/lib/mongo.js";

// slack functions
import { fetchGeneralChannelId, postToGeneral } from "./src/functions/general.js";
import { createChannel } from "./src/functions/ono.js";
import { getBotId } from './src/functions/bot.js';
import { fetchConversations } from "./src/functions/conversations.js";
import { install, uninstall } from "./src/lib/slack.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3080;

await mongo.connect();
console.log('Successfully connected to database');


app.get('/slack/install', async (req, res) => {
  res.redirect(`https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&state=${process.env.SLACK_STATE}&scope=channels:history,channels:join,channels:manage,channels:read,chat:write,groups:history,groups:read,im:history,im:read,mpim:history,mpim:read,mpim:write,im:write,groups:write&user_scope=`);
});

app.get('/slack/oauth_redirect', async (req, res) => {
  const { code, state } = req.query;
  if (state === process.env.SLACK_STATE) {
    const result = await install(code);
    if (result) res.send('installation successful');
  }
});

app.post('/slack/events', async (req, res) => {
  res.sendStatus(200);
  if (req.body.event.type === 'app_uninstalled') {
    await uninstall(req);
  } else {
    console.log('recieved event');
    console.log(req.body);
  }
});


app.listen(port, () => {
  console.log(`ONO Bot is running on port ${port}!`);
});





export async function initialization(token) {
  try {
    const response = await createChannel(token);
    if (response.ok) {
      const success = await postToGeneral(token, response.onoChannelId);
      if (success.ok) {
        console.log('successfully posted introduction message in general channel');
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
