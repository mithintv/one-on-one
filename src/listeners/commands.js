import { fetchInstallation, updateInstallation } from "../lib/mongo.js";

import { checkBotMembership } from "../functions/slackApi.js";
import commandHandler, { setFrequency, setBlock, isActive, isInactive } from "./handlers/commandHandlers.js";

const frequency = async ({ client, command, ack, respond }) => {
  try {
    // Acknowledge command request
    await ack();

    // Obtain user, channel_id, team_id and parameters
    const { team_id, channel_id, user_id, params, bot_id, membership, channelObj } = await commandHandler(client, command);

    // If bot is not in channel, respond with failure, else set frequency
    if (!membership) {
      await respond(`/frequency can only be called on channels that <@${bot_id}> has joined`);
    } else {

      // Set frequency of particular user if params are within bounds
      const updateDoc = setFrequency(channelObj, channel_id, user_id, params);

      // Save to DB and respond
      if (typeof updateDoc === 'object') {
        const result = await updateInstallation(team_id, updateDoc);
        if (result.acknowledged && result.modifiedCount) {
          console.log(`Successfully set frequency of ${user_id} in ${channel_id} for ${team_id} to ${params} days`);
          await respond(`Your new frequency of one-on-one's in this channel is every ${params} days.`);
        } else throw new Error(`Error setting frequency of ${user_id} in ${channel_id} for ${team_id} to ${params} days`);
      } else await respond(updateDoc);
    }
  }
  catch (error) {
    console.error(error);
  }
};

const block = async ({ client, command, ack, respond }) => {
  try {

    // Acknowledge command request
    await ack();
    console.log(command);

    // Obtain user, channel_id, team_id and parameters
    const { team_id, channel_id, user_id, params, bot_id, membership, channelMembers, channelObj } = await commandHandler(client, command);

    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/block can only be called on channels that <@${bot_id}> has joined`);
      return;
    } else {
      // Get all users list w/ usernames
      const { members: allMembers } = await client.users.list();

      // Block command logic
      const { updateDoc, response } = setBlock(channelObj, channel_id, user_id, params, allMembers, channelMembers);

      if (updateDoc !== null) {
        const result = await updateInstallation(team_id, updateDoc);
        if (result.acknowledged && result.modifiedCount) {
          console.log(`Successfully set restrictions for ${user_id} in ${channel_id} for ${team_id}.`);
        } else throw new Error(`Error setting restrictions for ${user_id} in ${channel_id} for ${team_id}.`);
        await respond(response);
      } else await respond(response);
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

const pair = async ({ client, command, ack, respond }) => {
  try {
    // Acknowledge command request
    await ack();

    // Obtain user, channel_id, team_id and parameters
    const { team_id, channel_id, user_id, bot_id, membership, teamObj } = await commandHandler(client, command);

    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/pair can only be called on channels that <@${bot_id}> has joined.`);
      return;
    } else {
      const updateDoc = isActive(teamObj[channel_id], channel_id, user_id);
      if (updateDoc !== null) {
        const result = await updateInstallation(team_id, updateDoc);
        if (result.acknowledged && result.modifiedCount) {
          console.log(`Succesfully set ${user_id} in channel ${channel_id} as active for pairing in ${teamObj.team.id}.`);
          await respond('You have set yourself as active for one-on-one pairings in this channel.');
        } else throw new Error(`Error setting ${user_id} in channel ${channel_id} as active for one-on-one pairing in ${teamObj.team.id}.`);
      } else {
        await respond('You are already set as active to be paired for one-on-ones in this channel.');
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const unpair = async ({ client, command, ack, respond }) => {
  try {
    // Acknowledge command request
    await ack();

    // Obtain user, channel_id, team_id and parameters
    const { team_id, channel_id, user_id, bot_id, membership, teamObj } = await commandHandler(client, command);

    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/unpair can only be called on channels that <@${bot_id}> has joined.`);
      return;
    } else {
      const updateDoc = isInactive(teamObj[channel_id], channel_id, user_id);
      if (updateDoc !== null) {
        const result = await updateInstallation(team_id, updateDoc);
        if (result.acknowledged && result.modifiedCount) {
          console.log(`Succesfully set ${user_id} in channel ${channel_id} as inactive for pairing in ${teamObj.team.id}.`);
          await respond('You have set yourself as inactive for one-on-one pairings in this channel.');
        } else throw new Error(`Error setting ${user_id} in channel ${channel_id} as inactive for one-on-one pairing in ${teamObj.team.id}.`);
      } else {
        await respond('You are already set as inactive to be paired for one-on-ones in this channel.');
      }
    }
  } catch (error) {
    console.error(error);
  }
};


export default function registerCommands(app) {
  app.command('/frequency', frequency);
  app.command('/block', block);
  app.command('/unblock', unblock);
  app.command('/pair', pair);
  app.command('/unpair', unpair);
}
