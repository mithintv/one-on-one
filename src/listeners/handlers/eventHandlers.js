import { fetchInstallation } from "../../lib/mongo.js";
import shuffle from "../../functions/shuffle.js";
import { filterActive, filterFrequency, filterRestriction, stringifyPairings } from "../../functions/filter.js";
import { checkBotMembership } from "../../functions/slackApi.js";

export default async function eventHandler(client, event) {
  // Get team_id and channel_id from event
  const { team: team_id, channel: channel_id, user: user_id } = event;

  // Get bot_id and verify bot membership of channel
  const { bot_id, membership, channelMembers } = await checkBotMembership(client, channel_id);

  // Get team in DB
  let teamObj = await fetchInstallation({}, team_id);
  if (!teamObj) teamObj = undefined;

  // Check channel, members, and user existence
  const channelObj = teamObj && teamObj[channel_id] ? teamObj[channel_id] : undefined;
  const membersObj = channelObj && channelObj.members ? channelObj.members : undefined;
  const userObj = channelObj && channelObj.members[user_id] ? channelObj.members[user_id] : undefined;

  return { team_id, channel_id, user_id, bot_id, membership, channelMembers, teamObj, channelObj, membersObj, userObj, };
}


export const installDate = () => {
  const currentDate = new Date();
  const nextPairDate = new Date();
  nextPairDate.setDate(nextPairDate.getDate() + 7);

  return { currentDate, nextPairDate };
};


export const newChannel = (members, channel_id) => {
  // Create channel object to insert into DB
  const membersObj = members.reduce((acc, curr) => {
    acc[curr] = {
      frequency: '14',
      lastPairing: '',
      restrict: [],
      isActive: true,
    };
    return acc;
  }, {});
  const channelObj = {};
  const { currentDate, nextPairDate } = installDate();
  channelObj.isActive = true;
  channelObj.installDate = currentDate;
  channelObj.nextPairDate = nextPairDate;

  // Create doc to insert into DB
  const updateDoc = {
    $set: {
      [channel_id]: {
        ...channelObj,
        members: membersObj
      }
    },
  };

  return updateDoc;
};


export const oldChannel = (members, channel_id, channel) => {

  // Set default frequencies for any new members
  for (let i = 0; i < members.length; i++) {
    if (!channel.members[members[i]]) {
      channel.members[members[i]] = {
        frequency: '14',
        lastPairing: '',
        isActive: true,
        restrict: []
      };
    }
  }

  // Set isActive to false for any members who have since left the channel
  for (const member in channel.members) {
    if (!members.includes(member)) {
      channel.members[member] = {
        ...channel.members[member],
        isActive: false
      };
    }
  }

  const { currentDate, nextPairDate } = installDate();
  channel.reinstallDate = currentDate;
  channel.nextPairDate = nextPairDate;

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
  const { currentDate } = installDate();

  return {
    $set: {
      [channel_id]: {
        ...channel,
        isActive: false,
        uninstallDate: currentDate
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
        members: {
          ...channel.members,
          [user_id]: {
            frequency: '14',
            lastPairing: '',
            restrict: [],
            isActive: true,
          }
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
        members: {
          ...channel.members,
          [user_id]: {
            ...user,
            isActive: false
          }
        }
      }
    },
  };
};


export const createPairings = async (channelMembers, membersObj) => {
  // Check for active status
  const activeMembers = filterActive(channelMembers, membersObj);
  console.log(activeMembers);

  // Check for frequency congruence
  const readyMembers = filterFrequency(activeMembers, membersObj);
  console.log(readyMembers);

  // Shuffle members array and compensate for odd length
  const shuffledMembers = shuffle(readyMembers);
  if (shuffledMembers.length % 2 !== 0) {
    shuffledMembers.push(shuffledMembers[0]);
  }
  console.log(shuffledMembers);
  // Check for restrictions
  const filteredMembers = await filterRestriction(shuffledMembers, membersObj);

  // Create output message for pairings
  const pairings = stringifyPairings(filteredMembers);

  console.log(filteredMembers, pairings);
  return { filteredMembers, pairings };
};
