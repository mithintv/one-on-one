const { app } = require("../lib/slack")

async function createChannel() {
  try {
    const response = await app.client.conversations.create("one-on-one")
    console.log(response)
    return response
  } catch (error) {
    console.error(error);
  }
}
