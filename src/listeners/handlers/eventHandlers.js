import { fetchInstallation } from "../../lib/mongo";

export default async function eventHandler({ event }) {
  // Get team_id and channel_id from event
  const { team: team_id, channel: channel_id } = event;

  // Get team in DB
  const teamObj = await fetchInstallation({}, team_id);

  // Check channel existence
  const channelObj = teamObj[channel_id];

  return { channelObj, channel_id, team_id };
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


export const leaveChannel = (channel, channel_id) => {
  return {
    $set: {
      [channel_id]: {
        ...channel,
        isActive: false
      }
    },
  };
};
