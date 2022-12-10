
export async function getBotId(slack) {
  try {
    const { user_id } = await slack.auth.test();
    return user_id;
  } catch (error) {
    console.error(error);
  }
}
