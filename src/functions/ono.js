import app from "../lib/slack.js"
import monogo from "../lib/mongo.js"

// creates one-on-one channel and returns ok response and channel id
export async function createChannel(token) {
  try {
    const { ok, channel } = await app.client.conversations.create({
      token,
      name: "one-on-one"
    })

    // save channel id to DB
    console.log('successfully created one-on-one channel')
    return { ok, onoChannelId: channel.id }
  } catch (error) {
    console.error(error);
  }
}

export async function setTimer() {

}
