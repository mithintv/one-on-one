const { app } = require("./src/lib/slack")
const { fetchGeneralChannelId } = require("./src/functions/general")


// /** Register Listeners */
// registerListeners(app);

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  console.log(message)
  await say(`Hey there <@${message.user}>!`);
});



(async () => {
  // Start your app
  let port = 3080;
  await app.start();

  console.log(`⚡️ Bolt app is running on port ${port}!`);
})();




async function channelHistory() {
  try {
    const generalChannelId = await fetchGeneralChannelId()
    const history = await app.client.conversations.history({
      channel: generalChannelId
    })
    console.log(history)
    return history;
  } catch (error) {
    console.error(error);
  }
}

async function getBotId() {
  try {
    const { user_id } = await app.client.auth.test()
    return user_id
  } catch (error) {
    console.error(error);
  }
}

async function getBotPosts() {
  try {
    const { messages } = await channelHistory();
    const botId = await getBotId()
    const botMessage = messages.find(message => message.user === botId);
    return botMessage;
  } catch (error) {
    console.error(error)
  }
}

async function deletePost(message) {
  try {
    const generalChannelId = await fetchGeneralChannelId()
    console.log(message.ts)
    // Call the chat.delete method using the WebClient
    const result = await app.client.chat.delete({
      channel: generalChannelId,
      ts: message.ts
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}

async function deleteMessage() {
  try {
    const message = await getBotPosts()
    deletePost(message)
  } catch (error) {
    console.error(error);
  }
}
