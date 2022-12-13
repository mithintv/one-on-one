import mongo, { deleteInstallation, fetchInstallation } from "../lib/mongo.js";

import { checkBotMembership } from "../functions/bot.js";

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
    // Get team_id and channel_id
    const { team: team_id, channel: channel_id } = event;

    // Get team in DB
    const team = await fetchInstallation({}, team_id);


    // Get members of channel
    const { bot_id, members, membership } = await checkBotMembership(event, client);

    // Create channel object to insert into DB
    const channelObject = members.reduce((acc, curr) => {
      acc[curr] = '14';
      return acc;
    }, {});

    // Create doc to insert into DB
    const updateDoc = {
      $set: {
        [channel_id]: channelObject
      },
    };

    // Save default frequency for each member in channel to team DB
    const workspaces = mongo.db("one-on-one").collection("workspaces");
    const result = await workspaces.updateOne(team, updateDoc);
    console.log(result);

  } catch (error) {
    console.error(error);
  }
};


export default function registerEvents(app) {
  app.event('app_uninstalled', uninstall);
  app.event('app_mention', mention);
  app.event('member_joined_channel', joined);
}
