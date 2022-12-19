import { fetchInstallation } from "../../lib/mongo";
import { checkBotMembership } from "../../functions/bot";

export default async function eventHandler(client, event) {
  // Get bot id
  const bot_id = await getBotId(client);

  // Get members of channel
  const { members, membership } = await checkBotMembership(event, client);

  // Get team_id and channel_id from event
  const { team: team_id, channel: channel_id, user: user_id } = event;

  // Get team in DB
  const teamObj = await fetchInstallation({}, team_id);

  // Check channel existence
  const channelObj = teamObj[channel_id];

  return { channelObj, channel_id, team_id, user_id, bot_id, membership, members };
}


export const newChannel = (members, channel_id) => {
  // Create channel object to insert into DB
  const channelObject = members.reduce((acc, curr) => {
    acc[curr] = {
      frequency: '14',
      lastPairing: '',
      restrict: [],
      isActive: true,
    };
    return acc;
  }, {});
  channelObject['isActive'] = true;

  // Create doc to insert into DB
  const updateDoc = {
    $set: {
      [channel_id]: channelObject
    },
  };

  return updateDoc;
};


export const oldChannel = (members, channel_id, channel) => {

  // Set default frequencies for any new members
  for (let i = 0; i < members.length; i++) {
    if (!channel[members[i]]) {
      channel[members[i]] = {
        frequency: '14',
        lastPairing: '',
        isActive: true,
        restrict: []
      };
    }
  }

  // Set isActive to false for any members who have since left the channel
  for (const member in channel) {
    if (!members.includes(member)) {
      channel[member] = {
        ...channel[member],
        isActive: false
      };
    }
  }
  // Create doc to insert into DB
  const updateDoc = {
    $set: {
      [channel_id]: {
        ...channel,
        isActive: true
      }
    },
  };

  return updateDoc;
};


export const leaveChannel = (channel_id, channel) => {
  return {
    $set: {
      [channel_id]: {
        ...channel,
        isActive: false
      }
    },
  };
};


export const memberJoins = (user_id, channel_id, channel) => {
  // Create doc to insert into DB
  return {
    $set: {
      [channel_id]: {
        ...channel,
        [user_id]: {
          frequency: '14',
          lastPairing: '',
          restrict: [],
          isActive: true,
        }
      }
    },
  };
};


export const memberLeaves = (user_id, user, channel_id, channel) => {
  // Create doc to insert into DB
  return {
    $set: {
      [channel_id]: {
        ...channel,
        [user_id]: {
          ...user,
          isActive: false
        }
      }
    },
  };
};
