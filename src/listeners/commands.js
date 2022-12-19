import mongo, { fetchInstallation, updateInstallation } from "../lib/mongo.js";
import shuffle from "../functions/shuffle.js";

import { checkBotMembership } from "../functions/bot.js";

const pair = async ({ client, command, ack, respond }) => {

  try {
    // Acknowledge command request
    await ack();

    const { bot_id, membership } = await checkBotMembership(command, client);
    let { members } = await checkBotMembership(command, client);
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
      const frequency = team[channel_id][user_id].frequency;
      if (!text) {
        await respond(`Your current frequency of one-on-one's in this channel is every ${frequency} days.`);
      }
      // If a parameter is passed and is a valid number from 1 to 365, set it as new frequency
      else if (text && parseInt(text) !== NaN && parseInt(text) >= 1 && parseInt(text) <= 90) {
        const channel = team[channel_id];
        const user = channel[user_id];
        // Create a document that sets the frequency of specific user
        const updateDoc = {
          $set: {
            [channel_id]: {
              ...channel,
              [user_id]: {
                ...user,
                frequency: text
              },
            }
          },
        };
        const result = await updateInstallation(team_id, updateDoc);
        console.log(result);
        await respond(`Your new frequency of one-on-one's in this channel is every ${text} days.`);
      }
      else {
        await respond(`You inputted an invalid value for frequency of one-on-one's. Only numeric values from 1 to 90 are accepted. Your current frequency of one-on-one's in this channel is every ${frequency} days.`);
      }
    }
  }
  catch (error) {
    console.error(error);
  }
};

