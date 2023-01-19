import { fetchInstallation } from "../../lib/mongo.js";
import { shuffle, filterActive, filterFrequency, filterRestriction, stringifyPairings } from "../../functions/pairing.js";
import { checkBotMembership } from "../../functions/slackApi.js";
import { setTime, getTime, interval } from "../../lib/constants.js";

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
  const firstPairDate = new Date();
  nextPairDate[setTime](nextPairDate[getTime]() + interval);
  firstPairDate[setTime](nextPairDate[getTime]() + 7);

  return { currentDate, nextPairDate, firstPairDate };
};


export const newChannel = (channelMembers, allMembers, channel_id) => {
  const date = new Date();
  const lastPairing = new Date(date.setDate(date.getDate() - 28));

  // Create members array to insert into channel object\
  const membersArr = channelMembers.reduce((acc, curr) => {
    const member = allMembers.find(member =>
      member.id === curr);
    acc.push({
      [curr]: {
        id: curr,
        name: member.name,
        frequency: '14',
        lastPairing: lastPairing,
        restrict: [],
        isActive: true,
      }
    });
    return acc;
  }, []);
  const channelObj = {};
  const { currentDate, firstPairDate } = installDate();
  channelObj.isActive = true;
  channelObj.installDate = currentDate;
  channelObj.nextPairDate = firstPairDate;

  // Create doc to insert into DB
  const updateDoc = {
    $set: {
      [channel_id]: {
        ...channelObj,
        members: membersArr
      }
    },
  };

  return updateDoc;
};


export const oldChannel = (channelMembers, allMembers, channel_id, channelObj) => {
  const date = new Date();
  // Set default frequencies for any new members
  for (let i = 0; i < channelMembers.length; i++) {
    const member = allMembers.find(member =>
      member.id === channelMembers[i]);

    const memberObj = channelObj.members.find(element => {
      const id = Object.keys(element)[0];
      return id === member.id;
    });


    if (memberObj === undefined) {
      channelObj.members.push({
        [member.id]: {
          id: member.id,
          name: member.name,
          frequency: '14',
          lastPairing: new Date(date.setDate(date.getDate() - 28)),
          isActive: true,
          restrict: []
        }
      });
    }
  }

  // Set isActive to false for any members who have since left the channel

  for (let i = 0; i < channelObj.members.length; i++) {
    const id = Object.keys(channelObj.members[i])[0];
    if (!channelMembers.includes(id)) {
      channelObj.members[i][id] = {
        ...channelObj.members[i][id],
        isActive: false
      };
    }
  }

  const { currentDate, nextPairDate } = installDate();
  channelObj.reinstallDate = currentDate;
  channelObj.nextPairDate = nextPairDate;

  // Create doc to insert into DB
  const updateDoc = {
    $set: {
      [channel_id]: {
        ...channelObj,
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


export const memberJoins = (user_id, allMembers, channel_id, channelObj) => {
  const date = new Date();
  const member = allMembers.find(member =>
    member.id === user_id);
  channelObj.members.push({
    [user_id]: {
      id: member.id,
      frequency: '14',
      name: member.name,
      lastPairing: new Date(date.setDate(date.getDate() - 28)),
      restrict: [],
      isActive: true,
    }
  });

  // Create doc to insert into DB
  return {
    $set: {
      [channel_id]: {
        ...channelObj,
      }
    },
  };
};


export const memberLeaves = (user_id, channel_id, channelObj) => {
  const index = channelObj.members.findIndex(member => {
    return Object.keys(member)[0] === user_id;
  });
  channelObj.members[index][user_id].isActive = false;

  // Create doc to insert into DB
  return {
    $set: {
      [channel_id]: {
        ...channelObj
      }
    },
  };
};


export const createPairings = async (channelMembers, membersObj) => {
  // Check for active status
  const activeMembers = filterActive(channelMembers, membersObj);

  // Check for frequency congruence
  const { readyMembers, currentDate } = filterFrequency(activeMembers, membersObj);

  // Shuffle members array and compensate for odd length
  const shuffledMembers = shuffle(readyMembers);
  if (shuffledMembers.length % 2 !== 0) {
    shuffledMembers.push(shuffledMembers[0]);
  }

  // Check for restrictions
  const filteredMembers = await filterRestriction(shuffledMembers, membersObj);

  // Create output message for pairings
  const pairings = stringifyPairings(filteredMembers);

  return { filteredMembers, pairings, currentDate };
};
