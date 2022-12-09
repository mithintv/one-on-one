import app from "../lib/slack.js"
import { getBotId } from "../functions/bot.js"

export async function fetchConversations() {
  try {
    const conversations = await app.client.conversations.list()
    console.log(conversations);
    return conversations;
  } catch (error) {
    console.error(error)
  }
}