const block = async ({ client, command, ack, respond }) => {
  try {
    console.log(command);

    // Acknowledge command request
    await ack();

    // Obtain user, channel_id, team_id and parameters
    const { user_id, channel_id, team_id, text } = command;

    // Check if bot is in the channel
    const { bot_id, members, membership } = await checkBotMembership(command, client);

    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/block can only be called on channels that <@${bot_id}> has joined`);
      return;
    } else {

      // Fetch installtion
      let team = await fetchInstallation({}, team_id);
      // If no parameters are set, output current restrictions
      let block = team[channel_id][user_id].restrict;
      if (!text && block.length === 0) {
        await respond("You are currenlt being paired with everyone on this channel for one-on-one's with no restrictions.");
      }
      else if (!text) {
        let response = "You are currently not being paired with the following members in this channel for one-on-one's:\n";
        console.log(block);
        block.forEach(element => {
          response = response + `<@${element}>\n`;
        });
        await respond(response);
      } else {
        // Check if passed in members are members of the channel
        const splitParams = text.replaceAll("@", "").split(" ");

        // Get users list
        const { members } = await client.users.list();

        // Create object with keys corresponding to names and values corresponding to user_ids
        const memberNames = {};
        for (let i = 0; i < members.length; i++) {
          if (!memberNames[members[i].name]) {
            memberNames[members[i].name] = members[i].id;
          }
        }
        console.log(memberNames);

        // Loop through params and replace user names with user_ids
        for (let i = 0; i < splitParams.length; i++) {
          if (memberNames[splitParams[i]]) {
            splitParams[i] = memberNames[splitParams[i]];
          };
        }
        console.log(splitParams);

        // Create a document that sets the restrict key of a specific user on a specific channel
        const channel = team[channel_id];
        const user = channel[user_id];
        splitParams.forEach(element => {
          user.restrict.push(element);
        });
        const updateDoc = {
          $set: {
            [channel_id]: {
              ...channel,
              [user_id]: {
                ...user,
                restrict: user.restrict
              },
            }
          },
        };
        const result = await updateInstallation(team_id, updateDoc);
        console.log(result);
        // Fetch updated installtion and updated restrictions
        team = await fetchInstallation({}, team_id);
        block = team[channel_id][user_id].restrict;
        let response = "You are currently not being paired with the following members in this channel:\n";
        block.forEach(element => {
          response = response + `<@${element}>\n`;
        });
        await respond(response);
      }
    }

  } catch (error) {
    console.error(error);
  }
};

const unblock = async ({ client, command, ack, respond }) => {
  try {
    console.log(command);

    // Acknowledge command request
    await ack();

    // Obtain user, channel_id, team_id and parameters
    const { user_id, channel_id, team_id, text } = command;

    // Check if bot is in the channel
    const { bot_id, membership } = await checkBotMembership(command, client);

    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/unblock can only be called on channels that <@${bot_id}> has joined`);
      return;
    } else {
      // Fetch installtion
      let team = await fetchInstallation({}, team_id);

      // If no parameters are set, output current restrictions
      let block = team[channel_id][user_id].restrict;
      if (!text && block.length === 0) {
        await respond("The /unblock command must be called with a user or a list of users you wish to unblock. You are currently being paired with everyone on this channel for one-on-one's with no restrictions.");
      }
      else if (!text && block.length > 0) {
        let response = "The /unblock command must be called with a user or a list of users you wish to unblock. You are currently not being paired with the following members in this channel for one-on-one's:\n";
        console.log(block);
        block.forEach(element => {
          response = response + `<@${element}>\n`;
        });
        await respond(response);
      }
      else if (text === 'all') {
        // Create a document that sets the restrict key of a specific user on a specific channel
        const channel = team[channel_id];
        const user = channel[user_id];
        const updateDoc = {
          $set: {
            [channel_id]: {
              ...channel,
              [user_id]: {
                ...user,
                restrict: []
              },
            }
          },
        };
        const result = await updateInstallation(team_id, updateDoc);
        console.log(result);
        await respond("You have removed all restrictions and are currently being paired with everyone on this channel for one-on-one's.");
      }
      else {
        // Check if passed in members are members of the channel
        const splitParams = text.replaceAll("@", "").split(" ");

        // Get users list
        const { members } = await client.users.list();

        // Create object with keys corresponding to names and values corresponding to user_ids
        const memberNames = {};
        for (let i = 0; i < members.length; i++) {
          if (!memberNames[members[i].name]) {
            memberNames[members[i].name] = members[i].id;
          }
        }
        console.log(memberNames);

        // Loop through params and replace user names with user_ids
        for (let i = 0; i < splitParams.length; i++) {
          if (memberNames[splitParams[i]]) {
            splitParams[i] = memberNames[splitParams[i]];
          };
        }
        console.log(splitParams);

        // Create a document that sets the restrict key of a specific user on a specific channel
        const channel = team[channel_id];
        const user = channel[user_id];
        let currentRestrictions = user.restrict;
        let newRestrictions = [];
        for (let i = 0; i < splitParams.length; i++) {
          newRestrictions = currentRestrictions.filter(element => element !== splitParams[i]);
          currentRestrictions = newRestrictions;
        }

        const updateDoc = {
          $set: {
            [channel_id]: {
              ...channel,
              [user_id]: {
                ...user,
                restrict: newRestrictions
              },
            }
          },
        };
        const result = await updateInstallation(team_id, updateDoc);
        console.log(result);
        // Fetch updated installtion and updated restrictions
        team = await fetchInstallation({}, team_id);
        block = team[channel_id][user_id].restrict;
        let response1 = "You have succesfully removed the following members from your one-on-one restrictions list for this channel:\n";
        splitParams.forEach(element => {
          response1 += `<@${element}>\n`;
        });
        let response2 = "You are currently not being paired with the following members in this channel: \n";
        block.forEach(element => {
          response2 += `<@${element}>\n`;
        });
        await respond(response1 + response2);
      }
    }

  } catch (error) {
    console.error(error);
  }
};


export default function registerCommands(app) {

  app.command('/pair', pair);
  app.command('/frequency', frequency);
  app.command('/block', block);
  app.command('/unblock', unblock);
}
