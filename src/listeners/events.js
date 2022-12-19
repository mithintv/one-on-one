import mongo, { deleteInstallation, updateInstallation } from "../lib/mongo.js";

import eventHandler, { memberLeaves, newChannel, memberJoins, oldChannel } from "./handlers/eventHandlers.js";

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
    console.log(event);

    // Get event details, bot id, and members
    const { channelObj: channel, channel_id, team_id, bot_id, membership, members } = await eventHandler(client, event);

    // Run function if joined member is bot
    if (bot_id === event.user) {
      // If channel doesn't exist, create one with default values. Otherwise, set default values for any new members, keep existing values for old members and set isActive to false for members who have since left the channel
      let updateDoc = {};
      channel ? updateDoc = oldChannel(members, channel_id, channel) : updateDoc = newChannel(members, channel_id);

      // Save to DB
      const result = await updateInstallation(team_id, updateDoc);
      console.log(result);

      // Send welcome message to slack
      await client.chat.postMessage({
        channel: channel_id,
        text: 'Thanks for adding One-on-One bot to the channel. The first one-on-one pairing will be posted in 7 days and further parings will be posted monthly.',
      });

      // Schedule pairing

      // const currentDate = new Date(Date.now());
      // console.log(currentDate);
      // const currentSeconds = currentDate.getSeconds();
      // console.log(currentSeconds);
      // currentDate.setSeconds(currentSeconds + 10);
      // console.log(currentDate);
      // console.log(currentDate.getTime());

      // // const reminder = await client.reminders.add({
      // //   text: 'pair',
      // //   time: Math.floor(currentDate.getTime() / 1000),
      // // });

      // // console.log(reminder);

      // const schedule = await client.chat.scheduleMessage({
      //   channel: channel_id,
      //   post_at: Math.floor(currentDate.getTime() / 1000),
      //   text: `<@${bot_id}> is creating your one-on-one pairings for this month!`
      // });
      // console.log(schedule);
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
    const { channelObj: channel, channel_id, team_id, user_id, bot_id, membership, members } = await eventHandler(client, event);

    if (bot_id === user_id) {
      // Create update doc
      const updateDoc = leaveChannel(channel_id, channel);

      // Set is Active to false upon ONO bot being removed from channel
      const workspaces = mongo.db("one-on-one").collection("workspaces");
      const result = await workspaces.updateOne(team, updateDoc);
      console.log(result);

    }

    // If notified of members leaving channels that bot is not part of, do nothing
    else if (!membership) {
      return;
    }

    // If member leaves a channel bot is in...
    else {
      // Fetch user object from DB
      const user = channel[user_id];

      // Create update doc that sets isActive to false upon a user leaving or being removed from the channel
      const updateDoc = memberLeaves(user_id, user, channel_id, channel);

      const workspaces = mongo.db("one-on-one").collection("workspaces");
      const result = await workspaces.updateOne(team, updateDoc);
      console.log(result);
    }

  } catch (error) {
    console.error(error);
  }
};

const reminder = async ({ client, event }) => {
  try {
    console.log(event);
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
