import { fetchInstallation, updateInstallation } from "../lib/mongo.js";

import { checkBotMembership } from "../functions/slackApi.js";
import commandHandler, { setFrequency, setBlock, isActive, isInactive, setUnblock } from "./handlers/commandHandlers.js";

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
    const { team_id, channel_id, user_id, params, bot_id, membership, channelMembers, channelObj } = await commandHandler(client, command);

    // If bot is not in channel, respond with failure, else use unblock logic
    if (!membership) {
      await respond(`/unblock can only be called on channels that <@${bot_id}> has joined`);
      return;
    } else {

      // Get users list
      const apiResponse = await client.users.list();
      if (apiResponse.ok) {

        const { updateDoc, response } = setUnblock(channelObj, channel_id, user_id, params, apiResponse.members, channelMembers);

        // Save to DB
        if (updateDoc !== null) {
          const result = await updateInstallation(team_id, updateDoc);
          if (result.acknowledged && result.modifiedCount) {
            console.log(`Successfully removed ${user_id}'s restrictions in ${channel_id} for ${team_id}`);
          } else throw new Error(`Error removing ${user_id}'s restrictions in ${channel_id} for ${team_id}`);
        }
        await respond(response);

      } else if (apiResponse.error === 'limit_required') {
        await respond('Your team size is currently not supported by this slackbot. Please contact the developer.');
      } else {
        await respond(`An error occurred: ${apiResponse.error}. Please contact the developer.`);
        throw new Error(`An error occurred with calling client.users.list(): ${apiResponse.error}`);
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
