import app from "../lib/slack.js"
import { getBotId } from "../functions/bot.js"

export async function fetchGeneralChannelId() {
  try {
    const conversations = await app.client.conversations.list()
    const { id } = conversations.channels.find(channel => channel.name === 'general')
    return id;
  } catch (error) {
    console.error(error)
  }
}

export async function checkGeneralMembership(channelId) {
  try {
    const { members } = await app.client.conversations.members({
      channel: channelId
    })
    const botId = await getBotId()
    return members.find(botId) ? true : false
  } catch (error) {

  }
}

export async function joinGeneralChannel(channelId) {
  try {
    const response = app.client.conversations.join({
      channel: channelId
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

export async function postToGeneral(onoChannelId) {
  try {
    const channelId = await fetchGeneralChannelId()
    let membership = checkGeneralMembership(channelId)
    if (!membership) {
      const response = await joinGeneralChannel(channelId)
      if (response.ok) membership = true;
    }
    if (membership) {
      // Call the chat.postMessage method using the WebClient
      const response = await app.client.chat.postMessage({
        channel: channelId,
        text: `Hello! I am the One-on-One bot. I specialize in pairing individuals in the channel who are interested in learning more about each other in a one-on-one enviornment. Participation is completely optional. To get started, join the <#${onoChannelId}> channel I created.`
      });
      return response
    }
  }
  catch (error) {
    console.error(error);
  }
}
