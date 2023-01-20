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
  const membersArr = channelObj && channelObj.members ? channelObj.members : undefined;
  let userObj = undefined;

  if (membersArr) {
    const index = membersArr.findIndex(element => Object.keys(element)[0] === user_id);

    userObj = membersArr[index][user_id];
  }


  return { team_id, channel_id, user_id, params, bot_id, membership, channelMembers, teamObj, channelObj, membersArr, userObj };
}


export const setFrequency = (channelObj, channel_id, user_id, params) => {
  const index = channelObj.members.findIndex(member => {
    return Object.keys(member)[0] === user_id;
  });
  // If no parameters are set, respond with current frequency
  const frequency = channelObj.members[index][user_id].frequency;

  if (!channelObj.members[index][user_id].isActive) {
    return (`/ono-frequency can only be called for active users. Set yourself active for pairing with the /ono-active command first.`);
  }
  else if (params.length === 0) {
    return (`Your current frequency of one-on-ones in this channel is every ${frequency} days.`);
  }
  // If a parameter is passed and is a valid number from 1 to 90, set it as new frequency
  else if (params && parseInt(params) !== NaN && parseInt(params) >= 1 && parseInt(params) <= 90) {
    channelObj.members[index][user_id].frequency = parseInt(params).toString();
    // Create a document that sets the frequency of specific user
    return {
      $set: {
        [channel_id]: {
          ...channelObj,
        }
      },
    };
  }
  else return (`You inputted an invalid value for frequency of one-on-ones. Only numeric values from 14 to 90 are accepted. Your current frequency of one-on-one's in this channel is every ${frequency} days.`);
};


