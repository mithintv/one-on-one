import mongo, { fetchInstallation, updateInstallation } from "../lib/mongo.js";
import shuffle from "../functions/shuffle.js";

import { checkBotMembership } from "../functions/bot.js";

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
    console.log(command);
    // Obtain user and channel_id
    const { user_id, channel_id, team_id, text } = command;

    // Check if bot is in the channel
    const { bot_id, members, membership } = await checkBotMembership(command, client);

    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/frequency can only be called on channels that <@${bot_id}> has joined`);
      return;
    } else {

      // Fetch installtion
      const team = await fetchInstallation({}, team_id);
      // If no parameters are set, output current frequency
      if (!text) {
        const frequency = team[channel_id][user_id];
        await respond(`Your current frequency of one-on-one's in this channel is every ${frequency} days.`);
      }
      // If a parameter is passed and is a valid number from 1 to 365, set it as new frequency
      else if (text && parseInt(text) !== NaN && parseInt(text) >= 1 && parseInt(text) <= 365) {
        const channel = team[channel_id];
        // Create a document that sets the frequency of specific user
        const updateDoc = {
          $set: {
            [channel_id]: {
              ...channel,
              [user_id]: text,
            }
          },
        };
        const result = await updateInstallation(team_id, updateDoc);
        console.log(result);
        await respond(`Your new frequency of one-on-one's in this channel is every ${text} days.`);
      }
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
