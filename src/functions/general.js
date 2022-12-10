import slack from "../lib/slack.js";
import { getBotId } from "../functions/bot.js";

export async function fetchGeneralChannelId(slack) {
  try {
    const conversations = await slack.conversations.list();
    const { id } = conversations.channels.find(channel => channel.name === 'general');
    return id;
  } catch (error) {
    console.error(error);
  }
}

export async function checkGeneralMembership(slack, channelId) {
  try {
    const { members } = await slack.conversations.members({
      channel: channelId
    });
    const botId = await getBotId(slack);
    return members.find(botId) ? true : false;
  } catch (error) {

  }
}

export async function joinGeneralChannel(slack, channelId) {
  try {
    const response = await slack.conversations.join({
      channel: channelId
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function postToGeneral(slack, onoChannelId) {
  try {
    const channelId = await fetchGeneralChannelId(slack);
    const membership = await checkGeneralMembership(slack, channelId);
    if (!membership) {
      await joinGeneralChannel(slack, channelId);
    }

    // Call the chat.postMessage method using the WebClient
    const response = await slack.chat.postMessage({
      channel: channelId,
      text: `Hello! I am the One-on-One bot. I specialize in pairing individuals in the channel who are interested in learning more about each other in a one-on-one enviornment. Participation is completely optional. To get started, join the <#${onoChannelId}> channel I created.`
    });
    return response;
  }
  catch (error) {
    console.error(error);
  }
}
