const { app } = require("./src/lib/slack")

// slack functions
const { fetchGeneralChannelId, postToGeneral } = require("./src/functions/general");
const { createChannel } = require("./src/functions/ono");
const { getBotId } = require('./src/functions/bot');


(async () => {
  // Start your app
  let port = 3080;
  await app.start();

  console.log(`⚡️ Bolt app is running on port ${port}!`);
})();


async function initialization() {
  try {
    const response = await createChannel()
    if (response.ok) {
      const success = await postToGeneral(response.onoChannelId)
      if (success.ok) {
        console.log('successfully posted introduction message in general channel')
      }
    }
  } catch (error) {
    console.error(error);
  }
}
// initialization()

async function channelHistory() {
  try {
    const generalChannelId = await fetchGeneralChannelId()
    const history = await app.client.conversations.history({
      channel: generalChannelId
    })
    return history;
  } catch (error) {
    console.error(error);
  }
}


async function getBotPosts() {
  try {
    const { messages } = await channelHistory();
    const botId = await getBotId()
    const botMessage = messages.find(message => message.user === botId);
    if (botMessage.subtype === 'channel_join') {
      throw new Error("can't find a message on general channel to delete")
    } else return botMessage;
  } catch (error) {
    console.error(error)
  }
}

async function deletePost(message) {
  try {
    const generalChannelId = await fetchGeneralChannelId()
    // Call the chat.delete method using the WebClient
    const response = await app.client.chat.delete({
      channel: generalChannelId,
      ts: message.ts
    });
    if (response.ok) {
      console.log('successfully deleted most recent message in the general channel');
    }
  }
  catch (error) {
    console.error(error);
  }
}

async function deleteRecentMessage() {
  try {
    const message = await getBotPosts()
    if (message) deletePost(message)
  } catch (error) {
    console.error(); (error.message);
  }
}

deleteRecentMessage()
