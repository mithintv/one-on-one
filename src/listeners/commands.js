import mongo from "../lib/mongo.js";
import shuffle from "../functions/shuffle.js";

const checkBotMembership = async (command, client) => {
  // Obtain channel id where command was executed
  const { channel_id } = command;
  // Get list of members in channel
  let { members } = await client.conversations.members({
    channel: channel_id
  });
  // Obtain bot id
  const { user_id: bot_id } = await client.auth.test();

  // Return membership status
  if (members.includes(bot_id)) {
    // If bot is a member, return members array without bot
    members = members.filter(member => member !== bot_id);
    return { bot_id, members, membership: true };
  }
  // Otherwise, return members as is with membership set to false
  else {
    return { bot_id, members, membership: false };
  };
};

const pair = async ({ client, command, ack, respond }) => {

  try {
    // Acknowledge command request
    await ack();

    const { bot_id, members, membership } = await checkBotMembership(command, client);
    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/pair can only be called on channels that <@${bot_id}> has joined`);
      return;
    } else {

      // Comment below line to create odd pairings
      members = members.filter(member => member !== 'U04EMKFLADB');

      // Shuffle members array
      members = shuffle(members);
      console.log(members);

      // Create output message for pairings
      let pairings = "Here are this week's pairings: \n";

      // Even pairings
      for (let i = 0; i < members.length; i++) {
        if (i % 2 === 0) {
          pairings = pairings.concat(`<@${members[i]}>`, ' <-> ');
        } else pairings = pairings.concat(`<@${members[i]}>`, '\n');
      }
      // Odd pairings
      if (members.length % 2 !== 0) {
        pairings = pairings.concat(`<@${members[0]}>`);
      }

      console.log(pairings);
      await respond(pairings);
    }
  } catch (error) {
    console.error(error);
  }
};


const frequency = async ({ client, command, ack, respond }) => {
  try {
    // Acknowledge command request
    await ack();

    // Obtain user and channel_id
    const { user_id, channel_id, team_id } = command;
    await mongo.connect();
    const workspaces = mongo.db('one-on-one').collection('workspaces');
    const team = workspaces.findOne({ 'team.id': team_id });

    // Check if bot is in the channel
    const { bot_id, members, membership } = await checkBotMembership(command, client);
    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/frequency can only be called on channels that <@${bot_id}> has joined`);
      return;
    } else {

      // create a document that sets the plot of the movie
      const updateDoc = {
        $set: {
          [channel_id]: `A harvest of random numbers, such as: ${Math.random()}`
        },
      };

      console.log(command);
    }
  }
  catch (error) {
    console.error(error);
  }
};



export default function registerCommands(app) {

  app.command('/pair', pair);
  app.command('/frequency', frequency);
}
