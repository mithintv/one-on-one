const { app } = require("../lib/slack")

async function fetchGeneralChannelId() {
  try {
    const conversations = await app.client.conversations.list()
    const { id } = conversations.channels.find(channel => channel.name === 'general')
    return id;
  } catch (error) {
    console.error(error)
  }
}

async function joinGeneralChannel() {
  try {
    const generalChannelId = await fetchGeneralChannelId()
    const result = app.client.conversations.join({
      channel: generalChannelId
    })
    return result
  } catch (error) {
    console.error(error)
  }
}

async function postToGeneral() {
  try {
    const response = await joinGeneralChannel()
    if (response.ok) {
      // Call the chat.postMessage method using the WebClient
      const result = await app.client.chat.postMessage({
        channel: response.channel.id,
        text: "Hello! I am the One-on-One bot. I specialize in pairing individuals in the channel who are interested in learning more about each other in a one-on-one enviornment. Participation is completely optional. To get started, join the @one-on-one channel I created."
      });
    }
  }
  catch (error) {
    console.error(error);
  }
}


module.exports = { fetchGeneralChannelId, joinGeneralChannel, postToGeneral }