export const setBlock = (channelObj, channel_id, user_id, params, channelMembers) => {
  let updateDoc = null;
  let response = "";
  const index = channelObj.members.findIndex(member => {
    return Object.keys(member)[0] === user_id;
  });
  const block = channelObj.members[index][user_id].restrict;
  // If user is inactive, respond with failure
  if (!channelObj.members[index][user_id].isActive) {
    response = '/ono-block can only be called for active users. Set yourself active for pairing with the /ono-active command first.';
    return { updateDoc, response };
  }
  // If no parameters are set, respond with current restrictions
  else if (params.length === 0 && block.length === 0) {
    response = "You are currently being paired with everyone on this channel for one-on-ones with no restrictions.";
    return { updateDoc, response };
  }
  else if (params.length === 0) {
    response = "You are currently not being paired with the following members in this channel for one-on-ones:\n";
    block.forEach(element => {
      response += `<@${element}>\n`;
    });
    return { updateDoc, response };
  }
  // If parameters are set, begin block logic
  else {
    // Create array from passed in usernames
    const splitParams = params.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
    // Handle duplicate params
    const duplicates = {};
    for (let i = 0; i < splitParams.length; i++) {
      duplicates[splitParams[i]] ? duplicates[splitParams[i]] += 1 : duplicates[splitParams[i]] = 1;
      if (duplicates[splitParams[i]] === 2) {
        splitParams.splice(i, 1);
      }
    }

    // Create object with keys corresponding to names and values corresponding to user_ids
    const memberNames = {};
    for (let i = 0; i < channelObj.members.length; i++) {
      const key = Object.keys(channelObj.members[i])[0];
      if (!memberNames[channelObj.members[i][key].name]) {
        memberNames[channelObj.members[i][key].name] = channelObj.members[i][key].id;
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

    if (channelObj.members[index][user_id].restrict.length === 0 && validMembers.length === 0) {
      response = "You are currently being paired with everyone on this channel for one-on-ones with no restrictions.\n";
    } else if (validMembers.length === 0) {
      response = "The /ono-block command must be called with a user in the channel or a list of users in the channel you wish to block.\n";
    } else {
      response = "You are currently not being paired with the following members in this channel for one-on-ones:\n";
      // Insert current restrictions to response
      channelObj.members[index][user_id].restrict.forEach(element => {
        response += `<@${element}>\n`;
      });
    }

    if (validMembers.length > 0) {
      // Insert new restrictions to response
      validMembers.forEach(element => {
        channelObj.members[index][user_id].restrict.push(element);
        response += `<@${element}>\n`;
      });

      updateDoc = {
        $set: {
          [channel_id]: {
            ...channelObj,
          }
        }
      };
    }


    if (invalidMembers.length > 0) {
      response += 'The following members are not in this channel and were ignored for the command:\n';
      invalidMembers.forEach(element => {
        response += `<@${element}>\n`;
      });
    }

    // Create a document that sets the restrict key of a specific user on a specific channel
    return { updateDoc, response };
  }
};


export const setUnblock = (channelObj, channel_id, user_id, params, channelMembers) => {
  let updateDoc = null;
  let response = "";
  const index = channelObj.members.findIndex(member => {
    return Object.keys(member)[0] === user_id;
  });
  const block = channelObj.members[index][user_id].restrict;
  // If user is inactive, respond with failure
  if (!channelObj.members[index][user_id].isActive) {
    response = '/ono-unblock can only be called for active users. Set yourself active for pairing with the /ono-active command first.';
    return { updateDoc, response };
  }
  // If no parameters are set, output current restrictions
  if (params.length === 0 && block.length === 0) {
    response = "The /ono-unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently being paired with everyone on this channel for one-on-ones with no restrictions.";
    return { updateDoc, response };
  }

  else if (params.length === 0 && block.length > 0) {
    response = "The /ono-unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently not being paired with the following members in this channel for one-on-ones:\n";
    block.forEach(element => {
      response += `<@${element}>\n`;
    });
    return { updateDoc, response };
  }

  else if (block.length === 0) {
    response = "You are already being paired with everyone on this channel for one-on-ones with no restrictions.";
    return { updateDoc, response };
  }

  else if (params === 'all') {
    // Create a document that sets the restrict key of a specific user on a specific channel
    channelObj.members[index][user_id].restrict = [];
    updateDoc = {
      $set: {
        [channel_id]: {
          ...channelObj,
        }
      },
    };

    response = "You have removed all restrictions and are currently being paired with everyone on this channel for one-on-ones.";
    return { updateDoc, response };
  }

  else {
    // Check if passed in members are members of the channel
    const splitParams = params.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
    const duplicates = {};
    for (let i = 0; i < splitParams.length; i++) {
      duplicates[splitParams[i]] ? duplicates[splitParams[i]] += 1 : duplicates[splitParams[i]] = 1;
      if (duplicates[splitParams[i]] === 2) {
        splitParams.splice(i, 1);
      }
    }

    // Create object with keys corresponding to names and values corresponding to user_ids
    const memberNames = {};
    for (let i = 0; i < channelObj.members.length; i++) {
      const key = Object.keys(channelObj.members[i])[0];
      if (!memberNames[channelObj.members[i][key].name]) {
        memberNames[channelObj.members[i][key].name] = channelObj.members[i][key].id;
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


    if (channelObj.members[index][user_id].restrict.length === 0 && validMembers.length === 0) {
      response = "The /ono-unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently being paired with everyone on this channel for one-on-ones with no restrictions.";
    }

    else if (validMembers.length === 0) {
      response = "The /ono-unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock.\n";
    }

    // Create a document that sets the restrict key of a specific user on a specific channel
    else {
      let currentRestrictions = channelObj.members[index][user_id].restrict;
      let newRestrictions = [];
      for (let i = 0; i < validMembers.length; i++) {
        newRestrictions = currentRestrictions.filter(element => element !== validMembers[i]);
        currentRestrictions = newRestrictions;
      }
      channelObj.members[index][user_id].restrict = newRestrictions;
      updateDoc = {
        $set: {
          [channel_id]: {
            ...channelObj,
          }
        },
      };

      // Create responses to return along with updateDoc
      response = "You have succesfully removed the following members from your one-on-one block list for this channel:\n";
      validMembers.forEach(element => {
        response += `<@${element}>\n`;
      });
      if (newRestrictions.length === 0) {
        response += "You have removed all restrictions and are currently being paired with everyone on this channel for one-on-ones.\n";
      } else {
        response += "You are currently not being paired with the following members in this channel:\n";
        newRestrictions.forEach(element => {
          response += `<@${element}>\n`;
        });
      }
    }

    if (invalidMembers.length > 0) {
      response += 'The following members are not in this channel and were ignored for the command:\n';
      invalidMembers.forEach(element => {
        response += `<@${element}>\n`;
      });
    }

    return { updateDoc, response: response };
  }
};


export const isActive = (channelObj, channel_id, user_id) => {
  const index = channelObj.members.findIndex(member => {
    return Object.keys(member)[0] === user_id;
  });
  if (!channelObj.members[index][user_id].isActive) {
    channelObj.members[index][user_id].isActive = true;
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
  const index = channelObj.members.findIndex(member => {
    return Object.keys(member)[0] === user_id;
  });
  if (channelObj.members[index][user_id].isActive) {
    channelObj.members[index][user_id].isActive = false;
    return {
      $set: {
        [channel_id]: {
          ...channelObj,
        }
      }
    };
  } else return null;
};
