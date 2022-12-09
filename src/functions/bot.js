import app from "../lib/slack.js"

export async function getBotId(token) {
  try {
    const { user_id } = await app.client.auth.test({
      token
    })
    return user_id
  } catch (error) {
    console.error(error);
  }
}
