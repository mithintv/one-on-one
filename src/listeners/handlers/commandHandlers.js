import { fetchInstallation } from "../../lib/mongo.js";
import { checkBotMembership } from "../../functions/slackApi.js";

export default async function commandHandler(client, command) {
  // Get team_id and channel_id from command
  const { team_id, channel_id, user_id } = command;

  // Get bot_id and verify bot membership of channel
  const { bot_id, membership, channelMembers } = await checkBotMembership(command, client);

  // Get team in DB
  let teamObj = await fetchInstallation({}, team_id);
  if (!teamObj) teamObj = undefined;

  // Check channel, members, and user existence
  const channelObj = teamObj && teamObj[channel_id] ? teamObj[channel_id] : undefined;
  const membersObj = channelObj && channelObj.members ? channelObj.members : undefined;
  const userObj = channelObj && channelObj.members[user_id] ? channelObj.members[user_id] : undefined;

  return { team_id, channel_id, user_id, bot_id, membership, channelMembers, teamObj, channelObj, membersObj, userObj };
}
