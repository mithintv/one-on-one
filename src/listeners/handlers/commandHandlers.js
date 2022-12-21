import { fetchInstallation } from "../../lib/mongo.js";
import { checkBotMembership } from "../../functions/slackApi.js";

export default async function commandHandler(client, command) {
  // Get team_id and channel_id from command
  const { team_id, channel_id, user_id, text: params } = command;

  // Get bot_id and verify bot membership of channel
  const { bot_id, membership, channelMembers } = await checkBotMembership(client, channel_id);

  // Get team in DB
  let teamObj = await fetchInstallation({}, team_id);
  if (!teamObj) teamObj = undefined;

  // Check channel, members, and user existence
  const channelObj = teamObj && teamObj[channel_id] ? teamObj[channel_id] : undefined;
  const membersObj = channelObj && channelObj.members ? channelObj.members : undefined;
  const userObj = channelObj && channelObj.members[user_id] ? channelObj.members[user_id] : undefined;

  return { team_id, channel_id, user_id, params, bot_id, membership, channelMembers, teamObj, channelObj, membersObj, userObj };
}


export const setFrequency = (channelObj, channel_id, user_id, params) => {
  // If no parameters are set, respond with current frequency
  const frequency = channelObj.members[user_id].frequency;

  if (!channelObj.members[user_id].isActive) {
    return (`/frequency can only be called for active users. Set yourself active for pairing with the /pair command first.`);
  }
  else if (params.length === 0) {
    return (`Your current frequency of one-on-one's in this channel is every ${frequency} days.`);
  }
  // If a parameter is passed and is a valid number from 1 to 90, set it as new frequency
  else if (params && parseInt(params) !== NaN && parseInt(params) >= 1 && parseInt(params) <= 90) {
    channelObj.members[user_id].frequency = params;
    // Create a document that sets the frequency of specific user
    return {
      $set: {
        [channel_id]: {
          ...channelObj,
        }
      },
    };
  }
  else return (`You inputted an invalid value for frequency of one-on-one's. Only numeric values from 1 to 90 are accepted. Your current frequency of one-on-one's in this channel is every ${frequency} days.`);
};

export const setBlock = (channelObj, channel_id, user_id, params, allMembers, channelMembers) => {
  let response = "";
  const block = channelObj.members[user_id].restrict;
  // If user is inactive, respond with failure
  if (!channelObj.members[user_id].isActive) {
    response = '/block can only be called for active users. Set yourself active for pairing with the /pair command first.';
    return { updateDoc: null, response };
  }
  // If no parameters are set, respond with current restrictions
  else if (params.length === 0 && block.length === 0) {
    response = "You are currently being paired with everyone on this channel for one-on-one's with no restrictions.";
    return { updateDoc: null, response };
  }
  else if (params.length === 0) {
    response = "You are currently not being paired with the following members in this channel for one-on-one's:\n";
    console.log('second block');
    block.forEach(element => {
      response = response + `<@${element}>\n`;
    });
    return { updateDoc: null, response };
  }
  // If parameters are set, begin block logic
  else {
    console.log('third block');
    // Create array from passed in usernames
    const splitParams = params.replaceAll("@", "").split(" ");

    // Create object with keys corresponding to names and values corresponding to user_ids
    const memberNames = {};
    for (let i = 0; i < allMembers.length; i++) {
      if (!memberNames[allMembers[i].name]) {
        memberNames[allMembers[i].name] = allMembers[i].id;
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

    // Check if passed in members are members of the channel
    const invalidMembers = splitParams.filter(member => !channelMembers.includes(member));
    const validMembers = splitParams.filter(member => channelMembers.includes(member));

    // Create a document that sets the restrict key of a specific user on a specific channel
    response = "You are currently not being paired with the following members in this channel:\n";
    validMembers.forEach(element => {
      channelObj.members[user_id].restrict.push(element);
      response = response + `<@${element}>\n`;
    });
    return {
      updateDoc: {
        $set: {
          [channel_id]: {
            ...channelObj,
          }
        }
      },
      response
    };
  }
};


export const isActive = (channelObj, channel_id, user_id) => {
  if (!channelObj.members[user_id].isActive) {
    channelObj.members[user_id].isActive = true;
    return {
      $set: {
        [channel_id]: {
          ...channelObj,
        }
      }
    };
  } else return null;
};


export const isInactive = (channelObj, channel_id, user_id) => {
  if (channelObj.members[user_id].isActive) {
    channelObj.members[user_id].isActive = false;
    return {
      $set: {
        [channel_id]: {
          ...channelObj,
        }
      }
    };
  } else return null;
};
