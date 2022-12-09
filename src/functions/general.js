import app from "../lib/slack.js"
import { getBotId } from "../functions/bot.js"

export async function fetchGeneralChannelId(token) {
  try {
    const conversations = await app.client.conversations.list({
      token
    })
    const { id } = conversations.channels.find(channel => channel.name === 'general')
    return id;
  } catch (error) {
    console.error(error)
  }
}

export async function checkGeneralMembership(token, channelId) {
  try {
    const { members } = await app.client.conversations.members({
      token,
      channel: channelId
    })
    const botId = await getBotId(token)
    return members.find(botId) ? true : false
  } catch (error) {

  }
}

export async function joinGeneralChannel(token, channelId) {
  try {
    const response = await app.client.conversations.join({
      token,
      channel: channelId
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

export async function postToGeneral(token, onoChannelId) {
  try {
    const channelId = await fetchGeneralChannelId(token)
    const membership = await checkGeneralMembership(token, channelId)
    if (!membership) {
      await joinGeneralChannel(token, channelId)
    }

    // Call the chat.postMessage method using the WebClient
    const response = await app.client.chat.postMessage({
      token,
      channel: channelId,
      text: `Hello! I am the One-on-One bot. I specialize in pairing individuals in the channel who are interested in learning more about each other in a one-on-one enviornment. Participation is completely optional. To get started, join the <#${onoChannelId}> channel I created.`
    });
    return response
  }
  catch (error) {
    console.error(error);
  }
}
