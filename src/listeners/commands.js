import { updateInstallation } from "../lib/mongo.js";
import commandHandler, { setFrequency, setBlock, isActive, isInactive, setUnblock } from "./handlers/commandHandlers.js";
import { setTime, getTime, interval, span } from "../lib/constants.js";


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
          console.log(`Successfully set frequency of ${user_id} in ${channel_id} for ${team_id} to ${parseInt(params)} days`);
          await respond(`Your new frequency of one-on-ones in this channel is every ${parseInt(params)} days.`);
        } else throw new Error(`Error setting frequency of ${user_id} in ${channel_id} for ${team_id} to ${parseInt(params)} ${span}`);
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
      // Block command logic
      const { updateDoc, response } = setBlock(channelObj, channel_id, user_id, params, channelMembers);

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
    // Acknowledge command request
    await ack();

    // Obtain user, channel_id, team_id and parameters
    const { team_id, channel_id, user_id, params, bot_id, membership, channelObj, channelMembers } = await commandHandler(client, command);

    // If bot is not in channel, respond with failure, else use unblock logic
    if (!membership) {
      await respond(`/unblock can only be called on channels that <@${bot_id}> has joined`);
      return;
    } else {

      const { updateDoc, response } = setUnblock(channelObj, channel_id, user_id, params, channelMembers);

      // Save to DB
      if (updateDoc !== null) {
        const result = await updateInstallation(team_id, updateDoc);
        if (result.acknowledged && result.modifiedCount) {
          console.log(`Successfully removed ${user_id}'s restrictions in ${channel_id} for ${team_id}`);
        } else throw new Error(`Error removing ${user_id}'s restrictions in ${channel_id} for ${team_id}`);
      }
      await respond(response);

    }
  } catch (error) {
    console.error(error);
  }
};


const active = async ({ client, command, ack, respond }) => {
  try {
    // Acknowledge command request
    await ack();

    // Obtain user, channel_id, team_id and parameters
    const { team_id, channel_id, user_id, bot_id, membership, teamObj } = await commandHandler(client, command);

    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/ono-active can only be called on channels that <@${bot_id}> has joined.`);
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


const inactive = async ({ client, command, ack, respond }) => {
  try {
    // Acknowledge command request
    await ack();

    // Obtain user, channel_id, team_id and parameters
    const { team_id, channel_id, user_id, bot_id, membership, teamObj } = await commandHandler(client, command);

    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/ono-inactive can only be called on channels that <@${bot_id}> has joined.`);
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


const status = async ({ client, command, ack, respond }) => {
  try {
    // Acknowledge command request
    await ack();

    // Obtain user, channel_id, team_id and parameters
    const { user_id, bot_id, membership, channelObj, userObj } = await commandHandler(client, command);

    // If bot is not in channel, respond with failure, else use filtered members array to initiate function
    if (!membership) {
      await respond(`/ono status can only be called on channels that <@${bot_id}> has joined.`);
      return;
    } else {
      const active = userObj.isActive ? 'Active' : 'Inactive';

      let blockList = '';
      const block = userObj.restrict;
      block.forEach(element => {
        blockList += `<@${element}> `;
      });
      if (blockList.length === 0) {
        blockList = 'None';
      }

      // acquire user to use timezone data for pairing dates
      const { user } = await client.users.info({
        user: user_id
      });

      let lastPair = '';
      const lastPairing = new Date(userObj.lastPairing);
      const installDate = channelObj.installDate;
      if (installDate > lastPairing) {
        lastPair = "You haven't participated in a pairing yet";
      } else lastPair = userObj.lastPairing.toLocaleString('en-US', { timeZone: user.tz });

      let nextPair = 'You are inactive for pairings';
      const nextUserPair = new Date(lastPairing[setTime](lastPairing[getTime]() + parseInt(userObj.frequency)));


      if (channelObj.nextPairDate > nextUserPair && userObj.isActive) {
        nextPair = channelObj.nextPairDate.toLocaleString('en-US', { timeZone: user.tz });
      } else if (channelObj.nextPairDate < nextUserPair && userObj.isActive) {
        let nextUserChannelPair = new Date(channelObj.nextPairDate);
        while (nextUserChannelPair < nextUserPair) {
          nextUserChannelPair = new Date(nextUserChannelPair[setTime](nextUserChannelPair[getTime]() + parseInt(interval)));
        }
        nextPair = nextUserChannelPair.toLocaleString('en-US', { timeZone: user.tz });
      }

      await respond(`Here are your current parameters for one-on-ones in this channel:\n
      *Status:* ${active} for pairings in this channel\n
      *Minimum Frequency:* Every ${userObj.frequency} ${span}\n
      *Last Pairing Date:* ${lastPair}\n
      *Next Eligible Pairing Date:* ${nextPair}\n
      *Next Scheduled Pairing Date:* ${channelObj.nextPairDate.toLocaleString('en-US', { timeZone: user.tz })}\n
      *Block List:* ${blockList}
      `);
    }
  } catch (error) {
    console.error(error);
  }
};


export default function registerCommands(app) {
  app.command('/ono-frequency', frequency);
  app.command('/ono-block', block);
  app.command('/ono-unblock', unblock);
  app.command('/ono-active', active);
  app.command('/ono-inactive', inactive);
  app.command('/ono-status', status);
}
