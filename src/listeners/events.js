import mongo, { deleteInstallation, fetchInstallation, updateInstallation } from "../lib/mongo.js";

import { checkBotMembership, getBotId } from "../functions/bot.js";

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
    // Run function only if joined member is ONO bot
    const bot_id = await getBotId(client);
    if (bot_id === event.user) {

      // Get team_id and channel_id
      const { team: team_id, channel: channel_id } = event;

      // Get team in DB
      const team = await fetchInstallation({}, team_id);

      // Check channel existence
      const channel = team[channel_id];
      let updateDoc = {};

      // Get members of channel
      const { members } = await checkBotMembership(event, client);

      // If channel doesn't exist, create one with default values
      if (!channel) {

        // Create channel object to insert into DB
        const channelObject = members.reduce((acc, curr) => {
          acc[curr] = {
            frequency: '14',
            lastPairing: '',
            restrict: []
          };
          return acc;
        }, {});
        channelObject['isActive'] = true;

        // Create doc to insert into DB
        updateDoc = {
          $set: {
            [channel_id]: channelObject
          },
        };
      }
      // Otherwise, set default values for any new members and keep existing values for all other members
      else {
        for (let i = 0; i < members.length; i++) {
          if (!channel[members[i]]) {
            channel[members[i]] = {
              frequency: '14',
              lastPairing: '',
              restrict: []
            };
          }
        }

        // Create doc to insert into DB
        updateDoc = {
          $set: {
            [channel_id]: {
              ...channel,
              isActive: true
            }
          },
        };
      }
      // Save default frequency for each member in channel if channel object doesn't exist or save default frequency for new members in channel if channel object already exists
      const result = await updateInstallation(team_id, updateDoc);
      console.log(result);
    }

  } catch (error) {
    console.error(error);
  }
};

const left = async ({ client, event }) => {
  try {
    console.log(event);

    // Run function only if joined member is ONO bot
    const bot_id = await getBotId(client);
    if (bot_id === event.user) {

      // Get team_id and channel_id
      const { team: team_id, channel: channel_id } = event;

      // Get team in DB
      const team = await fetchInstallation({}, team_id);
      const channel = team[channel_id];

      // Create update doc
      const updateDoc = {
        $set: {
          [channel_id]: {
            ...channel,
            isActive: false
          }
        },
      };

      // Set is Active to false upon ONO bot being removed from channel
      const workspaces = mongo.db("one-on-one").collection("workspaces");
      const result = await workspaces.updateOne(team, updateDoc);
      console.log(result);

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
}
