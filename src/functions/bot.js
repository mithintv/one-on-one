const { app } = require("../lib/slack")

async function getBotId() {
  try {
    const { user_id } = await app.client.auth.test()
    return user_id
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getBotId }
