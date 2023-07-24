import { deleteInstallation, updateInstallation } from "../lib/mongo.js";
import eventHandler, { memberLeaves, newChannel, memberJoins, oldChannel, leaveChannel, createPairings, updateLastPairingDate } from "./handlers/eventHandlers.js";
import { setTime, getTime, interval, first, span } from "../lib/constants.js";

const mention = async ({ client, event }) => {
  try {
    console.log(event);
  }
  catch (error) {
    console.error(error);
  }
};


const uninstall = async ({ body }) => {
  try {
    const { query, result } = await deleteInstallation(body.team_id);
    if (result.acknowledged && result.deletedCount === 1) {
      console.log(`Successfully uninstalled and deleted tokens for ${query.team.id} with id: ${query._id}`);
    }
  }
  catch (error) {
    console.error(error);
  }
};


const joined = async ({ client, event }) => {
  try {
    // Get event details, bot id, and members
    const { team_id, channel_id, user_id, bot_id, membership, channelMembers, teamObj, channelObj } = await eventHandler(client, event);

    // Run function if joined member is bot
    if (bot_id === user_id) {

      const { members: allMembers } = await client.users.list();

      // Delete messages sent by bot in dev mode
      if (process.env.ENVIRO === 'testing') {
        const { messages } = await client.conversations.history({
          channel: channel_id
        });

        // Filter messages sent by bot
        const botMessages = messages.filter(message => message.user === bot_id && message.subtype !== 'channel_join');

        // Delete filtered messages
        if (botMessages.length > 0) {
          for (let i = 0; i < botMessages.length; i++) {
            const response = await client.chat.delete({
              channel: channel_id,
              ts: botMessages[i].ts
            });
            if (response.ok) {
              console.log(`Successfully deleted bot message with ts: ${botMessages[i].ts} in ${channel_id} for ${team_id}`);
            } else throw new Error(`Error deleting bot message with id: ${botMessages[i].ts} in ${channel_id} for ${team_id}`);
          }
        }
      }

      // Find scheduled messages
      const { scheduled_messages } = await client.chat.scheduledMessages.list({
        channel: channel_id
      });

      // Filter scheduled messages
      const filteredMessages = scheduled_messages.filter(message => message.text === 'Generating your one-on-one pairings~');

      // Delete scheduled messages
      if (filteredMessages.length > 0) {
        for (let i = 0; i < filteredMessages.length; i++) {
          const response = await client.chat.deleteScheduledMessage({
            channel: channel_id,
            scheduled_message_id: filteredMessages[i].id
          });
          if (response.ok) {
            console.log(`Successfully deleted scheduled message with id: ${filteredMessages[i].id} in ${channel_id} for ${team_id}`);
          } else throw new Error(`Error deleting scheduled message with id: ${filteredMessages[i].id} in ${channel_id} for ${team_id}`);
        }
      }

      // If channel doesn't exist, create one with default values. Otherwise, set default values for any new members, keep existing values for old members and set isActive to false for members who have since left the channel
      let updateDoc = {};
      channelObj ? updateDoc = oldChannel(channelMembers, allMembers, channel_id, channelObj) : updateDoc = newChannel(channelMembers, allMembers, channel_id);

      // Save to DB
      const result = await updateInstallation(team_id, updateDoc);
      if (result.acknowledged && result.modifiedCount) {
        console.log(`Successfully updated ${teamObj.team.id} upon being invited to ${channel_id} `);
      } else throw new Error(`Error updating ${teamObj.team.id} upon being invited to ${channel_id}`);

      // Send welcome message to slack
      await client.chat.postMessage({
        channel: channel_id,
        text: `Thanks for adding One-on-One bot to the channel. The first one-on-one pairing will be posted in ${first} ${span} and further pairings will be posted every ${interval} ${span}.`,
      });

      // Schedule pairing
      let pairDate = new Date();
      pairDate = new Date(pairDate[setTime](pairDate[getTime]() + first));
      const scheduleResponse = await client.chat.scheduleMessage({
        channel: channel_id,
        post_at: Math.ceil(pairDate.getTime() / 1000),
        text: `Generating your one-on-one pairings~`
      });
      if (scheduleResponse.ok) {
        console.log(`Successfully scheduled next pairing message in ${channel_id} on ${team_id}`);
      } else throw new Error(`Error scheduling next pairing message in ${channel_id} on ${team_id}`);
    }

    // Slack sends member_join events only if bot has joined a channel so by default this block should only run for new members in a channel that bot is already in
    else if (bot_id !== event.user) {
      const { members: allMembers } = await client.users.list();
      const updateDoc = memberJoins(event.user, allMembers, channel_id, channelObj);

      // Save to DB
      const result = await updateInstallation(team_id, updateDoc);
      if (result.acknowledged && result.modifiedCount) {
        console.log(`Successfully added ${user_id} for pairings in ${channel_id} in ${team_id}`);
      } else throw new Error(`Error adding ${user_id} for pairings in ${channel_id} in ${team_id}`);
    }

    else if (!membership) {
      console.log('This block should never run');
    }

  } catch (error) {
    console.error(error);
  }
};


