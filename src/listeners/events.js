import { deleteInstallation, updateInstallation } from "../lib/mongo.js";
import eventHandler, { memberLeaves, newChannel, memberJoins, oldChannel, leaveChannel, createPairings } from "./handlers/eventHandlers.js";

const mention = async ({ client, event, respond }) => {
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
      console.log(`Succesfully uninstalled and deleted tokens for ${query.team.name} with id: ${query._id}`);
    }
  }
  catch (error) {
    console.error(error);
  }
};

const joined = async ({ client, event }) => {
  try {
    // Get event details, bot id, and members
    const { channelObj: channel, channelMembers, channel_id, team_id, user_id, bot_id, membership, members } = await eventHandler(client, event);

    // Run function if joined member is bot
    if (bot_id === user_id) {
      // If channel doesn't exist, create one with default values. Otherwise, set default values for any new members, keep existing values for old members and set isActive to false for members who have since left the channel
      let updateDoc = {};
      channel ? updateDoc = oldChannel(channelMembers, channel_id, channel) : updateDoc = newChannel(channelMembers, channel_id);

      // Save to DB
      const result = await updateInstallation(team_id, updateDoc);
      console.log(result);

      // Send welcome message to slack
      const welcomeMessage = await client.chat.postMessage({
        channel: channel_id,
        text: 'Thanks for adding One-on-One bot to the channel. The first one-on-one pairing will be posted in 7 days and further parings will be posted monthly.',
      });


      // Schedule pairing
      let pairDate = new Date();
      pairDate = new Date(pairDate.setSeconds(pairDate.getSeconds() + 10));
      await client.chat.scheduleMessage({
        channel: channel_id,
        post_at: Math.ceil(pairDate.getTime() / 1000),
        text: `Here your one-on-one pairings for the upcoming month!`
      });
    }

    // Slack sends member_join events only if bot has joined a channel so by default this block should only run for new members in a channel that bot is already in
    else if (bot_id !== event.user) {
      const updateDoc = memberJoins(event.user, channel_id, channel);

      // Save to DB
      const result = await updateInstallation(team_id, updateDoc);
      console.log(result);
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
    console.log(event);

    // Get event details, bot id, and members
    const { channelObj: channel, channel_id, team_id, user_id, bot_id, membership } = await eventHandler(client, event);

    if (bot_id === user_id) {
      // Create update doc
      const updateDoc = leaveChannel(channel_id, channel);

      // Set is Active to false upon bot being removed from channel
      const result = await updateInstallation(team_id, updateDoc);
      console.log(result);
    }

    // If notified of members leaving channels that bot is not part of, do nothing
    else if (!membership) {
      console.log('A user left a channel that the bot is not in. Nothing happens');
      return;
    }

    // If member leaves a channel bot is in...
    else {
      // Fetch user object from DB
      const user = channel[user_id];

      // Create update doc that sets isActive to false upon a user leaving or being removed from the channel
      const updateDoc = memberLeaves(user_id, user, channel_id, channel);

      // Save to DB
      const result = await updateInstallation(team_id, updateDoc);
      console.log(result);
    }

  } catch (error) {
    console.error(error);
  }
};

const reminder = async ({ client, event }) => {
  try {
    // Get event details
    const { channelObj, channel_id, channelMembers, teamObj, team_id, userObj, user_id, bot_id, membership, membersObj } = await eventHandler(client, event);

    if (membership && bot_id === user_id && event.text === 'Here your one-on-one pairings for the upcoming month!') {
      console.log(`Received pairing request from team ${teamObj.team.name}`);

      // Create pairings and post them
      const pairings = createPairings(channelMembers, membersObj);
      const postResponse = await client.chat.postMessage({
        channel: channel_id,
        text: pairings
      });
      if (postResponse) {
        console.log(`Succesfully completed pairing request for team ${teamObj.team.name} in channel ${channel_id}`);
      } else throw new Error(`Error completed pairing request for team ${teamObj.team.name} in channel ${channel_id}`);

      // Create next pairing date
      let pairDate = new Date();
      pairDate = new Date(pairDate.setSeconds(pairDate.getSeconds() + 10));

      // Create update doc
      channelObj.nextPairDate = pairDate;
      const updateDoc = {
        $set: {
          [channel_id]: {
            ...channelObj
          }
        }
      };

      // Save to DB
      const result = await updateInstallation(team_id, updateDoc);
      if (result.acknowledged && result.modifiedCount) {
        console.log(`Succesfully updated DB for next pairing date for team ${teamObj.team.name} in channel ${channel_id}`);
      } else throw new Error(`Error in updating DB for next pairing for team ${teamObj.team.name} in channel ${channel_id}`);

      // Schedule next pairing
      const scheduleResponse = await client.chat.scheduleMessage({
        channel: channel_id,
        post_at: Math.floor(pairDate.getTime() / 1000),
        text: `Here your one-on-one pairings for this month!`
      });
      if (scheduleResponse) {
        console.log(`Succesfully scheduled message for next pairing date for team ${teamObj.team.name} in channel ${channel_id}`);
      } else throw new Error(`Error in scheduling message for next pairing for team ${teamObj.team.name} in channel ${channel_id}`);
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
