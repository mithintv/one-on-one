import { fetchInstallation } from "../../lib/mongo.js";
import { checkBotMembership } from "../../functions/slackApi.js";

export default async function commandHandler(client, command) {
  // Get team_id and channel_id from command
  const { team_id, channel_id, user_id } = command;

  // Get bot_id and verify bot membership of channel
  const { bot_id, membership, channelMembers } = await checkBotMembership(client, channel_id);

  // Get team in DB
  let teamObj = await fetchInstallation({}, team_id);
  if (!teamObj) teamObj = undefined;

  // Check channel, members, and user existence
  const channelObj = teamObj && teamObj[channel_id] ? teamObj[channel_id] : undefined;
  const membersObj = channelObj && channelObj.members ? channelObj.members : undefined;
  const userObj = channelObj && channelObj.members[user_id] ? channelObj.members[user_id] : undefined;

  return { team_id, channel_id, user_id, bot_id, membership, channelMembers, teamObj, channelObj, membersObj, userObj };
}


export const isActive = (channelObj, membersObj, channel_id, user_id) => {
  console.log(channelObj);
  console.log(membersObj);
  console.log(channel_id);
  console.log(user_id);
  if (!membersObj[user_id].isActive) {
    membersObj[user_id].isActive = true;
    return {
      $set: {
        [channel_id]: {
          ...channelObj,
          members: {
            ...membersObj,
          }
        }
      }
    };
  } else return null;
};
