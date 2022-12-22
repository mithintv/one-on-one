import { fetchInstallation, updateInstallation } from "../../lib/mongo.js";
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
    block.forEach(element => {
      response += `<@${element}>\n`;
    });
    return { updateDoc: null, response };
  }
  // If parameters are set, begin block logic
  else {
    // Create array from passed in usernames
    const splitParams = params.replaceAll("@", "").split(" ");

    // Create object with keys corresponding to names and values corresponding to user_ids
    const memberNames = {};
    for (let i = 0; i < allMembers.length; i++) {
      if (!memberNames[allMembers[i].name]) {
        memberNames[allMembers[i].name] = allMembers[i].id;
      }
    }

    // Loop through params and replace user names with user_ids
    for (let i = 0; i < splitParams.length; i++) {
      if (memberNames[splitParams[i]]) {
        splitParams[i] = memberNames[splitParams[i]];
      };
    }

    // Check if passed in members are members of the channel
    const invalidMembers = splitParams.filter(member => !channelMembers.includes(member));
    const validMembers = splitParams.filter(member => channelMembers.includes(member));

    if (channelObj.members[user_id].restrict.length === 0 && validMembers.length === 0) {
      response = "You are currently being paired with everyone on this channel for one-on-one's with no restrictions.\n";
    } else {
      response = "You are currently not being paired with the following members in this channel for one-on-one's:\n";
    }

    // Insert current restrictions to response
    channelObj.members[user_id].restrict.forEach(element => {
      response += `<@${element}>\n`;
    });

    // Insert new restrictions to response
    validMembers.forEach(element => {
      channelObj.members[user_id].restrict.push(element);
      response += `<@${element}>\n`;
    });

    if (invalidMembers.length > 0) {
      response += 'The following members are not in this channel and were ignored for this command:\n';
      invalidMembers.forEach(element => {
        response += `<@${element}>\n`;
      });
    }

    // Create a document that sets the restrict key of a specific user on a specific channel
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


export const setUnblock = (channelObj, channel_id, user_id, params) => {
  let response = "";
  const block = channelObj.members[user_id].restrict;
  // If user is inactive, respond with failure
  if (!channelObj.members[user_id].isActive) {
    response = '/unblock can only be called for active users. Set yourself active for pairing with the /pair command first.';
    return { updateDoc: null, response };
  }
  // If no parameters are set, output current restrictions
  if (params.length === 0 && block.length === 0) {
    response = "The /unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently being paired with everyone on this channel for one-on-one's with no restrictions.";
    return { updateDoc: null, response };
  }

  else if (params.length === 0 && block.length > 0) {
    let response = "The /unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently not being paired with the following members in this channel for one-on-one's:\n";
    block.forEach(element => {
      response += `<@${element}>\n`;
    });
    return { updateDoc: null, response };
  }

  else if (params === 'all' && block.length === 0) {
    response = "You are already being paired with everyone on this channel for one-on-one's with no restrictions.";
    return { updateDoc: null, response };
  }

  else if (params === 'all') {
    // Create a document that sets the restrict key of a specific user on a specific channel
    channelObj.members[user_id].restrict = [];
    const updateDoc = {
      $set: {
        [channel_id]: {
          ...channelObj,
        }
      },
    };

    response = "You have removed all restrictions and are currently being paired with everyone on this channel for one-on-one's.";
    return { updateDoc, response };
  }
  else {
    // Check if passed in members are members of the channel
    const splitParams = params.replaceAll("@", "").split(" ");


    // Create object with keys corresponding to names and values corresponding to user_ids
    const memberNames = {};
    for (let i = 0; i < apiResponse.members.length; i++) {
      if (!memberNames[apiResponse.members[i].name]) {
        memberNames[apiResponse.members[i].name] = apiResponse.members[i].id;
      }
    }

    // Loop through params and replace user names with user_ids
    for (let i = 0; i < splitParams.length; i++) {
      if (memberNames[splitParams[i]]) {
        splitParams[i] = memberNames[splitParams[i]];
      };
    }

    // Create a document that sets the restrict key of a specific user on a specific channel
    const user = channelObj.members[user_id];
    let currentRestrictions = user.restrict;
    let newRestrictions = [];
    for (let i = 0; i < splitParams.length; i++) {
      newRestrictions = currentRestrictions.filter(element => element !== splitParams[i]);
      currentRestrictions = newRestrictions;
    }
    channelObj.members[user_id].restrict = newRestrictions;
    const updateDoc = {
      $set: {
        [channel_id]: {
          ...channelObj,
        }
      },
    };

    // Create responses to return along with updateDoc
    block = channelObj.members[user_id].restrict;
    let response1 = "You have succesfully removed the following members from your one-on-one restrictions list for this channel:\n";
    splitParams.forEach(element => {
      response1 += `<@${element}>\n`;
    });
    let response2 = "You are currently not being paired with the following members in this channel: \n";
    block.forEach(element => {
      response2 += `<@${element}>\n`;
    });
    return { updateDoc, response: response1 + response2 };
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
