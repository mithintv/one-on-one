import app from "../lib/slack.js"

// creates one-on-one channel and returns ok response and channel id
export async function createChannel() {
  try {
    const { ok, channel } = await app.client.conversations.create({
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