const left = async ({ client, event }) => {
  try {
    // Get event details, bot id, and members
    const { channelObj: channel, channel_id, team_id, user_id, bot_id, membership } = await eventHandler(client, event);

    if (bot_id === user_id) {

      // Find scheduled messages
      const { scheduled_messages } = await client.chat.scheduledMessages.list({
        channel: channel_id
      });

      // Filter scheduled messages
      const filteredMessages = scheduled_messages.filter(message => message.text === 'Generating your one-on-one pairings~');

      // Delete scheduled messages
      if (filteredMessages.length > 0) {
        for (let i = 0; i < filteredMessages.length; i++) {
          const response = await client.chat.deleteScheduledMessage({
            channel: channel_id,
            scheduled_message_id: filteredMessages[i].id
          });
          if (response.ok) {
            console.log(`Successfully deleted scheduled message with id: ${filteredMessages[i].id} in ${channel_id} for ${team_id}`);
          } else throw new Error(`Error deleting scheduled message with id: ${filteredMessages[i].id} in ${channel_id} for ${team_id}`);
        }
      }

      // Create update doc
      const updateDoc = leaveChannel(channel_id, channel);

      // Set is Active to false upon bot being removed from channel
      const result = await updateInstallation(team_id, updateDoc);
      if (result.acknowledged && result.modifiedCount) {
        console.log(`Successfully set bot as inactive on ${channel_id} in ${team_id}`);
      } else throw new Error(`Error setting bot as inactive on ${channel_id} in ${team_id}`);
    }

    // If notified of members leaving channels that bot is not part of, do nothing
    else if (!membership) {
      console.log('A user left a channel that the bot is not in. Nothing happens');
      return;
    }

    // If member leaves a channel bot is in...
    else {
      // Create update doc that sets isActive to false upon a user leaving or being removed from the channel
      const updateDoc = memberLeaves(user_id, channel_id, channel);

      // Save to DB
      const result = await updateInstallation(team_id, updateDoc);
      if (result.acknowledged && result.modifiedCount) {
        console.log(`Successfully set ${user_id} as inactive on ${channel_id} in ${team_id}`);
      } else throw new Error(`Error setting ${user_id} as inactive on ${channel_id} in ${team_id}`);
    }

  } catch (error) {
    console.error(error);
  }
};


const reminder = async ({ client, event }) => {
  try {
    // Get event details
    const { channelObj, channel_id, channelMembers, teamObj, team_id, user_id, bot_id, membership, membersObj } = await eventHandler(client, event);

    if (membership && bot_id === user_id && event.text === 'Generating your one-on-one pairings~') {
      console.log(`Received pairing request from ${teamObj.team.id}`);

      // Create pairings and post them
      const { filteredMembers, pairings, currentDate } = await createPairings(channelMembers, membersObj);

      if (filteredMembers.length === 0) {
        await client.chat.postMessage({
          channel: channel_id,
          text: "Error creating pairings. This is most likely because all members in the channel have set their frequency of one-on-ones to exceed the regular interval of one-on-one pairing announcements."
        });
      } else {
        const postResponse = await client.chat.postMessage({
          channel: channel_id,
          text: pairings
        });
        if (postResponse.ok) {
          console.log(`Successfully completed pairing request for ${teamObj.team.id} in ${channel_id}`);
        } else throw new Error(`Error completing pairing request for ${teamObj.team.id} in ${channel_id}`);

        // Update members' last pairing date
        const newChannelObj = updateLastPairingDate(filteredMembers, channelObj, currentDate);

        // Create next pairing date and create update doc
        const nextPairDate = new Date();
        newChannelObj.nextPairDate = new Date(nextPairDate[setTime](nextPairDate[getTime]() + parseInt(interval)));
        const updateDoc = {
          $set: {
            [channel_id]: {
              ...newChannelObj
            }
          }
        };

        // Save to DB
        const result = await updateInstallation(team_id, updateDoc);
        if (result.acknowledged && result.modifiedCount) {
          console.log(`Successfully updated DB for next pairing date for ${teamObj.team.id} in ${channel_id}`);
        } else throw new Error(`Error in updating DB for next pairing for ${teamObj.team.id} in ${channel_id}`);


        // Schedule next pairing
        const scheduleResponse = await client.chat.scheduleMessage({
          channel: channel_id,
          post_at: Math.ceil(nextPairDate.getTime() / 1000),
          text: `Generating your one-on-one pairings~`
        });
        if (scheduleResponse.ok) {
          console.log(`Successfully scheduled message for next pairing date for ${teamObj.team.id} in ${channel_id}`);
        } else throw new Error(`Error in scheduling message for next pairing for ${teamObj.team.id} in ${channel_id}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};


export default function registerEvents(app) {
  app.event('app_uninstalled', uninstall);
  app.event('app_mention', mention);
  app.event('member_joined_channel', joined);
  app.event('member_left_channel', left);
  app.event('message', reminder);
}
