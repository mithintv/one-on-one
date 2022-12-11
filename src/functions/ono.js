
// creates one-on-one channel and returns ok response and channel id
export async function createChannel(slack) {
  try {
    const { ok, channel } = await slack.conversations.create({
      name: "one-on-one"
    });

    // save channel id to DB
    console.log('successfully created one-on-one channel');
    return { ok, onoChannelId: channel.id };
  } catch (error) {
    console.error(error);
  }
}

export async function setTimer(slack, user_token) {
  try {
    const response = slack.reminders.add({
      token: user_token,
      text: `create pairings in 5 seconds`,
      time: 'in 5 seconds'
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
